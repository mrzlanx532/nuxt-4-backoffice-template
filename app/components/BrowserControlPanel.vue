<script setup lang="ts">
import { Search as IconSearch } from '@element-plus/icons-vue'
import { CircleClose as IconCircleClose } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  searchString?: string
}>(), {
  searchString: '',
})

const emit = defineEmits<{
  (e: 'update:searchString', value: string): void
}>()

const searchString = ref<string>('')

const onInputChange = (value: string) => {
  emit('update:searchString', value)
}

const onInputButtonEnter = () => {
  emit('update:searchString', searchString.value)
}

const onInput = (value: string) => {
  if (value === '') {
    emit('update:searchString', '')
  }
}

const onInputClear = () => {
  emit('update:searchString', '')
}

watch(() => props.searchString, (value) => {
  searchString.value = value
})
</script>

<template>
  <div class="browser__control-panel">
    <div class="browser__control-panel-column --left">
      <div class="browser__control-panel-page-title">Статьи блога</div>
    </div>
    <div class="browser__control-panel-column --center">
      <el-input
          v-model="searchString"
          style="width: 242px"
          placeholder="Поиск"
          @change="onInputChange"
          @input="onInput"
      >
        <template #suffix>
          <el-icon v-if="props.searchString !== ''" @click="onInputClear">
            <IconCircleClose />
          </el-icon>
        </template>
        <template #append>
          <el-button :icon="IconSearch" @click="onInputButtonEnter" />
        </template>
      </el-input>
    </div>
    <div class="browser__control-panel-column --right">
      123123
    </div>
  </div>
</template>