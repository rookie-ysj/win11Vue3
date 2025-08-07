<script lang="ts" setup>
import ToolBar from '@/components/tool-bar/toolBar.vue';
import { useApplication } from '@/store';
import { TERMINAL } from '@/constants';
import { computed, ref } from 'vue';
import {
  CD,
  CLEAR,
  CMD_LIST,
  EXIT,
  generateTreeVisual,
  HELP,
  IPCONFIG,
  LS,
  MKDIR,
  PWD,
  RM,
  TOUCH,
  TREE,
} from './terminal';
import { fileService } from '@/api';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/vue-query';

const TerminalName = TERMINAL.name;
const applicationStore = useApplication();
const terminalApp = applicationStore.applications[TerminalName];

const stack = ref<{
  cmd: string
  res: string
}[]>([]);
const showStack = computed(() => stack.value.filter((item) => item.res).map((item) => item.res));

const cmdInput = ref<HTMLDivElement>();
const currentDirectoryId = ref(2)

const { data: pwd } = useQuery({
  queryKey: [currentDirectoryId, 'pwd'],
  queryFn: () => fileService.fileControllerFindAncestors(currentDirectoryId.value).then(res => {
      const ancestors = res.data || []
      return ancestors.map(ancestor => ancestor.name).join('\\')
    }),
  initialData: 'C:',
})

const { data: currentFileTree, refetch: getTree } = useQuery({
  queryKey: [currentDirectoryId, 'getTree'],
  queryFn: () => fileService.fileControllerFindAll(currentDirectoryId.value).then(res => res.data),
  initialData: {
    id: 1,
    name: 'C:',
    type: 'DIRECTORY',
    parent_id: 0,
    children: [],
    updated_at: dayjs().toISOString(),
    created_at: dayjs().toISOString(),
  }
})
const currentParentId = computed(() => currentFileTree.value.parent_id)

let index = 0;
async function handleInput(e: KeyboardEvent) {
  let cmd = cmdInput.value?.textContent || '';
  const setCmd = (cmd: string) => {
    cmdInput.value!.innerHTML = cmd;
  };

  switch (e.key) {
    case 'ArrowUp':
      if (index > 0) {
        setCmd(stack.value[--index].cmd);
      }
      break;
    case 'ArrowDown':
      if (index < stack.value.length - 1) {
        setCmd(stack.value[++index].cmd);
      } else {
        setCmd('');
      }
      break;
    case 'Enter':
      e.preventDefault();
      const res = cmd === CLEAR.name ?
        await executeCmd(cmd) :
        `
          <div>${pwd.value}>${cmd}</div>
          <div>${await executeCmd(cmd)}</div>
        `;
      stack.value.push({
        cmd,
        res,
      });
      index = stack.value.length;
      setCmd('');
      break;
  }
}

