<script setup lang="ts">
import { type IFilter, FilterType } from '@@/types/components/browser'
import { type Component } from 'vue'
import BrowserFilterSelect from '@/components/Browser/BrowserFilterSelect.vue'
import BrowserFilterInput from '@/components/Browser/BrowserFilterInput.vue'
import BrowserFilterDate from '@/components/Browser/BrowserFilterDate.vue'
import BrowserFilterDatetime from '@/components/Browser/BrowserFilterDatetime.vue'
import BrowserFilterBoolean from '@/components/Browser/BrowserFilterBoolean.vue'

const props = defineProps<{
  isLoading: boolean,
  activeFilters: {[key: string]: any[]},
  filters: IFilter[],
  height: string
}>()

const emit = defineEmits([
  'active-filters:change',
  'active-filters:reset'
])

const activeFilters = ref<{[key: string]: any[]}>({})

const componentsByType = {
  [FilterType.SELECT_SEARCH]: BrowserFilterSelect,
  [FilterType.SELECT]: BrowserFilterSelect,
  [FilterType.INPUT]: BrowserFilterInput,
  [FilterType.DATE]: BrowserFilterDate,
  [FilterType.DATETIME]: BrowserFilterDatetime,
  [FilterType.BOOLEAN]: BrowserFilterBoolean
} as const

watch(props.activeFilters, (value) => {
  activeFilters.value = value
})
</script>

<template>
  <div class="browser__filters" :style="{height: props.height}">
    <el-scrollbar :always="true">
      <div class="browser__filters-container" v-if="!props.isLoading">
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
        <el-button
            :disabled="Object.keys(props.activeFilters).length === 0"
            type="primary"
            link
            @click="emit('active-filters:reset')"
        >Сбросить фильтры</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>