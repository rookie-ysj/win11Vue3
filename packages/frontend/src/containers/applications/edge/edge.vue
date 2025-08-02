<script lang="ts" setup>
import ToolBar from '@/components/tool-bar/toolBar.vue'
import { EDGE } from '@/constants'
import { useApplication } from '@/store'

const edgeApp = useApplication().applications[EDGE.name]
</script>

<template>
  <div v-if="!edgeApp.hide">
    <ToolBar
        :icon="edgeApp.icon" name="edgeApp.name"
    />
  </div>
</template>

<style scoped>
</style>
