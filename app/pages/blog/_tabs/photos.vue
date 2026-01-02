<script setup lang="ts">
import BrowserInDetail from '@/components/Browser/BrowserInDetail.vue'
import { MoreFilled as IconMoreFilled } from "@element-plus/icons-vue";

interface PhotoRow {
  name: string
  picture: {
    original: string
  } | null
}

interface IBlogPost {
  cover: {
    original: string
  } | null
  content_short: string | null,
  content: string | null
}

const props = defineProps<{
  item?: IBlogPost
}>()
</script>

<template>
  <BrowserInDetail url="blog/posts/contents/browse">
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
                  <el-dropdown-item><el-text type="primary">Изменить</el-text></el-dropdown-item>
                  <el-dropdown-item><el-text type="danger">Удалить</el-text></el-dropdown-item>
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