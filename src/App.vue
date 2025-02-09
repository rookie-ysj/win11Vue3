<script lang="ts" setup>
import { useGlobalSetting } from '@/store'
import LockScreen from '@/views/lockScreen/index.vue'

const globalSetting = useGlobalSetting()
</script>

<template>
  <LockScreen v-if="globalSetting.lock" />
  我是APP
</template>

<style scoped>
</style>
