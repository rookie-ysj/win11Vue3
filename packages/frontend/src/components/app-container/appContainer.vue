<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { useDraggable } from '@vueuse/core';

const header = useTemplateRef<HTMLDivElement>('header');

useDraggable(header, {
  initialValue: {
    x: 0,
    y: 0,
  },
});
</script>

<template>
  <div>
    <div ref="header" class="flex">
      <div>
        <slot name="title" />
      </div>
      <div class="flex justify-around">
        <div>最小化</div>
        <div>最大化</div>
        <div>关闭</div>
      </div>
    </div>
    <slot name="default" />
  </div>
</template>

<style scoped>

</style>
