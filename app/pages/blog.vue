<script setup lang="ts">
import Browser from '@/components/Browser.vue'

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <Browser />
</template>