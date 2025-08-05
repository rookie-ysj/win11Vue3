<script lang="ts" setup>
import ToolBar from '@/components/tool-bar/toolBar.vue';
import { useApplication } from '@/store';
import { TERMINAL } from '@/constants';
import { computed, reactive, ref, watch } from 'vue';
import { CD, CLEAR, CMD_LIST, EXIT, HELP, IPCONFIG, LS, MKDIR, PWD, RM, TOUCH } from './terminal';
import { fileService } from '@/api';
import dayjs from 'dayjs';
import { FileEntity } from '@/api/data-contracts.ts';

const TerminalName = TERMINAL.name;
const applicationStore = useApplication();
const terminalApp = applicationStore.applications[TerminalName];

const stack = ref<{
  cmd: string
  res: string
}[]>([]);
const showStack = computed(() => stack.value.filter((item) => item.res).map((item) => item.res));

let index = 0;
const pwd = ref('C:\\Users\\admin\\Desktop');
const cmdInput = ref<HTMLDivElement>();

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

const currentDirectoryId = ref(2)
const currentFileList = reactive<FileEntity[]>([])
const currentParentId = ref(0)
const getCurrentFileList = async () => {
  currentFileList.length = 0
  currentFileList.push(...await fileService.fileControllerFindAll(currentDirectoryId.value).then(res => res.data))
  console.log(currentFileList);
}
watch(currentDirectoryId, async () => {
  getCurrentFileList()
  currentParentId.value = await fileService.fileControllerFindOne(currentDirectoryId.value).then(res => res.data?.parent_id || 0)
  pwd.value = await fileService.fileControllerFindAncestors(currentDirectoryId.value).then(res => {
    const ancestors = res.data || []
    return ancestors.map(ancestor => ancestor.name).join('\\')
  })
}, {
  immediate: true,
})

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
      await getCurrentFileList()
      return '';
    case RM.name:
      if (args.length < 1) {
        return 'rm: missing file operand';
      }
      const removeId = currentFileList.find(
        (file) => file.name === args[0],
      )?.id;
      if (!removeId || currentFileList.length === 0) {
        return 'No files found.';
      }
      await fileService.fileControllerRemove(removeId);
      await getCurrentFileList()
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
      await getCurrentFileList()
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
          const directory = currentFileList.find((file) => file.type === 'DIRECTORY' && file.name === args[0])
          if (directory) {
            currentDirectoryId.value = directory.id
            return '';
          } else {
            return `ls: cannot access '${args[0]}': No such directory`;
          }
      }
    case LS.name:
      if (currentFileList.length === 0) {
        return 'No files found.';
      }
      return `
        <table class="terminal__table">
          <tr>
            <td>name</td>
            <td>type</td>
            <td>update_time</td>
          </tr>
          ${currentFileList.map(file => `<tr>
            <td>${file.name}</td>
            <td>${file.type}</td>
            <td>${dayjs(file.updated_at).format('YYYY-M-D h:m:s')}</td>
            </tr>`).join('')}
        </table>`
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
<style>
.terminal__table {
  td {
    padding: 0 10px;
  }
}
</style>
