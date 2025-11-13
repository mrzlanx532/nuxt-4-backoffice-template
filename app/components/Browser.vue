<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { cloneVNode } from 'vue'

const props = defineProps<{
  url: string
}>()

const slots = useSlots()

const searchString = ref()

export type IItem = {[key: string]: any}

export interface IFilterConfig {
  filter: boolean
  hidden: boolean
  mask: string|null
  multiple: boolean
  range: boolean
  url: string
  nullable: boolean
}

const enum FilterType {
  SELECT = 'SELECT',
  SELECT_SEARCH = 'SELECT_SEARCH',
  INPUT = 'INPUT',
  DATE = 'DATE',
  DATETIME = 'DATETIME',
  BOOLEAN = 'BOOLEAN',
}

export interface IFilter {
  id: string
  title: string
  type: FilterType
  options?: {
    id: string
    title: string
  }[]
  config: IFilterConfig
}

interface IResponse {
  filters: IFilter[],
  items: IItem[],
  meta: {
    browser_id: string,
    count: number,
    page: number,
    per_page: number,
    searchable: boolean,
    sort: string[]
  }
}

interface IRequestParams {
  filters?: {},
  search_string?: string,
  sort?: {
    field: string,
    direction: string
  }
  per_page: number,
  page: number
}

let ro: ResizeObserver | undefined = undefined

const controlPanelTemplateRef = useTemplateRef('controlPanelTemplateRef')
const browserContainerTemplateRef = useTemplateRef('browserContainerTemplateRef')

const data = ref<IItem[]>([])
const isLoading = ref(true)
const isHeightAreRead = ref(false)
const height = ref()
const tableWidth = ref()

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]

const { $authFetch } = useNuxtApp()

const updateDimensions = () => {
  height.value = (window.innerHeight - 60 - controlPanelTemplateRef.value!.offsetHeight) + 'px'
  tableWidth.value = (browserContainerTemplateRef.value!.offsetWidth - 225 - 10) + 'px'
}

const initResizeObserver = () => {
  const body = document.body;
  let lastHeight = body.offsetHeight;

  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const newHeight = entry.contentRect.height;
      if (newHeight !== lastHeight) {
        updateDimensions()
        lastHeight = newHeight;
      }
    }
  });

  observer.observe(body);

  return observer
}

const onSortChange = (d: any, t: any) => {
  console.log(d, t)
}

const fetch = async () => {

  const config: { params?: IRequestParams } = {}

  const requestData = {} as IRequestParams;

/*  if (Object.keys(activeFilters.value).length) {
    requestData.filters = activeFilters.value
  }

  if (searchString.value !== '') {
    requestData.search_string = searchString.value
  }

  if (activeSort.value && sorts.value[activeSort.value]) {
    requestData.sort = {
      field: activeSort.value,
      direction: sorts.value[activeSort.value]
    }
  }

  if (selectedPaginationItemsCount.value !== 20) {
    requestData.per_page = selectedPaginationItemsCount.value
  }

  if (currentPage.value > 1) {
    requestData.page = currentPage.value
  }*/

  config.params = requestData

  try {
    const response = await $authFetch<IResponse>(props.url, config)

    data.value = response.items

  } catch (err: unknown) {

  }
}

// Вытаскиваем слот el-table-default и модифицируем колонки
const tableColumns = computed(() => {
  const content = slots['el-table-default']?.() ?? []
  return content.map(vnode => {
    // Если это el-table-column — добавляем sortable
    if (vnode.type && (vnode.type as any).name === 'ElTableColumn') {
      return cloneVNode(vnode, {
        sortable: 'custom',
      })
    }
    // иначе возвращаем как есть
    return vnode
  })
})

onMounted(async () => {

  ro = initResizeObserver()
  updateDimensions()

  isHeightAreRead.value = true

  await fetch()

  isLoading.value = false
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<template>
  <div class="browser">
    <div class="browser__control-panel" ref="controlPanelTemplateRef">
      <div class="browser__control-panel-column --left">
        <div class="browser__control-panel-page-title">Статьи блога</div>
      </div>
      <div class="browser__control-panel-column --center">
        <el-input
            v-model="searchString"
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
    <div
        v-if="isLoading"
        v-loading="true"
        class="browser__loader"
        :class="{'--active': isHeightAreRead}"
        :style="{ height: height }"
    />
    <div class="browser__container" ref="browserContainerTemplateRef">
      <div class="browser__filters" v-if="!isLoading">
        <el-select
            v-model="value"
            filterable
            placeholder="Select"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="browser__table-wrapper" >
        <el-table
            :style="{width: tableWidth}"
            v-if="!isLoading"
            @sort-change="onSortChange"
            :data="data"
            :max-height="height"
        >
          <template v-for="column in tableColumns" :key="column.key || column.props?.prop">
            <component :is="column" />
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>