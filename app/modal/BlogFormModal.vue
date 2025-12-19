<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'

const formData = ref({
  locale_id: undefined,
  category_id: undefined,
  name: undefined,
  date: undefined,
  cover: undefined
})

const locales = ref([
  {
    id: 'ru',
    title: 'Русский'
  },
  {
    id: 'en',
    title: 'Английский'
  }
])

const categories = ref([
  {
    id: 1,
    name_en: 'News',
    name_ru: 'Новости'
  },
  {
    id: 2,
    name_en: 'Articles',
    name_ru: 'Статьи'
  },
])

const onSave = () => {
  console.log(1231312)
}
</script>

<template>
  <FormModal @save="onSave">
    <el-form label-position="top">
      <el-form-item label="Язык публикации">
        <el-select v-model="formData.locale_id">
          <el-option
              v-for="locale in locales"
              :key="locale.id"
              :label="locale.title"
              :value="locale.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Категории">
        <el-select v-model="formData.category_id">
          <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name_ru"
              :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Заголовок">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Дата">
        <el-date-picker
            v-model="formData.date"
            type="datetime"
        />
      </el-form-item>
      <el-form-item>

      </el-form-item>
    </el-form>
  </FormModal>
</template>
