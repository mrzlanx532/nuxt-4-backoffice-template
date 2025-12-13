<script setup lang="ts">
const props = withDefaults(defineProps<{
  isOpen: boolean,
  item: any|null
}>(), {
  isOpen: false,
  item: null
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const isOpen = ref(false)

watch(() => props.isOpen, (v) => {
  isOpen.value = v
})
</script>

<template>
  <el-drawer class="browser__detail" :model-value="isOpen" @update:model-value="(v) => emit('update:isOpen', v)" direction="rtl">
    <template #header v-if="props.item">
      <div class="browser__detail-column">
        <div class="browser__detail-header">
          {{ item.id }}
        </div>
        <div class="browser__detail-subheader">
          {{ item.name }}
        </div>
        <div class="browser__detail-controls">
          <el-button-group>
            <el-button  type="primary">Изменить</el-button>
            <el-button  type="danger">Удалить</el-button>
          </el-button-group>
        </div>
      </div>
    </template>
    <template #default>
      <el-scrollbar :always="true" height="100%">
        <div class="browser__detail-content">
          <slot name="detail" />
        </div>
      </el-scrollbar>
    </template>
  </el-drawer>
</template>