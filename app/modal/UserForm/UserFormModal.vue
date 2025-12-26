<script setup lang="ts">
import FormModal from '~/modal/FormModal.vue'
import Tabs from "~/components/Tabs.vue";
import { useForm } from '~/composables/useForm'
import InfoTabModal from '@/modal/UserForm/_tabs/InfoTabModal.vue'
import CompanyTabModal from '@/modal/UserForm/_tabs/CompanyTabModal.vue'
import SubscriptionTabModal from '@/modal/UserForm/_tabs/SubscriptionTabModal.vue'

interface BlogPostFormResponse {
  entity: {[key: string]: any},
  locales: [],
  company_business_types: [],
  company_countries: [],
  subscription_types: []
}

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const formDataValues = ref<{[key: string]: []}>({})

const { $authFetch } = useNuxtApp()

const { initTabs } = useTabs()

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
  is_checked: props.id ? undefined : true
})

const {
  initForm
} = useForm()

const {
  tabs,
  selectedTabComponent,
  onChangeSelectedTab
} = initTabs([
  {
    title: 'Инфо',
    component: InfoTabModal
  },
  {
    title: 'Компания',
    component: CompanyTabModal
  },
  {
    title: 'Подписка',
    component: SubscriptionTabModal
  }
])

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

  formDataValues.value.locales = response.locales
  formDataValues.value.company_business_types = response.company_business_types
  formDataValues.value.company_countries = response.company_countries
  formDataValues.value.subscription_types = response.subscription_types

  isReady.value = true
})
</script>

<template>
  <FormModal @save="save" :is-ready="isReady">
    <template #header>
      <Tabs @change="onChangeSelectedTab" :tabs="tabs" />
    </template>
    <template #default>
      <el-form label-position="top">
        <component
            :is="selectedTabComponent"
            :formData="formData"
            :formDataValues="formDataValues"
            :errors="errors"
        />
      </el-form>
    </template>
  </FormModal>
</template>
