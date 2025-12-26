<script setup lang="ts">
import ElFormItemWithError from "~/components/Form/ElFormItemWithError.vue";

const props = defineProps<{
  formData: {[key: string]: any},
  errors: {[key: string]: string[]},
  formDataValues: {
    company_business_types: {
      id: string,
      name_ru: string,
      name_en: string
    }[],
    company_countries: {
      id: number,
      name_ru: string,
      name_en: string
    }[]
  },
}>()
</script>

<template>
  <el-space>
    <el-form-item-with-error label="Название компании" name="company_name" :errors="errors">
      <el-input v-model="props.formData.company_name" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Направление работы компании" name="company_business_type_id" :errors="errors">
      <el-select v-model="props.formData.company_business_type_id">
        <el-option
            v-for="locale in props.formDataValues.company_business_types"
            :key="locale.id"
            :label="locale.name_ru"
            :value="locale.id"
        />
      </el-select>
    </el-form-item-with-error>
  </el-space>
  <el-space>
    <el-form-item-with-error label="Должность" name="job_title" :errors="errors">
      <el-input v-model="props.formData.job_title" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Сайт компании" name="company_url" :errors="errors">
      <el-input v-model="props.formData.company_url" />
    </el-form-item-with-error>
  </el-space>
  <el-form-item-with-error label="Адрес" name="company_address" :errors="errors">
    <el-input v-model="props.formData.company_address" />
  </el-form-item-with-error>
  <el-space>
    <el-form-item-with-error label="Индекс" name="company_index" :errors="errors">
      <el-input v-model="props.formData.company_index" />
    </el-form-item-with-error>
    <el-form-item-with-error label="Страна" name="company_country" :errors="errors">
      <el-select v-model="props.formData.company_country_id">
        <el-option
            v-for="country in props.formDataValues.company_countries"
            :key="country.id"
            :label="country.name_ru"
            :value="country.id"
        />
      </el-select>
    </el-form-item-with-error>
    <el-form-item-with-error label="Город" name="company_city" :errors="errors">
      <el-input v-model="props.formData.company_city" />
    </el-form-item-with-error>
  </el-space>
</template>