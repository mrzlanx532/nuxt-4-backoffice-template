<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { IFilter } from '@@/types/components/browser'
import { CircleClose as IconCircleClose } from '@element-plus/icons-vue'

type IValueSingle = string | number
type IValueRange = [IValueSingle, IValueSingle]

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

const unconfirmedValue = ref<IValue | undefined>(undefined)
const confirmedValue = ref<IValue | undefined>(undefined)

watch(() => props.value, (v) => {

  if (props.filter.config.range && v === undefined) {
    unconfirmedValue.value = ["", ""]
    confirmedValue.value = ["", ""]
    return
  }

  unconfirmedValue.value = Array.isArray(v) ? [...v] : v
  confirmedValue.value = Array.isArray(v) ? [...v] : v
}, {
  immediate: true,
  deep: true
})

const onInputRange = (index: number, v: IValueSingle) => {
  (unconfirmedValue.value as IValueRange)[index] = v
}

const onInputSingle = (v: IValueSingle) => {
  (unconfirmedValue.value as IValueSingle) = v
}

const onChangeRange = () => {

  confirmedValue.value = [...(unconfirmedValue.value as IValueRange)]

  if ((confirmedValue.value as IValueRange)[0] === '' && (confirmedValue.value as IValueRange)[1] === '') {
    emit('update:value', undefined)
    return

  }

  emit('update:value', confirmedValue.value as any)
}

const onChangeSingle = () => {
  confirmedValue.value = unconfirmedValue.value
  emit('update:value', confirmedValue.value as any)
}

const clearInputRange = (index: number) => {
  (unconfirmedValue.value as IValueRange)[index] = ''
  onChangeRange()
}

const clearInputSingle = () => {
  (unconfirmedValue.value as IValueSingle) = ''
  onChangeSingle()
}
</script>

<template>
  <div v-if="props.filter.config.range">
    <el-input
        class="browser__input-filter"
        :model-value="Array.isArray(unconfirmedValue) ? unconfirmedValue[0] : undefined"
        @update:model-value="(val: any) => onInputRange(0, val)"
        @change="onChangeRange"
        placeholder="От"
    >
      <template #suffix>
        <el-icon v-if="Array.isArray(confirmedValue) && confirmedValue[0] !== ''">
          <IconCircleClose @click="clearInputRange(0)" />
        </el-icon>
      </template>
    </el-input>
    <el-input
        class="browser__input-filter"
        :model-value="Array.isArray(unconfirmedValue) ? unconfirmedValue[1] : undefined"
        @update:model-value="(val: any) => onInputRange(1, val)"
        @change="onChangeRange"
        placeholder="До"
    >
      <template #suffix>
        <el-icon v-if="Array.isArray(confirmedValue) && confirmedValue[1] !== ''">
          <IconCircleClose @click="clearInputRange(1)" />
        </el-icon>
      </template>
    </el-input>
  </div>
  <el-input
      v-else
      class="browser__input-filter"
      :model-value="unconfirmedValue as (IValueSingle | undefined)"
      @change="onChangeSingle"
      @update:model-value="(val: any) => onInputSingle(val)"
  >
    <template #suffix>
      <el-icon v-if="confirmedValue && confirmedValue !== ''">
        <IconCircleClose @click="clearInputSingle" />
      </el-icon>
    </template>
  </el-input>
</template>