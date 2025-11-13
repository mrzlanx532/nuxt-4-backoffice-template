<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>()

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]
</script>

<template>
  <div class="browser__filters" v-if="!props.isLoading">
    <el-select
        v-model="value"
        filterable
        placeholder="Select"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </div>
</template>