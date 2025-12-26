<script setup lang="ts">
import Textarea from "~/components/Form/Textarea.vue";
import ElFormItemWithError from "~/components/Form/ElFormItemWithError.vue";
import InputFile from "~/components/Form/InputFile.vue";

const props = defineProps<{
  formData: {[key: string]: any},
  errors: {[key: string]: string[]},
  formDataValues: {
    locales: {
      id: string,
      title: string
    }[]
  },
}>()
</script>

<template>
  <el-space>
    <el-form-item-with-error label="Имя" name="first_name" :errors="errors">
      <el-input v-model="props.formData.first_name" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Фамилия" name="last_name" :errors="errors">
      <el-input v-model="props.formData.last_name" />
    </el-form-item-with-error>
  </el-space>
  <el-space>
    <el-form-item-with-error label="Email" name="email" :errors="errors">
      <el-input v-model="props.formData.email" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Телефон" name="phone" :errors="errors">
      <el-input v-model="props.formData.phone" v-maska="'+7 (###) ###-##-##'" />
    </el-form-item-with-error>
  </el-space>
  <el-space>
    <el-form-item-with-error label="Пароль" name="password" :errors="errors">
      <el-input type="password" v-model="props.formData.password" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Подтверждение пароля" name="password_confirmation" :errors="errors">
      <el-input type="password" v-model="props.formData.password_confirmation" />
    </el-form-item-with-error>
  </el-space>
  <el-form-item-with-error label="Язык" name="locale_id" :errors="errors">
    <el-select v-model="props.formData.locale_id">
      <el-option
          v-for="locale in props.formDataValues.locales"
          :key="locale.id"
          :label="locale.title"
          :value="locale.id"
      />
    </el-select>
  </el-form-item-with-error>
  <el-form-item-with-error label="О себе" name="about" :errors="errors">
    <Textarea v-model="props.formData.about" />
  </el-form-item-with-error>
  <el-form-item-with-error label="Фотография" name="picture" :errors="errors">
    <InputFile v-model="props.formData.picture" />
  </el-form-item-with-error>
  <el-form-item-with-error label="" name="is_checked" :errors="errors">
    <el-checkbox v-model="props.formData.is_checked" label="Согласен с условиями пользовательского соглашения" size="large" />
  </el-form-item-with-error>
</template>