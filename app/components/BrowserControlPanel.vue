<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{
  searchString?: string
}>()
</script>

<template>
  <div class="browser__control-panel">
    <div class="browser__control-panel-column --left">
      <div class="browser__control-panel-page-title">Статьи блога</div>
    </div>
    <div class="browser__control-panel-column --center">
      <el-input
          v-model="props.searchString"
          style="width: 242px"
          placeholder="Поиск"
          clearable
      >
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
    <div class="browser__control-panel-column --right">
      123123
    </div>
  </div>
</template>