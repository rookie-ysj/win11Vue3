<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref, useTemplateRef } from 'vue'
import Battery from '@/components/battery/battery.vue'
import Icon from '@/components/icons/icon.vue'
import { useSetting, useSidePane } from '@/store'

const sidePaneStore = useSidePane()
const setting = useSetting()

const qsRef = useTemplateRef('quickSettingRef')
onClickOutside(qsRef, () => {
  sidePaneStore.toggleQuickSettingOpen(false)
})

function setSlider(event: Event, callback: (number: number) => void) {
  const target = event.target! as HTMLInputElement
  const value = Number(target.value)
  setSliderColor(target, value)
  callback(value)
}

const brightnessSlider = ref<HTMLInputElement>()
const volumeSlider = ref<HTMLInputElement>()
onMounted(() => {
  setSliderColor(brightnessSlider.value!, setting.brightness)
  setSliderColor(volumeSlider.value!, setting.volume)
})

function setSliderColor(element: HTMLElement, value: number) {
  element.style.background = `linear-gradient(90deg, var(--clrPrm) ${value - 3}%, #888888 ${value}%)`
}
</script>

<template>
  <transition
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__slideOutDown"
    mode="out-in"
  >
    <div
      v-show="sidePaneStore.quickSettingOpen"
      ref="quickSettingRef"
      class="sidePane"
      style="--prefix: PANE"
    >
      <div class="quickSettings p-5 pb-8">
        <div class="qkCont">
          <div v-for="(item, index) in sidePaneStore.quickSetting" :key="index" class="qkGrp">
            <div
              class="qkbtn handcr prtclk"
              :data-state="item.state"
              @click="item.onClick"
            >
              <Icon
                class="quickIcon"
                :ui="item.ui"
                :src="item.src"
                width="14"
                :invert="item.state"
              />
            </div>
            <div class="qktext">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="sliderCont">
          <Icon class="mx-2 shrink-0" src="brightness" ui width="20" />
          <input
            id="brightnessSlider"
            ref="brightnessSlider"
            :value="setting.brightness"
            class="slider bSlider"
            type="range"
            min="10"
            max="100"
            @input="(e) => setSlider(e, setting.setBrightness)"
          >
        </div>
        <div class="sliderCont">
          <Icon class="mx-2 shrink-0" :src="`audio${setting.volumeMode}`" ui width="18" />
          <input
            ref="volumeSlider"
            class="slider vSlider"
            :value="setting.volume"
            type="range"
            min="0"
            max="100"
            @input="(e) => setSlider(e, setting.setVolume)"
          >
        </div>
      </div>
      <div class="p-1 bottomBar">
        <div class="px-3 battery-sidepane">
          <Battery show-num />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.sidePane {
  --bg1: #dae2f2;
  --bg2: #e6edf8;
  --bg3: #fbfbfb;
  --bg4: rgb(0 0 0 / 5%);
  --sliderThumbClr: white;

  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 360px;
  border-radius: 0.5rem;
  color: var(--dark-txt);
  background: var(--bg1);
  overflow: hidden;
  transition: cubic-bezier(0.62, 0, 0.32, 1) 250ms;
  z-index: 9999;
  transform: translateX(0);

  &.bd-blur {
    --bg1: rgb(242 242 242 / 90%);
    --bg2: rgb(255 255 255 / 20%);
    backdrop-filter: blur(20px);
  }

  &[data-hide="true"] {
    transform: translateY(110%);
    animation: overflow-hider 0s ease-in-out 150ms forwards;
    transition: all cubic-bezier(0.62, 0, 0.32, 1) 150ms;
  }

  .quickSettings {
    background: var(--bg2);
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .qkCont {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .qkGrp {
        display: flex;
        flex-direction: column;
        align-items: center;

        .qkbtn {
          width: 6rem;
          height: 3rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom-color: rgba(0, 0, 0, 0.2);
          background: var(--bg3);
          border: solid 0.1px rgba(17, 17, 17, 0.1);
          transition: all 0.1s ease;

          &[data-state="true"] {
            background: var(--clrPrm);
          }
        }

        .qktext {
          width: max-content;
          font-size: 0.75em;
          margin: 0.5rem 0 1.33rem 0;
        }
      }
    }
  }

  .sliderCont {
    width: 100%;
    display: flex;
    align-items: center;

    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 5px;
      background: linear-gradient(to right, var(--clrPrm) 50%, #ccc 50%);
      outline: none;
      transition: background 450ms ease-in;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: var(--clrPrm);
      border: 3px solid white;
      cursor: pointer;
      margin-top: -2px; /* align with track */
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }

    .slider::-moz-range-thumb {
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: var(--clrPrm);
      border: 3px solid white;
      cursor: pointer;
    }
  }

  .bottomBar {
    box-sizing: border-box;
    border-top: 1px solid var(--bg4);
    height: 3rem;
    display: flex;
    align-items: center;

    .battery-sidepane {
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 4px;

      &:hover {
        background: var(--bg4);
      }
    }
  }
}
</style>
