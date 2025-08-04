<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { useDraggable } from '@vueuse/core';
import { AnyFunc } from '@/types';
import Icon from '@/components/icons/icon.vue';

withDefaults(defineProps<{
  name: string
  src: string
  invert?: boolean
  minimize: AnyFunc
  maximize: AnyFunc
  close: AnyFunc
  bg?: string
}>(), {
  bg: '#ffffff',
  invert: false,
});

const header = useTemplateRef<HTMLDivElement>('header');

const { style } = useDraggable(header, {
  initialValue: {
    x: 0,
    y: 0,
  },
});
</script>

<template>
  <div :style="style" class="absolute w-full h-full">
    <div ref="header" :style="{ background: bg, width: '100vw' }" class="flex justify-between toolbar">
      <div :style="{
        color: invert ? 'white' : 'black'
      }" class="flex text-xss items-center">
        <Icon :src="src" class="ml-2 mr-2" width="14" />
        {{ name }}
      </div>
      <div class="flex justify-around toolbar__btns">
        <div @click="minimize">
          <Icon :invert="invert" payload="mnmz" pr src="minimize" ui width="12" />
        </div>
        <div @click="maximize">
          <Icon :invert="invert" :src="true ? 'maximize' : 'maxmin'" payload="mxmz" pr ui width="12" />
        </div>
        <div class="toolbar__closeBtn" @click="close">
          <Icon :invert="invert" payload="mxmz" pr src="close" ui width="12" />
        </div>
      </div>
    </div>
    <slot name="default" />
  </div>
</template>

<style scoped>
.toolbar {
  height: 28px;

  .toolbar__btns {
    .icon {
      height: 100%;
      padding: 0 18px;

      &:hover {
        background: rgba(136, 136, 136, 0.2);
      }
    }

    .toolbar__closeBtn:hover {
      background: rgba(255, 0, 0, 0.8);

      img {
        filter: invert(1);
      }
    }
  }
}

</style>
