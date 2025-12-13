<script setup lang="ts">
import Browser from '@/components/Browser/Browser.vue'
import { ElTag } from '#components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { ElMessageBox } from 'element-plus'

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

const browserTemplateRef = useTemplateRef<typeof Browser>('browserTemplateRef')

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

const onClickDelete = (id: number) => {
  ElMessageBox.confirm(
      'Вы уверены, что хотите удалить?',
      'Подтверждение',
      {
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
      browserTemplateRef.value!.refresh()
    }
  })
}
</script>

<template>
  <Browser url="blog/posts/browse" ref="browserTemplateRef">
    <template #control-panel-right>
      <el-button type="primary">Добавить</el-button>
    </template>
    <template #table>
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
        <el-button-group>
          <el-button type="primary">Изменить</el-button>
          <el-button type="danger" @click="onClickDelete(item.id)">Удалить</el-button>
        </el-button-group>
      </div>
    </template>
    <template #detail-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam iusto laudantium ullam velit voluptate? Facilis ipsa iste porro quia quo? Architecto culpa dolore et minus mollitia non temporibus voluptas. Rerum!
    </template>
  </Browser>
</template>