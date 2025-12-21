<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'
import InputFile from '@/components/Form/InputFile.vue'
import ElFormItemWithError from '@/components/Form/ElFormItemWithError.vue'
import { FetchError } from 'ofetch'

const { $authFetch } = useNuxtApp()

const formData = ref({
  locale_id: undefined,
  category_id: undefined,
  name: undefined,
  date: undefined,
  cover: undefined,
  content_short: undefined,
  content: undefined
})

const errors = ref<{[key: string]: string[]}>({})

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

const isFetchError = (instance: any): instance is FetchError => {
  return instance.name === 'FetchError'
}

const onSave = async () => {

  try {
    const response = await $authFetch('blog/posts/create', {
      body: formData.value,
      method: 'post'
    })
  } catch (e) {
    if (!isFetchError(e)) {
      return
    }

    if (e.status === 422) {
      errors.value = e.data.errors
    }
  }
}
</script>

<template>
  <FormModal @save="onSave">
    <el-form label-position="top">
      <el-form-item-with-error label="Язык публикации" name="locale_id" :errors="errors">
        <el-select v-model="formData.locale_id">
          <el-option
              v-for="locale in locales"
              :key="locale.id"
              :label="locale.title"
              :value="locale.id"
          />
        </el-select>
      </el-form-item-with-error>
      <el-form-item-with-error label="Категории" name="category_id" :errors="errors">
        <el-select v-model="formData.category_id">
          <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name_ru"
              :value="category.id"
          />
        </el-select>
      </el-form-item-with-error>
      <el-form-item-with-error label="Заголовок" name="name" :errors="errors">
        <el-input v-model="formData.name" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Дата" name="date" :errors="errors">
        <el-date-picker
            v-model="formData.date"
            type="datetime"
        />
      </el-form-item-with-error>
      <el-form-item-with-error label="Изображение" name="cover" :errors="errors">
        <InputFile v-model="formData.cover" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Краткое описание" name="content_short" :errors="errors">
        <el-input v-model="formData.content_short" type="textarea" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Содержание" name="content" :errors="errors">
        <el-input v-model="formData.content" type="textarea" />
      </el-form-item-with-error>
    </el-form>
  </FormModal>
</template>