async function executeCmd(cmdInfo: string) {
  const cmdInfos = cmdInfo.trim().split(' ');
  const cmd = cmdInfos[0].toLowerCase();
  const args = cmdInfos.slice(1);
  switch (cmd) {
    case CLEAR.name:
      stack.value.forEach((item) => {
        item.res = '';
      });
      return '';
    case PWD.name:
      return `Path: ${pwd.value}`;
    case HELP.name:
      return CMD_LIST.reduce((pre, cur) => pre + `<div class="flex"><div class="w-30">${cur.name}:</div> ${cur.info}</div>`, '');
    case IPCONFIG.name:
      const data = await fetch('https://ipapi.co/json').then(res => res.json());
      return `
        IP: ${data.ip}
        城市: ${data.city}
        国家: ${data.country_name}
        时区: ${data.timezone}
        互联网服务提供商: ${data.org}
      `;
    case EXIT.name:
      applicationStore.toggleApplicationOpen(TerminalName, false);
      return '';
    case MKDIR.name:
      if (args.length < 1) {
        return 'mkdir: missing directory operand';
      }
      await fileService.fileControllerCreate({
        name: args[0],
        type: 'DIRECTORY',
        parent_id: currentDirectoryId.value,
      })
      await getTree()
      return '';
    case RM.name:
      if (args.length < 1) {
        return 'rm: missing file operand';
      }
      const removeId = currentFileTree.value.children.find(
        (file) => file.name === args[0],
      )?.id;
      if (!removeId || currentFileTree.value.children.length === 0) {
        return 'No files found.';
      }
      await fileService.fileControllerRemove(removeId);
      await getTree()
      return '';
    case TOUCH.name:
      if (args.length < 1) {
        return 'touch: missing file operand';
      }
      await fileService.fileControllerCreate({
        name: args[0],
        type: 'FILE',
        parent_id: currentDirectoryId.value,
      })
      await getTree()
      return '';
    case CD.name:
      if (args.length < 1) {
        return 'cd: missing directory operand';
      }
      switch (args[0]) {
        case '.':
        case './':
          return '';
        case '..':
        case '../':
          if (currentParentId.value === 0) {
            return ''
          }
          currentDirectoryId.value = currentParentId.value
          return '';
        default:
          const directory = currentFileTree.value.children.find((file) => file.type === 'DIRECTORY' && file.name === args[0])
          if (directory) {
            currentDirectoryId.value = directory.id
            return '';
          } else {
            return `ls: cannot access '${args[0]}': No such directory`;
          }
      }
    case LS.name:
      if (currentFileTree.value.children.length === 0) {
        return 'No files found.';
      }
      return `
        <table class="terminal__table">
          <tr>
            <td>name</td>
            <td>type</td>
            <td>update_time</td>
          </tr>
          ${currentFileTree.value.children.map(file => `<tr>
            <td>${file.name}</td>
            <td>${file.type}</td>
            <td>${dayjs(file.updated_at).format('YYYY-M-D h:m:s')}</td>
            </tr>`).join('')}
        </table>`
    case TREE.name:
      return generateTreeVisual(currentFileTree.value)
    case '':
      return '';
    default:
      return `'${cmd}' is not a valid command.\nType 'help' for more information.`;
  }
}
</script>

<template>
  <transition enter-active-class="animate__animated animate__zoomInUp"
              leave-active-class="animate__animated animate__zoomOutDown">
    <ToolBar v-if="terminalApp.open" v-show="!terminalApp.hide"
             :close="() => applicationStore.toggleApplicationOpen(TerminalName, false)" :invert="true"
             :maximize="() => { }"
             :minimize="() => applicationStore.toggleApplicationHide(TerminalName, true)" :name="TerminalName"
             :src="TERMINAL.icon" bg="#000000">
      <div class="terminal">
        <div v-for="(item, index) in showStack" :key="index" class="terminal__history"
             v-html="item"></div>
        <div class="flex">
          <div class="w-fit shrink-0">{{ pwd }}></div>
          <div ref="cmdInput" autofocus class="terminal__input" contenteditable="true"
               @keydown="handleInput"></div>
        </div>
      </div>
    </ToolBar>
  </transition>
</template>

<style scoped>
.terminal {
  font-size: 0.84em;
  font-family: "consolas", monospace;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #000000;
}

.terminal__history {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 400;
  overflow: hidden;
  max-width: 100%;
  white-space: pre-line;
  margin-bottom: 12px;
}

.terminal__input {
  display: inline-block;
  outline: none;
  border: none;
  width: 100%;
}
</style>
<style lang="scss">
.terminal__table {
  td {
    padding: 0 10px;
  }
}
.terminal__tree__item {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%; /* 控制边框高度为元素高度的一半 */
    width: 1px; /* 边框宽度 */
    background-color: #fff; /* 边框颜色 */
  }

  &--first::after {
    height: 49%;
  }

  &--last::after {
    bottom: 50%;
    height: 50%;
  }
}
</style>
