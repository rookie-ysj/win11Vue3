<script lang="ts" setup>
import { useGlobalSetting } from '@/store'
import { getDayOfWeek } from '@/utils/calculate.ts'
import dayjs from 'dayjs'

const currentDay = dayjs()
const globalSetting = useGlobalSetting()

const time = currentDay.format('h:mm A')
</script>

<template>
  <div class="lock-screen" @click="() => globalSetting.setLock(false)">
    <div class="text-5xl mt-36 mb-1">
      {{ time }}
    </div>
    <div>{{ `${currentDay.month() + 1}月${currentDay.date()}日${getDayOfWeek(currentDay.day())}` }}</div>
  </div>
</template>

<style scoped>
.lock-screen {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-image: url("@/assets/img/lock-screen.jpg");
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
