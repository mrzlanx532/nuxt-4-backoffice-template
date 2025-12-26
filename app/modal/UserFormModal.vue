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
      <el-form-item-with-error label="Имя" name="first_name" :errors="errors">
        <el-input v-model="formData.first_name" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Фамилия" name="last_name" :errors="errors">
        <el-input v-model="formData.last_name" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Email" name="email" :errors="errors">
        <el-input v-model="formData.email" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Телефон" name="phone" :errors="errors">
        <el-input v-model="formData.phone" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Пароль" name="password" :errors="errors">
        <el-input v-model="formData.password" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Подтверждение пароля" name="password_confirmation" :errors="errors">
        <el-input v-model="formData.password_confirmation" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Язык" name="locale_id" :errors="errors">
        <el-input v-model="formData.locale_id" />
      </el-form-item-with-error>
      <el-form-item-with-error label="О себе" name="about" :errors="errors">
        <Textarea v-model="formData.about" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Фотография" name="picture" :errors="errors">
        <InputFile v-model="formData.picture" />
      </el-form-item-with-error>
    </el-form>
  </FormModal>
</template>
