<script setup lang="ts">
import { type IFilter, FilterType } from '@@/types/components/browser'
import { type Component } from 'vue'
import BrowserFilterSelect from '@/components/Browser/BrowserFilterSelect.vue'
import BrowserFilterInput from '@/components/Browser/BrowserFilterInput.vue'

const props = defineProps<{
  isLoading: boolean,
  activeFilters: {[key: string]: any[]},
  filters: IFilter[],
}>()

const emit = defineEmits(['active-filters:change'])

const activeFilters = ref<{[key: string]: any[]}>({})

const componentsByType = {
  [FilterType.SELECT_SEARCH]: BrowserFilterSelect,
  [FilterType.SELECT]: BrowserFilterSelect,
  [FilterType.INPUT]: BrowserFilterInput,
  [FilterType.DATE]: BrowserFilterSelect, // TODO
  [FilterType.DATETIME]: BrowserFilterSelect, // TODO
  [FilterType.BOOLEAN]: BrowserFilterSelect // TODO
} as const

watch(props.activeFilters, (value) => {
  activeFilters.value = value
})
</script>

<template>
  <div class="browser__filters" v-if="!props.isLoading">
    <el-form label-position="top">
      <template v-for="filter in props.filters">
        <el-form-item :label="filter.title">
          <component
              :is="componentsByType[filter.type]"
              :key="filter.id"
              :filter="filter"
              :value="activeFilters[filter.id]"
              @update:value="(val: any) => emit('active-filters:change', filter.id, val)"
          />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>