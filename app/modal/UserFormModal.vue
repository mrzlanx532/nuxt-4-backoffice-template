<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'
import InputFile from '@/components/Form/InputFile.vue'
import ElFormItemWithError from '@/components/Form/ElFormItemWithError.vue'
import Textarea from '@/components/Form/Textarea.vue'
import dayjs from 'dayjs'
import { useForm } from '@/composables/useForm'

interface Locale {
  id: number,
  title: string
}

interface Category {
  id: number,
  name_ru: string,
  name_en: string
}

interface BlogPostFormResponse {
  categories: [],
  entity: {[key: string]: any},
  locales: []
}

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const { $authFetch } = useNuxtApp()

const formData = ref<{[key: string]: any}>({
  locale_id: undefined,
  category_id: undefined,
  name: undefined,
  date: undefined,
  cover: undefined,
  content_short: undefined,
  content: undefined
})

const {
  initForm
} = useForm()

const {
  save,
  isReady,
  errors
} = initForm(
    formData,
    'users/create',
    'users/update',
    emit,
    props.id,
)

const locales = ref<Locale[]>([])
const categories = ref<Category[]>([])

onMounted(async () => {
  const response = await $authFetch<BlogPostFormResponse>('users/form', {
    query: { id: props.id }
  })

  if (props.id) {
    formData.value = response.entity
  }

  isReady.value = true
})
</script>

<template>
  <FormModal @save="save" :is-ready="isReady">
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
            format="DD.MM.YYYY HH:mm:ss"
            value-format="DD.MM.YYYY HH:mm:ss"
            type="datetime"
        />
      </el-form-item-with-error>
      <el-form-item-with-error label="Изображение" name="cover" :errors="errors">
        <InputFile v-model="formData.cover" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Краткое описание" name="content_short" :errors="errors">
        <Textarea v-model="formData.content_short" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Содержание" name="content" :errors="errors">
        <Textarea v-model="formData.content" />
      </el-form-item-with-error>
    </el-form>
  </FormModal>
</template>
