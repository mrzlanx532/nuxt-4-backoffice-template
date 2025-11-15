<script setup lang="ts">
import { type IFilter, FilterType } from '@@/types/components/browser'
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps<{
  isLoading: boolean,
  activeFilters: {[key: string]: any[]},
  filters: IFilter[],
}>()

const emit = defineEmits(['active-filters:change'])

const activeFilters = ref<{[key: string]: any[]}>({})

const renderSelectSearch = (filter: IFilter, onUpdate: (value: any) => void) => {

  return h(
      ElSelect,
      {
        modelValue: filter.config.multiple ? activeFilters.value[filter.id] : activeFilters.value[filter.id]?.[0],
        'onUpdate:modelValue': onUpdate,
        filterable: filter.config.filter,
        multiple: filter.config.multiple,
        clearable: true,
      },
      () =>
          filter.options?.map((item: any) =>
              h(ElOption, {
                key: item.id,
                label: item.title,
                value: item.id
              })
          )
  )
}

const getFilterByType: Record<
    FilterType,
    (filter: IFilter, onUpdate: (value: any) => void) => VNode
> = {
  [FilterType.SELECT_SEARCH]: renderSelectSearch,
  [FilterType.SELECT]: (filter, onUpdate) => h('div'),
  [FilterType.INPUT]: (filter, onUpdate) => h('div'),
  [FilterType.DATE]: (filter, onUpdate) => h('div'),
  [FilterType.DATETIME]: (filter, onUpdate) => h('div'),
  [FilterType.BOOLEAN]: (filter, onUpdate) => h('div')
}

const getFilter = (filter: IFilter) => {
  return () => {
    const onUpdate = (val: any) => {
      emit('active-filters:change', filter.id, val)
    }
    return getFilterByType[filter.type](filter, onUpdate)
  }
}

watch(props.activeFilters, (value) => {
  activeFilters.value = value
})
</script>

<template>
  <div class="browser__filters" v-if="!props.isLoading">
    <el-form label-position="top">
      <template v-for="filter in props.filters">
        <el-form-item :label="filter.title">
          <component :is="getFilter(filter)" :key="filter.id"/>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>