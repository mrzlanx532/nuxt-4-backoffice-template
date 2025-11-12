<script setup lang="ts">
import { ElNotification } from 'element-plus'

definePageMeta({
  middleware: ['guest'],
  layout: false
})

const errors: Ref<Record<string, any>> = ref({})

const { $auth } = useNuxtApp()

const isSending = ref(false)

const formData = ref({
  email: 'denis_danilov_97@mail.ru',
  password: '4aWvh75t'
})

async function onClick() {

  errors.value = {}
  isSending.value = true

  await $auth().login(formData.value).catch((err) => {

    if (err.status === undefined) {
      ElNotification({
        title: 'Ошибка сервера',
        message: 'Сервер недоступен',
        type: 'error',
        duration: 2000
      })
      return
    }

    errors.value = err.data.errors

  }).finally(() => {
    isSending.value = false
  })
}
</script>

<template>
  <div class="login">
    <el-form label-position="top">
      <div class="login__logo">
        <img src="/img/logo.png" alt="logo" style="height: 20px; width: 20px;">
        <div>Digital Dyatel</div>
      </div>
      <div class="login__action">Авторизация</div>
      <el-form-item label="Логин" :error="errors.email?.[0]">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="Пароль" :error="errors.password?.[0]">
        <el-input v-model="formData.password" type="password"/>
      </el-form-item>
      <el-button
          size="large"
          :disabled="isSending"
          type="primary"
          :loading="isSending"
          @click.prevent="onClick"
          native-type="submit"
      >
        Войти
      </el-button>
    </el-form>
  </div>
</template>