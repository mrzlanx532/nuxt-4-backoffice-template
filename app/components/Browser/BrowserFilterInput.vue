<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { IFilter } from '@@/types/components/browser'

type IValueSingle = string | number
type IValueRange = [ string | number, string | number ]

type IValue = IValueSingle | IValueRange

const props = withDefaults(defineProps<{
  filter: IFilter,
  value?: IValue
}>(), {
  value: undefined
})

const emit = defineEmits<{
  'update:value': [value: any[]|undefined]
}>()

const value = ref<IValue | undefined>(undefined)

watch(() => props.value, (v) => {
  if (props.filter.config.range && v === undefined) {
    value.value = ["", ""]
    return
  }

  value.value = v
}, {
  immediate: true
})

const onInputRange = (index: number, val: IValueSingle) => {
  (value.value as IValueRange)[index] = val
}

const onChangeRange = () => {
  if ((value.value as IValueRange)[0] === '' && (value.value as IValueRange)[1] === '') {
    emit('update:value', undefined)
    return

  }

  emit('update:value', value.value as any)
}
</script>

<template>
  <div v-if="props.filter.config.range">
    <el-input
        :model-value="Array.isArray(value) ? value[0] : undefined"
        @update:model-value="(val: any) => onInputRange(0, val)"
        @change="onChangeRange"
        placeholder="От"
        clearable
    />
    <el-input
        :model-value="Array.isArray(value) ? value[1] : undefined"
        @update:model-value="(val: any) => onInputRange(1, val)"
        @change="onChangeRange"
        placeholder="До"
        clearable
    />
  </div>
  <el-input
      v-else
      :model-value="value as (IValueSingle | undefined)"
      @update:model-value="(val: any) => emit('update:value', val)"
      clearable
  />
</template>