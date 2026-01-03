<script setup lang="ts">
import Browser from '@/components/Browser/Browser.vue'
import Tabs from '@/components/Tabs.vue'
import InfoTab from '@/pages/users/_tabs/info.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { ElMessageBox } from 'element-plus'
import { useModal } from 'vue-final-modal'
import UserFormModal from '~/modal/UserForm/UserFormModal.vue'

dayjs.extend(utc)
dayjs.extend(timezone)

definePageMeta({
  middleware: ['auth'],
})

interface UserRow {
  id: number
  name: string
  downloads_counter: number
  views_counter: number
  subscription_till: string | null
}

const refreshIncrement = ref(0)

const { $authFetch } = useNuxtApp()

const selectionItems = ref<any[]>([])

const item = ref<any>()

const { initTabs } = useTabs()

const {
  tabs,
  selectedTabComponent,
  selectedTab
} = initTabs([
  {
    title: 'Инфо',
    component: InfoTab
  },
  {
    title: 'Подписка',
    component: InfoTab
  },
  {
    title: 'Скачанное (музыка)',
    component: InfoTab
  },
  {
    title: 'Скачанное (шумы)',
    component: InfoTab
  },
  {
    title: 'Отчеты',
    component: InfoTab
  }
])

const onClickCreateOrEdit = async (id?: number) => {
  const modal = useModal({
    component: UserFormModal,
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
    const response = await $authFetch<{status: boolean}>('users/delete', {
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
</script>

<template>
  <Browser
      :refresh-increment="refreshIncrement"
      header="Пользователи"
      url="users/browse"
      url-detail="users/detail"
      @selection-change="onSelectionChange"
      @item-updated="(_item) => item = _item"
  >
    <template #control-panel-right>
      <el-button type="success" @click="onClickCreateOrEdit(undefined)">Добавить</el-button>
    </template>
    <template #table>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Имя" width="180" />
      <el-table-column label="Подписка (срок действия)">
        <template #default="{ row }: { row: UserRow }">
          {{ row.subscription_till }}
        </template>
      </el-table-column>
      <el-table-column prop="downloads_counter" label="Скач." />
      <el-table-column prop="views_counter" label="Просмотр" />
      <el-table-column prop="created_at" label="Дата создания">
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
        </el-space>
      </div>
      <Tabs v-model="selectedTab" :tabs="tabs"/>
    </template>
    <template #detail-content>
      <component :is="selectedTabComponent" :item="item" />
    </template>
  </Browser>
</template>