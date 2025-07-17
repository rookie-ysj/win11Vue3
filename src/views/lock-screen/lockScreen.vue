<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import globalSetting from '@/store/wallpaper.ts'
import { getDayOfWeek } from '@/utils/calculate.ts'

const currentDay = dayjs()

const time = currentDay.format('h:mm A')
const showLogin = ref(false)

const password = ref('')
const passwordWrong = ref(false)

function login() {
  if (password.value !== '123456') {
    passwordWrong.value = true
    return
  }
  globalSetting().setLock(false)
}
</script>

<template>
  <div class="lock-screen" @click="showLogin = true">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutUp"
      mode="out-in"
    >
      <div v-if="!showLogin" class="time-screen">
        <div class="text-5xl mb-1">
          {{ time }}
        </div>
        <div>{{ `${currentDay.month() + 1}月${currentDay.date()}日${getDayOfWeek(currentDay.day())}` }}</div>
      </div>
      <div v-else class="mt-44">
        <div class="user-avatar" />
        <div class="mt-2 text-2xl">
          Administrator
        </div>
        <input
          v-model="password" :class="passwordWrong ? 'password-wrong' : ''" autofocus class="password-input"
          type="password" @keyup.enter="login"
        >
      </div>
    </transition>
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

.time-screen {
  margin-top: 150px;
}

.user-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
  background-image: url("@/assets/img/avatar.png");
  margin: 0 auto;
}

.password-input {
  width: 200px;
  height: 40px;
  margin: 20px auto;
  border: 1px solid #fff;
  border-radius: 20px;
  background-color: transparent;
  color: #fff;
  text-align: center;
}

.password-input:focus {
  outline: none;
}
</style>
