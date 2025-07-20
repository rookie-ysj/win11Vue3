<script setup lang="ts">
import * as FaRegIcons from '@fortawesome/free-regular-svg-icons'
import * as FaIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useSidePane } from '@/store'
import { getCssPx } from '@/utils'
import * as CustomIcons from './icon'

const props = defineProps<{
  icon?: string
  faIcon?: string // Font Awesome 图标
  reg?: boolean // 是否为 Font Awesome 常规图标
  src?: string
  ui?: boolean // 是否为 UI 图标
  width?: string | number
  height?: string | number
  invert?: boolean
  rounded?: boolean
  flip?: boolean
  color?: string
  margin?: string | number
}>()
const emits = defineEmits(['click'])
const {
  icon,
  faIcon,
  reg,
  src,
  ui,
  width = 20,
  height,
  color = 'white',
  margin = 0,
} = props
const sidePane = useSidePane()

const customIcon = icon ? (CustomIcons as any)[icon] : null
const iconSrc = src ? `img/icon/${ui ? 'ui/' : ''}${src}.png` : ''

const iconClass = computed(() => {
  return {
    invert: props.invert || false,
    rounded: props.rounded || false,
    flip: props.flip || false,
  }
})
const iconStyle = (function () {
  const _width = getCssPx(width)
  const _height = height ? getCssPx(height) : _width
  return {
    width: _width,
    height: _height,
    margin: getCssPx(margin),
    color,
  }
})()

function handleClick() {
  // 关闭侧边栏
  sidePane.closeAll()
  emits('click')
}
</script>

<template>
  <div class="icon" @click="handleClick">
    <FontAwesomeIcon
      v-if="faIcon"
      :icon="reg ? (FaRegIcons as any)[faIcon] : (FaIcons as any)[faIcon]" :data-invert="true"
      :class="iconClass"
      :style="iconStyle"
    />
    <component :is="customIcon" v-else-if="icon" :class="iconClass" :style="iconStyle" />
    <img v-else :src="iconSrc" :class="iconClass" :style="iconStyle" alt="">
  </div>
</template>

<style scoped>
.icon {
  position: relative;
  display: grid;
  place-items: center;
}

.invert {
  filter: invert(1);
}

.rounded {
  border-radius: 1000px;
}

.flip {
  transform: scale(-1, 1);
}
</style>
