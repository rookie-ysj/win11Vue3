<script lang="ts" setup>
import { useGlobalSetting } from '@/store'
import { getDayOfWeek } from '@/utils/calculate.ts'
import dayjs from 'dayjs'

const currentDay = dayjs()
const globalSetting = useGlobalSetting()
</script>

<template>
  <div class="lock-screen flex" @click="() => globalSetting.setLock(false)">
    <div>{{ currentDay.format() }}</div>
    <div>{{ `${currentDay.month() + 1}月${currentDay.date()}日${getDayOfWeek(currentDay.day())}` }}</div>
  </div>
</template>

<style scoped>
.lock-screen {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/img/lock-screen.jpg");
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
