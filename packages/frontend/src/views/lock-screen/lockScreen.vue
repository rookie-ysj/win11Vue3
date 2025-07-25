<script lang="ts" setup>
import { ref } from 'vue'
import { useWallpaper } from '@/store'
import globalSetting from '@/store/wallpaper.ts'
import { getCurrentDate, getCurrentTime } from '@/utils'

const wallpaperStore = useWallpaper()

const showLogin = ref(false)

function login() {
  globalSetting().setLock(false)
}
</script>

<template>
  <div v-if="wallpaperStore.lock" class="lock-screen" @click="showLogin = true">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutUp"
      mode="out-in"
    >
      <div v-if="!showLogin" class="time-screen">
        <div class="text-5xl mb-1">
          {{ getCurrentDate() }}
        </div>
        <div>{{ getCurrentTime() }}</div>
      </div>
      <div v-else class="mt-44">
        <div class="user-avatar" />
        <div class="mt-2 text-2xl">
          Administrator
        </div>
        <div>
          <button class="mt-2 sign-button" @click="login">
            登录
          </button>
        </div>
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
  z-index: 999999;
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

.password-input:focus {
  outline: none;
}
.sign-button {
  background: rgba(255, 255, 255, 0.2);
  font-size: 13px;
  padding: 4px 36px 6px;
  color: #fff;
  border: 2px solid transparent;
  border-radius: 4px;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.33);
  }

  &:active {
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 0.33);
  }
}
</style>
