<script setup lang="ts">
import type { IFilter } from '@@/types/components/browser'

type IValueRaw = number|string|null
type IValueSingle = [IValueRaw]
type IValueRange = [IValueRaw, IValueRaw]
type IValue = IValueSingle | IValueRange

const props = withDefaults(defineProps<{
  filter: IFilter,
  value?: IValue,
}>(), {
  value: undefined
})

const emit = defineEmits<{
  'update:value': [value: any]
}>()

const value = ref<(number|string|null)[]|undefined>(undefined)

watch(() => props.value, (v) => {
  if (v === undefined) {
    if (props.filter.config.range) {
      value.value = ["", ""]
      return
    }

    value.value = [""]
    return
  }

  value.value = Array.isArray(v) ? [...v] : v
}, {
  immediate: true,
  deep: true
})

const updateModelValueSingle = (val: number) => {
  if (val === null) {
    emit('update:value', undefined)
    return
  }

  emit('update:value', val)
}

const updateModelValueRange = (index: number, val: IValueRaw) => {

  value.value![index] = val

  emit('update:value', value.value)
}
</script>

<template>
  <template v-if="props.filter.config.range">
    <ElDatePicker
        :model-value="Array.isArray(value) ? value[0] : undefined"
        type="date"
        placeholder="От"
        @update:model-value="(v: any) => updateModelValueRange(0, v)"
        format="DD.MM.YYYY"
        value-format="X"
        clearable
    />
    <ElDatePicker
        :model-value="Array.isArray(value) ? value[1] : undefined"
        type="date"
        placeholder="До"
        @update:model-value="(v: any) => updateModelValueRange(1, v)"
        format="DD.MM.YYYY"
        value-format="X"
        clearable
    />
  </template>
  <ElDatePicker
      v-else
      :model-value="Array.isArray(value) ? value[0] : value"
      type="date"
      placeholder="Выберите дату"
      @update:model-value="updateModelValueSingle"
      format="DD.MM.YYYY"
      value-format="X"
      clearable
  />
</template>
