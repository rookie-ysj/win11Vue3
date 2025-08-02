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
  invert: false
})

const header = useTemplateRef<HTMLDivElement>('header');

const { style } = useDraggable(header, {
  initialValue: {
    x: 0,
    y: 0,
  },
});
</script>

<template>
  <div class="fixed w-full h-full" :style="style">
    <div ref="header" class="flex justify-between toolbar" :style="{ background: bg, width: '100vw' }">
      <div class="flex text-xss items-center" :style="{
        color: invert ? 'white' : 'black'
      }">
        <Icon class="ml-2 mr-2" :src="src" width="14" />
        {{ name }}
      </div>
      <div class="flex justify-around toolbar__btns">
        <div @click="minimize">
          <Icon payload="mnmz" pr src="minimize" ui :invert="invert" width="12" />
        </div>
        <div @click="maximize">
          <Icon ui pr width="12" payload="mxmz" :invert="invert" :src="true ? 'maximize' : 'maxmin'" />
        </div>
        <div @click="close" class="toolbar__closeBtn">
          <Icon :invert="invert" ui pr width="12" payload="mxmz" src="close" />
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
