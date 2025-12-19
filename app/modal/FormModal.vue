<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Close as IconClose } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const height = ref<string|number>('0px')
const maxHeightModal = ref('0px')

const updateDimensions = () => {
  height.value = window.innerHeight - 40 + 'px'
}

onMounted(() => {
  height.value = document.documentElement.clientHeight - 40 + 'px'
  maxHeightModal.value = document.documentElement.clientHeight + 'px'

  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<template>
  <VueFinalModal
      class="modal"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
  >
      <el-scrollbar :always="true" :style="{height: height}">
        <form class="form">
          <div class="form__header">
            <div class="form__header-section-top">
              <div class="form__header-title">{{ 'Редактирование статьи' }}</div>
              <div class="form__header-close-button" >
                <IconClose />
              </div>
            </div>
          </div>
          <div class="form__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque cupiditate earum et impedit magni possimus quas, quis tempore! Aperiam consectetur consequuntur ea eaque et fugiat impedit magni molestias obcaecati ratione!
          </div>
          <div class="form__footer">
            <el-button-group>
              <el-button type="success">Сохранить</el-button>
              <el-button >Отмена</el-button>
            </el-button-group>
          </div>
        </form>
      </el-scrollbar>
  </VueFinalModal>
</template>