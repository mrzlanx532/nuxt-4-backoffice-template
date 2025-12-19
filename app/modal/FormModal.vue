<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { Close as IconClose } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <VueFinalModal
      class="modal"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      @closed="emit('close')"
  >
    <!-- @vue-ignore -->
    <template #default="{ close }">
      <div class="modal__container" @click="(e) => e.target === e.currentTarget && close()">
        <OverlayScrollbarsComponent class="modal-custom-scroll">
          <div class="modal__content">
            <form class="form">
              <div class="form__header">
                <div class="form__header-section-top">
                  <div class="form__header-title">{{ 'Редактирование статьи' }}</div>
                  <div class="form__header-close-button" >
                    <IconClose @click="close"/>
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
              </div>
              <div class="form__footer">
                <el-button-group>
                  <el-button type="success">Сохранить</el-button>
                  <el-button @click="close">Отмена</el-button>
                </el-button-group>
              </div>
            </form>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </template>
  </VueFinalModal>
</template>
