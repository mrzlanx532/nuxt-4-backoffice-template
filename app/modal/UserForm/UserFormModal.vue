<script setup lang="ts">
import FormModal from '~/modal/FormModal.vue'
import Tabs from "~/components/Tabs.vue";
import { useForm } from '~/composables/useForm'
import InfoTabModal from '@/modal/UserForm/_tabs/InfoTabModal.vue'
import CompanyTabModal from '@/modal/UserForm/_tabs/CompanyTabModal.vue'
import SubscriptionTabModal from '@/modal/UserForm/_tabs/SubscriptionTabModal.vue'
import dayjs from "dayjs";

interface BlogPostFormResponse {
  entity: {[key: string]: any},
  locales: [],
  company_business_types: [],
  company_countries: [],
  subscription_types: [],
  labels: []
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

const {
  initForm
} = useForm()

const formData = ref<{[key: string]: any}>({
  is_checked: props.id ? undefined : true,
  is_remove: true,
})

const {
  save,
  isReady,
  errors
} = initForm(
    [
      'first_name',
      'last_name',
      'email',
      'phone',
      'description',
      'picture',
      'company_name',
      'company_address',
      'company_index',
      'company_country_id',
      'company_city',
      'is_agree',
      'description',
      'picture',
      'password',
      'password_confirmation',
      'subscription_till',
      'subscription_till_for_exclusive_tracks',
      'subscription_type_id',
      'company_url',
      'job_title',
      'about',
      'company_business_type_id',
      'locale_id',
      'is_checked',
      'content',
    ],
    formData,
    'users/create',
    'users/update',
    emit,
    props.id,
)

const {
  tabs,
  selectedTabComponent,
  selectedTab
} = initTabs([
  {
    title: 'Инфо',
    component: InfoTabModal,
    formDataKeys: new Set(['first_name', 'last_name', 'email', 'phone', 'password', 'password_confirmation', 'locale_id', 'about', 'picture', 'is_checked']),
    hasError: false
  },
  {
    title: 'Компания',
    component: CompanyTabModal,
    formDataKeys: new Set(['company_address', 'company_business_type_id', 'company_city', 'company_country_id', 'company_index', 'company_name', 'company_url', 'job_title']),
    hasError: false
  },
  {
    title: 'Подписка',
    component: SubscriptionTabModal,
    formDataKeys: new Set(['is_remove', 'subscription_type_id', 'subscription_till_for_exclusive_tracks']),
    hasError: false
  }
], errors)

onMounted(async () => {
  const response = await $authFetch<BlogPostFormResponse>('users/form', {
    query: { id: props.id }
  })

  if (props.id) {
    formData.value = response.entity

    if (response.entity.subscription_till_for_exclusive_tracks) {
      formData.value.is_remove = false
      formData.value.subscription_till_for_exclusive_tracks = dayjs.utc(response.entity.subscription_till_for_exclusive_tracks, 'DD.MM.YYYY HH:mm:ss').tz(dayjs.tz.guess()).format('DD.MM.YYYY HH:mm:ss')
    }

    if (response.entity.subscription_till) {
      formData.value.subscription_till = dayjs.utc(response.entity.subscription_till, 'DD.MM.YYYY HH:mm:ss').tz(dayjs.tz.guess()).format('DD.MM.YYYY HH:mm:ss')
    }
  }

  formDataValues.value.locales = response.locales
  formDataValues.value.company_business_types = response.company_business_types
  formDataValues.value.company_countries = response.company_countries
  formDataValues.value.subscription_types = response.subscription_types
  formDataValues.value.labels = response.labels

  isReady.value = true
})

const beforeRequest = (formData: {[key: string]: any}) => {
  if (formData.subscription_till) {
    formData.subscription_till = dayjs(formData.subscription_till, 'DD.MM.YYYY HH:mm:ss').tz(dayjs.tz.guess()).utc().format('DD.MM.YYYY HH:mm:ss')
  }

  if (formData.subscription_till_for_exclusive_tracks) {
    formData.subscription_till_for_exclusive_tracks = dayjs(formData.subscription_till_for_exclusive_tracks, 'DD.MM.YYYY HH:mm:ss').tz(dayjs.tz.guess()).utc().format('DD.MM.YYYY HH:mm:ss')
  }

  return formData
}
</script>

<template>
  <FormModal class="--fixed-top" @save="save({beforeRequest})" :is-ready="isReady" :errors="errors">
    <template #header>
      <Tabs v-model="selectedTab" :tabs="tabs" />
    </template>
    <template #default>
      <el-form label-position="top">
        <component
            :is="selectedTabComponent"
            :formData="formData"
            :formDataValues="formDataValues"
        />
      </el-form>
    </template>
  </FormModal>
</template>
