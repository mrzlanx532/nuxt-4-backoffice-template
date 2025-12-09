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

const unconfirmedValue = ref<(number|string|null)[]|undefined>(undefined)
const confirmedValue = ref<(number|string|null)[]|undefined>(undefined)

watch(() => props.value, (v) => {

  if (v === undefined) {
    if (props.filter.config.range) {
      unconfirmedValue.value = ["", ""]
      confirmedValue.value = ["", ""]
      return
    }

    unconfirmedValue.value = [""]
    confirmedValue.value = [""]
    return
  }

  unconfirmedValue.value = Array.isArray(v) ? [...v] : v
  confirmedValue.value = Array.isArray(v) ? [...v] : v
}, {
  immediate: true,
  deep: true
})

const updateModelValueSingle = (val: any) => {
  unconfirmedValue.value = val
}

const updateModelValueRange = (index: number, val: IValueRaw) => {
  unconfirmedValue.value![index] = val
}

const changeSingle = () => {
  confirmedValue.value = unconfirmedValue.value

  if (confirmedValue.value === null) {
    emit('update:value', undefined)
    return
  }

  emit('update:value', confirmedValue.value)
}

const changeRange = () => {
  confirmedValue.value = unconfirmedValue.value

  if (confirmedValue.value === null) {
    emit('update:value', undefined)
    return
  }

  emit('update:value', confirmedValue.value)
}
</script>

<template>
  <template v-if="props.filter.config.range">
    <ElDatePicker
        :model-value="Array.isArray(unconfirmedValue) ? unconfirmedValue[0] : unconfirmedValue"
        type="datetime"
        placeholder="От"
        @change="changeRange"
        @update:model-value="(v: any) => updateModelValueRange(0, v)"
        format="DD.MM.YYYY HH:mm:ss"
        value-format="X"
        clearable
    />
    <ElDatePicker
        :model-value="Array.isArray(unconfirmedValue) ? unconfirmedValue[1] : unconfirmedValue"
        type="datetime"
        placeholder="До"
        @change="changeRange"
        @update:model-value="(v: any) => updateModelValueRange(1, v)"
        format="DD.MM.YYYY HH:mm:ss"
        value-format="X"
        clearable
    />
  </template>
  <ElDatePicker
      v-else
      :model-value="Array.isArray(unconfirmedValue) ? unconfirmedValue[0] : unconfirmedValue"
      type="datetime"
      placeholder="Выберите дату"
      @change="changeSingle"
      @update:model-value="updateModelValueSingle"
      format="DD.MM.YYYY HH:mm:ss"
      value-format="X"
      clearable
  />
</template>
