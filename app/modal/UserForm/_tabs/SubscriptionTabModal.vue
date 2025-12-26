<script setup lang="ts">
import ElFormItemWithError from "~/components/Form/ElFormItemWithError.vue";

const props = defineProps<{
  formData: {[key: string]: any},
  errors: {[key: string]: string[]},
  formDataValues: {
    subscription_types: {
      id: string,
      title: string,
    }[]
  },
}>()
</script>

<template>
  <el-space>
    <el-form-item-with-error label="Тип подписки" name="subscription_type_id" :errors="errors">
      <el-select v-model="props.formData.subscription_type_id">
        <el-option
            v-for="locale in props.formDataValues.subscription_types"
            :key="locale.id"
            :label="locale.title"
            :value="locale.id"
        />
      </el-select>
    </el-form-item-with-error>
    <el-form-item-with-error label="Дата истечения" name="subscription_till" :errors="errors">
      <el-date-picker v-model="props.formData.subscription_till" />
    </el-form-item-with-error>
  </el-space>
  <el-form-item-with-error label="Дата истечения" name="subscription_till_for_exclusive_tracks" :errors="errors">
    <el-date-picker v-model="props.formData.subscription_till_for_exclusive_tracks" />
  </el-form-item-with-error>
  <el-form-item-with-error label="" name="is_remove" :errors="errors">
    <el-checkbox v-model="props.formData.is_remove" label="Отключить подписку на эксклюзивные треки" />
  </el-form-item-with-error>
</template>