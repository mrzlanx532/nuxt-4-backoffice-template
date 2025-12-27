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
    component: InfoTabModal,
    hasError: false
  },
  {
    title: 'Компания',
    component: CompanyTabModal,
    hasError: false
  },
  {
    title: 'Подписка',
    component: SubscriptionTabModal,
    hasError: false
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

const infoTabFields = new Set(['first_name', 'last_name', 'email', 'phone', 'password', 'password_confirmation', 'locale_id', 'about', 'picture', 'is_checked'])
const companyTabFields = new Set(['company_address', 'company_business_type_id', 'company_city', 'company_country_id', 'company_index', 'company_name', 'company_url', 'job_title'])
const subscriptionTabFields = new Set(['is_remove', 'subscription_type_id', 'subscription_till_for_exclusive_tracks'])

watch(errors, (v) => {
  tabs.value.map(tab => {
    tab.hasError = false
    return tab
  })

  for (let key in v) {
    if (infoTabFields.has(key)) {
      tabs.value[0]!.hasError = true
      continue
    }

    if (companyTabFields.has(key)) {
      tabs.value[1]!.hasError = true
      continue
    }

    if (subscriptionTabFields.has(key)) {
      tabs.value[2]!.hasError = true
    }
  }
})

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
