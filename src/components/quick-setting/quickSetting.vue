<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import Icon from '@/components/icons/icon.vue'
import { useSetting, useSidePane } from '@/store'

const sidePaneStore = useSidePane()
const setting = useSetting()

const qsRef = useTemplateRef('quickSettingRef')
onClickOutside(qsRef, () => {
  sidePaneStore.toggleQuickSettingOpen(false)
})
</script>

<template>
  <transition
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__slideOutDown"
    mode="out-in"
  >
    <div
      v-if="sidePaneStore.quickSettingOpen"
      ref="quickSettingRef"
      class="sidePane"
      style="--prefix: PANE"
    >
      <div class="quickSettings p-5 pb-8">
        <div class="qkCont">
          <div v-for="(item, index) in sidePaneStore.quickSetting" :key="index" class="qkGrp">
            <div
              class="qkbtn handcr prtclk"
            >
              <Icon
                class="quickIcon"
                :ui="item.ui"
                :src="item.src"
                width="14"
              />
            </div>
            <div class="qktext">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="sliderCont">
          <Icon class="mx-2" src="brightness" ui width="20">
            <input
              id="brightnessSlider"
              class="sliders bSlider"
              type="range"
              min="10"
              max="100"
            >
          </icon>
        </div>
        <div class="sliderCont">
          <Icon class="mx-2" :src="`audio${setting.audio.mode}`" ui width="18">
            <input
              class="sliders vSlider"
              type="range"
              min="0"
              max="100"
            >
          </icon>
        </div>
      </div>
      <!--    <div class="p-1 bottomBar"> -->
      <!--      <div class="px-3 battery-sidepane"> -->
      <!--        <Battery pct /> -->
      <!--      </div> -->
      <!--    </div> -->
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

    .sliders {
      width: 100%;
      height: 4px;

      &[type="range"] {
        --track-color: linear-gradient(90deg, var(--clrPrm) 100%, #888888 100%);
        -webkit-appearance: none;
        background: transparent;
      }

      &[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: var(--track-color);
        border-radius: 10px;
        border: 0;
      }

      &[type="range"]::-webkit-slider-thumb {
        border: 4px solid var(--sliderThumbClr);
        height: 18px;
        width: 18px;
        border-radius: 10px;
        background: var(--clrPrm);
        -webkit-appearance: none;
        margin-top: -8px;
        transition: all 0.1s;

        &:hover {
          border: 3px solid var(--sliderThumbClr);
        }

        &:active {
          border: 5px solid var(--sliderThumbClr);
        }
      }

      &[type="range"]:focus::-webkit-slider-runnable-track {
        background: var(--track-color);
      }

      &[type="range"]::-moz-range-track {
        width: 100%;
        height: 4px;
        background: var(--track-color);
        border-radius: 10px;
        border: 0;
      }

      &[type="range"]::-moz-range-thumb {
        border: 4px solid var(--sliderThumbClr);
        height: 18px;
        width: 18px;
        border-radius: 10px;
        background: var(--clrPrm);

        &:hover {
          border: 3px solid var(--sliderThumbClr);
        }

        &:active {
          border: 5px solid var(--sliderThumbClr);
        }
      }
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
