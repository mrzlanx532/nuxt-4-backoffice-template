<script setup lang="ts">
import SectionGroup from '@/components/SectionGroup.vue'
import Section from '@/components/Section.vue'

interface IBlogPost {
  cover: {
    original: string
  } | null
  content_short: string | null,
  content: string | null
}

const props = defineProps<{
  item?: IBlogPost
}>()
</script>

<template>
  <SectionGroup v-if="props.item">
    <Section>
      <template #header>Краткое содержание</template>
      <template #content>{{ props.item.content_short ?? '[Не заполнено]' }}</template>
    </Section>
    <Section>
      <template #header>Полное содержание</template>
      <template #content><div v-html="props.item.content ?? '[Не заполнено]'" /></template>
    </Section>
  </SectionGroup>
</template>