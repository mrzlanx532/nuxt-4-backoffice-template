<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'
import InputFile from '@/components/Form/InputFile.vue'
import ElFormItemWithError from '@/components/Form/ElFormItemWithError.vue'
import { FetchError } from 'ofetch'
import { ElNotification } from 'element-plus'
import { cloneDeep } from 'lodash'

interface Locale {
  id: number,
  title: string
}

interface Category {
  id: number,
  name_ru: string,
  name_en: string
}

type IItem = {[key: string]: any}

interface BlogPostFormResponse {
  categories: [],
  entity: {[key: string]: any},
  locales: []
}

const props = defineProps<{
  id?: number
}>()

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

const locales = ref<Locale[]>([])
const categories = ref<Category[]>([])

const isFetchError = (instance: any): instance is FetchError => {
  return instance.name === 'FetchError'
}

const formRequestBody = (formDataValues: IItem, id: number | undefined = undefined): IItem | FormData => {

  const _formDataValues = cloneDeep(formDataValues)

  let isRequiredFormData = false

  Object.values(_formDataValues).map((value) => {
    if (value instanceof File) {
      isRequiredFormData = true
    }
  });

  if (isRequiredFormData) {
    const formData = new FormData

    Object.entries(_formDataValues).map(([key, value]) => {

      if (value === undefined) {
        return
      }

      if (typeof value === 'boolean') {
        value = value ? 1 : 0
      }

      if (value instanceof Array) {
        value.forEach(item => {
          formData.append(`${key}[]`, item)
        })

        return
      }

      if (value === null) {
        value = '__null__'
      }

      formData.append(key, value)
    })

    if (id !== undefined) {
      formData.append('id', id.toString())
    }

    return formData
  }

  Object.entries(_formDataValues).map(([key, value]) => {

    if (value instanceof Array) {
      return
    }

    if (value instanceof Object) {
      _formDataValues[key] = undefined
    }
  })

  if (id !== undefined) {
    _formDataValues.id = id
  }

  return _formDataValues
}

const onSave = async () => {

  try {
    const response = await $authFetch(props.id ? 'blog/posts/update' : 'blog/posts/create', {
      body: formRequestBody(formData.value, props.id),
      method: 'post'
    })
  } catch (e) {
    if (!isFetchError(e)) {
      return
    }

    if (e.status === 422) {
      ElNotification({
        title: 'Ошибки валидации',
        message: 'Исправьте ошибки в форме',
        type: 'error',
        duration: 5000
      })

      errors.value = e.data.errors
    }
  }
}

onMounted(async () => {
  if (props.id) {
    const response = await $authFetch<BlogPostFormResponse>('blog/posts/form?id=' + props.id)

    locales.value = response.locales
    categories.value = response.categories
  }
})
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
