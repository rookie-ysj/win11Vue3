<script setup lang="ts">
import { useWallpaper } from '@/store'

const wallpaperStore = useWallpaper()
</script>

<template>
  <div
    class="background" :style="{
      backgroundImage: `url(img/wallpaper/${wallpaperStore.wallSrc})`,
    }"
  />
</template>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--wintheme);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease;
  z-index: -1;
}
</style>
