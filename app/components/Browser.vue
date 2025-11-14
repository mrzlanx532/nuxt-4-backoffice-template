<script setup lang="ts">
import BrowserControlPanel from '@/components/BrowserControlPanel.vue'
import { cloneVNode } from 'vue'
import { ElNotification } from 'element-plus'

const props = withDefaults(defineProps<{
  url: string,
  perPageSizes?: number[]
}>(), {
  perPageSizes: () => [18, 50, 100]
})

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

const controlPanelTemplateRef = useTemplateRef<typeof BrowserControlPanel>('controlPanelTemplateRef')
const browserContainerTemplateRef = useTemplateRef('browserContainerTemplateRef')

const data = ref<IItem[]>([])
const filters = ref<IFilter[]>([])
const isFirstLoading = ref(true)
const isLoading = ref(false)

/** auto-size */
let ro: ResizeObserver | undefined = undefined
const isHeightRead = ref(false)
const tableHeight = ref()
const tableWidth = ref()

/** pagination */
const page = ref(1)
const perPage = ref(18)
const total = ref(0)

const { $authFetch } = useNuxtApp()

const updateDimensions = () => {
  tableHeight.value = (window.innerHeight - 60 - 42 - controlPanelTemplateRef.value!.rootTemplateRef.offsetHeight) + 'px'
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

const setFilters = (_filters: IFilter[]) => {
  const preparedFilters: IFilter[] = [];
  const preparedFiltersByName: {[key: string]: IFilter} = {};

  _filters.forEach((filter) => {
    preparedFilters.push(filter)
    preparedFiltersByName[filter.id] = filter
  })

  filters.value = preparedFilters
  // filtersByName.value = preparedFiltersByName
}

const fetch = async () => {

  isLoading.value = true

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

  if (perPage.value !== 20) {
    requestData.per_page = perPage.value
  }

  if (page.value > 1) {
    requestData.page = page.value
  }

  config.params = requestData

  try {
    const response = await $authFetch<IResponse>(props.url, config)

    data.value = response.items
    filters.value = response.filters

    total.value = response.meta.count
    page.value = response.meta.page
    perPage.value = response.meta.per_page

    isLoading.value = false

  } catch (err: unknown) {
    isLoading.value = true
    ElNotification({
      title: 'Ошибка сервера',
      message: 'Что-то пошло не так',
      type: 'error',
      duration: 4000
    })
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

const searchStringUpdated = (value: string) => {
  searchString.value = value
}

const onPageChange = (value: number) => {
  page.value = value
  fetch()
}

const onPageSizeChange = (value: number) => {
  perPage.value = value
  fetch()
}

onMounted(() => {
  ro = initResizeObserver()
  updateDimensions()

  isHeightRead.value = true

  fetch().then(() => {
    isFirstLoading.value = false
  })
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<template>
  <div class="browser">
    <BrowserControlPanel
        :search-string="searchString"
        @update:search-string="searchStringUpdated"
        ref="controlPanelTemplateRef"
    >
      <template #control-panel-right>
        <slot name="control-panel-right" />
      </template>
    </BrowserControlPanel>
    <div
        v-if="isFirstLoading"
        v-loading="true"
        class="browser__loader"
        :class="{'--active': isHeightRead}"
        :style="{height: tableHeight}"
    />
    <div class="browser__container" ref="browserContainerTemplateRef">
      <BrowserFilters
          v-if="!isFirstLoading"
          :is-loading="false"
      />
      <div class="browser__table-container" :style="{height: tableHeight}">
        <div class="browser__table-wrapper">
          <el-table
              v-if="!isFirstLoading"
              :class="{'--loading': isLoading}"
              :style="{width: tableWidth}"
              @sort-change="onSortChange"
              :data="data"
              :max-height="tableHeight"
          >
            <template v-for="column in tableColumns" :key="column.key || column.props?.prop">
              <component :is="column" />
            </template>
          </el-table>
        </div>
        <el-pagination
            v-if="!isFirstLoading"
            class="--browser"
            v-model:current-page="page"
            v-model:page-size="perPage"
            :page-sizes="props.perPageSizes"
            :disabled="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>