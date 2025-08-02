<script lang="ts" setup>
import ToolBar from '@/components/tool-bar/toolBar.vue'
import { EDGE } from '@/constants'
import { useApplication } from '@/store'

const edgeName = EDGE.name
const applicationStore = useApplication()
const edgeApp = useApplication().applications[edgeName]
</script>

<template>
  <transition enter-active-class="animate__animated animate__zoomInUp"
    leave-active-class="animate__animated animate__zoomOutDown">
    <ToolBar v-if="edgeApp.open" v-show="!edgeApp.hide" :name="edgeName" :src="EDGE.icon"
      :close="() => applicationStore.toggleApplicationOpen(edgeName, false)" :maximize="() => { }"
      :minimize="() => applicationStore.toggleApplicationHide(edgeName, true)">
      <div class="w-full h-full bg-white">
      </div>
    </ToolBar>
  </transition>
</template>

<style scoped>
</style>
