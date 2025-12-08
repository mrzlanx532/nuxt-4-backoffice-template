<script setup lang="ts">
import Browser from '@/components/Browser/Browser.vue'
import { ElTag } from '#components'
import dayjs from 'dayjs'

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

const tagMapper = {
  'DRAFT': 'info',
  'PUBLISHED': 'success'
} as const

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

</script>

<template>
  <Browser url="blog/posts/browse">
    <template #control-panel-right>
      <el-button type="primary">Добавить</el-button>
    </template>
    <template #el-table-default>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="date" label="Дата" width="180" />
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
  </Browser>
</template>