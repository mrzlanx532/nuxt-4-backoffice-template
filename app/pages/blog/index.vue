<script setup lang="ts">
import Browser from '@/components/Browser/Browser.vue'
import Tabs from '@/components/Tabs.vue'
import MainTab from '@/pages/blog/_tabs/main.vue'
import PhotosTab from '@/pages/blog/_tabs/photos.vue'
import { ElTag } from '#components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ArrowDown as IconArrowDown } from '@element-plus/icons-vue'
import { useModal } from 'vue-final-modal'
import BlogFormModal from '@/modal/BlogFormModal.vue'

dayjs.extend(utc)
dayjs.extend(timezone)

definePageMeta({
  middleware: ['auth'],
})

interface BlogPostRow {
  id: number
  date: string
  name: string
  category: { name_ru: string }
  locale: { title: string }
  state: { id: 'DRAFT' | 'PUBLISHED'; title: string }
  address: string
}

const { $authFetch } = useNuxtApp()

const tagMapper = {
  'DRAFT': 'info',
  'PUBLISHED': 'success'
} as const

const selectionItems = ref<any[]>([])

const item = ref<any>()

const { initTabs } = useTabs()

const refreshIncrement = ref(0)
const fetchIncrement = ref(0)
const fetchDetailIncrement = ref(0)

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab
} = initTabs([
  {
    title: 'Пост',
    component: MainTab
  },
  {
    title: 'Фото',
    component: PhotosTab
  }
])

const renderStateTag = (row: BlogPostRow) => {
  return h(
      ElTag,
      {
        type: tagMapper[row.state.id] ?? 'primary',
        effect: 'dark',
      },
      () => row.state.title
  )
}

const onClickCreateOrEdit = async (id?: number) => {
  const modal = useModal({
    component: BlogFormModal,
    attrs: {
      id,
      onClose: () => {
        modal.close()
        refreshIncrement.value++
      }
    }
  })

  await modal.open()
}

const onClickDelete = (id: number) => {
  ElMessageBox.confirm(
      'Вы уверены, что хотите удалить?',
      'Подтверждение',
      {
        customClass: 'browser__detail-confirm',
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        center: true
      }
  ).then(async () => {
    const response = await $authFetch<{status: boolean}>('blog/posts/delete', {
      method: 'POST',
      body: { id }
    })

    if (response.status) {
      refreshIncrement.value++
    }
  }, () => {})
}

const onSelectionChange = (items: any[]) => {
  selectionItems.value = items
}

const onClickPublish = (id: number) => {

  ElMessageBox.confirm(
      'Вы уверены, что хотите опубликовать?',
      'Подтверждение',
      {
        customClass: 'browser__detail-confirm',
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
        center: true
      }
  ).then(async () => {
    const response = await $authFetch<{status: boolean}>('blog/posts/publish', {
      method: 'POST',
      body: { id }
    })

    if (response.status) {
      fetchIncrement.value++
      fetchDetailIncrement.value++

      ElNotification({
        message: 'Статья опубликована',
        type: 'success',
        duration: 2000
      })
    }
  })
}

const onClickWithdraw = async (id: number) => {

  const response = await $authFetch<{status: boolean}>('blog/posts/withdraw', {
    method: 'POST',
    body: { id }
  })

  if (response.status) {
    fetchIncrement.value++
    fetchDetailIncrement.value++
  }

  ElNotification({
    message: 'Статья снята с публикации',
    type: 'info',
    duration: 2000
  })
}
</script>

<template>
  <Browser
      :refresh-increment="refreshIncrement"
      :fetch-increment="fetchIncrement"
      :fetch-detail-increment="fetchDetailIncrement"
      header="Статьи блога"
      url="blog/posts/browse"
      url-detail="blog/posts/detail"
      @selection-change="onSelectionChange"
      @item-updated="(_item) => item = _item"
  >
    <template #control-panel-right>
      <el-space>
        <el-dropdown trigger="click">
          <el-button type="primary">
            Массовые действия ({{ selectionItems.length }})
            <el-icon class="el-icon--right">
              <IconArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Редактировать</el-dropdown-item>
              <el-dropdown-item>Удалить</el-dropdown-item>
              <el-dropdown-item divided>Архивировать</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="success" @click="onClickCreateOrEdit(undefined)">Добавить</el-button>
      </el-space>
    </template>
    <template #table>
      <el-table-column type="selection" label="ID" />
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="date" label="Дата" width="180">
        <template #default="{ row }: { row: BlogPostRow}">
          {{ (dayjs.utc(row.date, 'DD.MM.YYYY HH:mm')).local().format('DD.MM.YYYY HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Заголовок" />
      <el-table-column label="Рубрика">
        <template #default="{ row }: { row: BlogPostRow }">
          {{ row.category.name_ru }}
        </template>
      </el-table-column>
      <el-table-column label="Локаль">
        <template #default="{ row }">
          {{ row.locale.title }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template #default="{ row }">
          <component :is="renderStateTag(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Создан">
        <template #default="{ row }">
          {{ dayjs.unix(row.created_at).format('DD.MM.YYYY') }}
        </template>
      </el-table-column>
    </template>
    <template #detail-header="{ item }">
      <div class="browser__detail-header">
        {{ item.id }}
      </div>
      <div class="browser__detail-subheader">
        {{ item.name }}
      </div>
      <div class="browser__detail-controls">
        <el-space>
          <el-button-group>
            <el-button type="primary" @click="onClickCreateOrEdit(item.id)">Изменить</el-button>
            <el-button type="danger" @click="onClickDelete(item.id)">Удалить</el-button>
          </el-button-group>
          <el-button type="info" v-if="item.state.id === 'PUBLISHED'" @click="onClickWithdraw(item.id)">Снять с публикации</el-button>
          <el-button type="success" v-if="item.state.id === 'DRAFT'" @click="onClickPublish(item.id)">Опубликовать</el-button>
        </el-space>
      </div>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs"/>
    </template>
    <template #detail-content>
      <component :is="selectedTabComponent" :item="item" />
    </template>
  </Browser>
</template>