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
      <template #header>Изображение</template>
      <template #content>
        <img
            v-if="props.item?.cover"
            :src="props.item?.cover.original"
            alt="picture"
        >
        <p v-else>[Не заполнено]</p>
      </template>
    </Section>
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

<style scoped>
img {
  height: 200px;
  border: 1px solid var(--color-2)
}
</style>