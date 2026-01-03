<script setup lang="ts">
import FormModal from '@/modal/FormModal.vue'
import InputFile from '@/components/Form/InputFile.vue'
import ElFormItemWithError from '@/components/Form/ElFormItemWithError.vue'
import { useForm } from '@/composables/useForm'

interface BlogPostContentFormResponse {
  entity: {[key: string]: any},
}

const props = defineProps<{
  id?: number,
  blog_post_id: number,
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const { $authFetch } = useNuxtApp()

const formData = ref<{[key: string]: any}>({
  blog_post_id: props.blog_post_id
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
    'blog/posts/contents/create',
    'blog/posts/contents/update',
    emit,
    props.id,
)

onMounted(async () => {
  const response = await $authFetch<BlogPostContentFormResponse>('blog/posts/contents/form', {
    query: { id: props.id }
  })

  if (props.id) {
    formData.value = response.entity
  }

  isReady.value = true
})
</script>

<template>
  <FormModal @save="save" :is-ready="isReady" :errors="errors">
    <el-form label-position="top">
      <el-form-item-with-error label="Название" name="name">
        <el-input v-model="formData.name" />
      </el-form-item-with-error>
      <el-form-item-with-error label="Фото" name="picture">
        <InputFile v-model="formData.picture" />
      </el-form-item-with-error>
    </el-form>
  </FormModal>
</template>
