<script lang="ts" setup>
import ToolBar from '@/components/tool-bar/toolBar.vue';
import { useApplication } from '@/store';
import { TERMINAL } from '@/constants';
import { computed, ref } from 'vue';
import { CLEAR, CMD_LIST, HELP, LS, PWD } from './terminal';

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

function handleInput(e: KeyboardEvent) {
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
        executeCmd(cmd) :
        `
          <div>${pwd.value}>${cmd}</div>
          <div>${executeCmd(cmd)}</div>
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

function executeCmd(cmd: string) {
  switch (cmd) {
    case CLEAR.name:
      stack.value.forEach((item) => {
        item.res = '';
      });
      return '';
    case PWD.name:
      return `Path: ${pwd.value}`;
    case LS.name:
      return '1.txt\n2.txt\n3.txt';
    case HELP.name:
      return CMD_LIST.reduce((pre, cur) => pre + `<div class="flex"><div class="w-30">${cur.name}:</div> ${cur.info}</div>`, '');
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
          {{ pwd }}>
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
