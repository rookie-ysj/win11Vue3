<script setup lang="ts">

import ToolBar from '@/components/tool-bar/toolBar.vue';
import { useApplication } from '@/store';
import { TERMINAL } from '@/constants';

const TerminalName = TERMINAL.name
const applicationStore = useApplication()
const terminalApp = applicationStore.applications[TerminalName]
</script>

<template>
  <transition enter-active-class="animate__animated animate__zoomInUp"
    leave-active-class="animate__animated animate__zoomOutDown">
    <ToolBar v-if="terminalApp.open" v-show="!terminalApp.hide" :name="TerminalName" :src="TERMINAL.icon" bg="#000000"
      :invert="true" :close="() => applicationStore.toggleApplicationOpen(TerminalName, false)" :maximize="() => { }"
      :minimize="() => applicationStore.toggleApplicationHide(TerminalName, true)">
      <div class="w-full h-full bg-black">
        我是终端
      </div>
    </ToolBar>
  </transition>
</template>

<style scoped>

</style>