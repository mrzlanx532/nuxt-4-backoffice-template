<script setup lang="ts">
import BrowserInDetail from '@/components/Browser/BrowserInDetail.vue'
import { MoreFilled as IconMoreFilled } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

interface PhotoRow {
  id: number
  name: string
  picture: {
    original: string
  } | null
}

interface IBlogPost {
  id: number
  cover: {
    original: string
  } | null
  content_short: string | null,
  content: string | null
}

const props = defineProps<{
  item?: IBlogPost
}>()

const { $authFetch } = useNuxtApp()

const refreshIncrement = ref(0)

const onClickAdd = () => {
  console.log(123)
}

const onClickEdit = (id: number) => {
  console.log(id)
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
    const response = await $authFetch<{status: boolean}>('blog/posts/contents/delete', {
      method: 'POST',
      body: { id }
    })

    if (response.status) {
      refreshIncrement.value++
    }
  }, () => {})
}
</script>

<template>
  <BrowserInDetail
      url="blog/posts/contents/browse"
      :filters="{blog_post_id: [props.item!.id]}"
      :refresh-increment="refreshIncrement"
  >
    <template #action>
      <el-button type="success" @click="onClickAdd">Добавить</el-button>
    </template>
    <template #table>
      <el-table-column>
        <template #default="{ row }: { row: PhotoRow}">
          <el-image :src="row.picture?.original" style="width: 50%;"/>
        </template>
      </el-table-column>
      <el-table-column width="150" align="right" class-name="vertical-align-top">
        <template #default="{ row }: { row: PhotoRow}">
            <el-dropdown type="primary">
              <el-icon><IconMoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="onClickEdit(row.id)"><el-text type="primary">Изменить</el-text></el-dropdown-item>
                  <el-dropdown-item @click="onClickDelete(row.id)"><el-text type="danger">Удалить</el-text></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </template>
      </el-table-column>
    </template>
  </BrowserInDetail>
</template>

<style scoped>
.vertical-align-top {
  vertical-align: top;
}
</style>