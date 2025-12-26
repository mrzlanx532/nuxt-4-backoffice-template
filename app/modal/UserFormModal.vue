<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'
import InputFile from '@/components/Form/InputFile.vue'
import ElFormItemWithError from '@/components/Form/ElFormItemWithError.vue'
import Textarea from '@/components/Form/Textarea.vue'
import { useForm } from '@/composables/useForm'

interface BlogPostFormResponse {
  categories: [],
  entity: {[key: string]: any},
  locales: []
}

interface Locale {
  id: string
  title: string
}

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const locales = ref<Locale[]>([])

const { $authFetch } = useNuxtApp()

const formData = ref<{[key: string]: any}>({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  password_confirmation: undefined,
  locale_id: undefined,
  about: undefined,
  picture: undefined,
  is_checked: false
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

onMounted(async () => {
  const response = await $authFetch<BlogPostFormResponse>('users/form', {
    query: { id: props.id }
  })

  if (props.id) {
    formData.value = response.entity
  }

  locales.value = response.locales

  isReady.value = true
})
</script>

<template>
  <FormModal @save="save" :is-ready="isReady">
    <el-form label-position="top">
      <el-space>
        <el-form-item-with-error label="Имя" name="first_name" :errors="errors">
          <el-input v-model="formData.first_name" />
        </el-form-item-with-error>
        <el-form-item-with-error label="Фамилия" name="last_name" :errors="errors">
          <el-input v-model="formData.last_name" />
        </el-form-item-with-error>
      </el-space>
      <el-space>
        <el-form-item-with-error label="Email" name="email" :errors="errors">
          <el-input v-model="formData.email" />
        </el-form-item-with-error>
        <el-form-item-with-error label="Телефон" name="phone" :errors="errors">
          <el-input v-model="formData.phone" />
        </el-form-item-with-error>
      </el-space>
      <el-space>
        <el-form-item-with-error label="Пароль" name="password" :errors="errors">
          <el-input type="password" v-model="formData.password" />
        </el-form-item-with-error>
        <el-form-item-with-error label="Подтверждение пароля" name="password_confirmation" :errors="errors">
          <el-input type="password" v-model="formData.password_confirmation" />
        </el-form-item-with-error>
      </el-space>
      <el-form-item-with-error label="Язык" name="locale_id" :errors="errors">
        <el-select v-model="formData.locale_id">
          <el-option
              v-for="locale in locales"
              :key="locale.id"
              :label="locale.title"
              :value="locale.id"
          />
        </el-select>
      </el-form-item-with-error>
      <el-form-item-with-error label="О себе" name="about" :errors="errors">
        <Textarea v-model="formData.about" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Фотография" name="picture" :errors="errors">
        <InputFile v-model="formData.picture" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Фотография" name="is_checked" :errors="errors">
        <el-checkbox v-model="formData.is_checked" label="Согласен с условиями пользовательского соглашения" size="large" />
      </el-form-item-with-error>
    </el-form>
  </FormModal>
</template>
