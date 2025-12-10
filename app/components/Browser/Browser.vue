<script setup lang="ts">
import BrowserControlPanel from '@/components/Browser/BrowserControlPanel.vue'
import { cloneVNode } from 'vue'
import { ElNotification } from 'element-plus'
import type { IItem } from '@@/types'
import type {
  IFilter,
  IResponse
} from '@@/types/components/browser'


const props = withDefaults(defineProps<{
  url: string,
  perPageSizes?: number[]
}>(), {
  perPageSizes: () => [18, 50, 100]
})

const slots = useSlots()
const router = useRouter()
const route = useRoute()

const searchString = ref(route.query.search_string ? route.query.search_string as string : undefined)

interface SortChangedValue {
  order: 'descending' | 'ascending',
  prop: string
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
const isFirstLoading = ref(true)
const isLoading = ref(false)

/** auto-size */
let ro: ResizeObserver | undefined = undefined
const isHeightRead = ref(false)
const tableHeight = ref()
const tableWidth = ref()

/** pagination */
const page = route.query.page ? ref(parseInt(route.query.page as string)) : ref(1)
const perPage = route.query.per_page ? ref(parseInt(route.query.per_page as string)) : ref(18)
const total = ref(0)

/** sorts */
const sortURL = (() => {
  if (route.query.sort) {
    try {
      const parsed = JSON.parse(route.query.sort as string)

      if (parsed) {
        parsed.prop = parsed.field
        parsed.order = undefined

        if (parsed.value === 'desc') {
          parsed.order = 'descending'
        }

        if (parsed.value === 'asc') {
          parsed.order = 'ascending'
        }
      }

      return parsed
    } catch (e: unknown) {
     return undefined
    }
  }

  return undefined
})()
const sorts = ref<{[key: string]: any}>(
    sortURL && sortURL.field && sortURL.value && ['asc', 'desc'].includes(sortURL.value) ?
    {[sortURL.field]: sortURL.value}:
    {}
)
const activeSort = ref<string|null>(sortURL && sortURL.field ? sortURL.field : null)
const sortOrderMapper = {
  'descending': 'desc',
  'ascending': 'asc',
} as const

/** filters */
const filters = ref<IFilter[]>([])
const activeFilters = reactive<{[key: string]: any[]}>({})

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

const onSortChange = (value: SortChangedValue) => {

  page.value = 1

  if (activeSort.value !== value.prop) {
    activeSort.value = value.prop

    for (let sort in sorts.value) {
      sorts.value[sort] = null
    }
  }

  const order = sortOrderMapper[value.order]

  if (value.order !== null) {
    sorts.value[value.prop] = order
  }

  void router.push({
    path: route.path,
    query: {
      ...route.query,
      page: undefined,
      sort: value.order ? JSON.stringify({
        field: value.prop,
        value: order
      }) : undefined
    }
  })

  fetch()
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

  if (Object.keys(activeFilters).length) {
    requestData.filters = activeFilters
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
    setFilters(response.filters)

    total.value = response.meta.count
    page.value = response.meta.page
    perPage.value = response.meta.per_page
    sorts.value = response.meta.sort.reduce((acc: {[key: string]: any}, value: string) => {
      return {...acc, [value]: value === activeSort.value ? sorts.value[value] : null}
    }, {})

  } catch (err: unknown) {
    ElNotification({
      title: 'Ошибка сервера',
      message: 'Что-то пошло не так',
      type: 'error',
      duration: 4000
    })
  } finally {
    isLoading.value = false
  }
}

/** Добавляем в каждый <el-table-column>, переданный в слот #el-table-default директиву sortable='custom' */
const tableColumns = computed(() => {
  const content = slots['el-table-default']?.() ?? []
  return content.map(vnode => {
    if (vnode.type && (vnode.type as any).name === 'ElTableColumn') {
      const extraProps: {sortable?: 'custom'} = {}

      if (vnode.props!.prop in sorts.value) {
        extraProps.sortable = 'custom'
      }

      return cloneVNode(vnode, extraProps)
    }

    return vnode
  })
})

const searchStringUpdated = (value: string) => {
  page.value = 1
  searchString.value = value

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: undefined,
      search_string: value ? value : undefined
    }
  })

  fetch()
}

const onPageChange = (value: number) => {

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page: value
    }
  })

  page.value = value
  fetch()
}

const onPageSizeChange = (value: number) => {

  router.push({
    path: route.path,
    query: {
      ...route.query,
      per_page: value
    }
  })

  perPage.value = value
  fetch()
}

const processFilterValue = (id: string, value: any) => {
  if (value === undefined) {
    delete activeFilters[id]
    return
  }

  if (Array.isArray(value) && value.length) {
    activeFilters[id] = value
    return
  }

  if (Array.isArray(value) && !value.length) {
    delete activeFilters[id]
    return
  }

  activeFilters[id] = [value]
}

const onFilterChange = (id: string, value: any) => {
  page.value = 1
  processFilterValue(id, value)
  fetch()
}

const onFiltersReset = () => {
  page.value = 1
  for (const key in activeFilters) {
    delete activeFilters[key]
  }
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
          @active-filters:change="onFilterChange"
          @active-filters:reset="onFiltersReset"
          :active-filters="activeFilters"
          :filters="filters"
          v-if="!isFirstLoading"
          :is-loading="false"
      />
      <div class="browser__table-container" :style="{height: tableHeight}">
        <div class="browser__table-wrapper">
          <el-table
              :default-sort="sortURL"
              :scrollbar-always-on="true"
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