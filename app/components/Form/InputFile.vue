<script setup lang="ts">
import { nextTick, type Ref, ref, watch } from 'vue'
import { Delete as IconDelete } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const mimeTypeToExtensionMapper = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

type AllowedImageType = 'image/jpeg' | 'image/png' | 'image/webp'

const isAllowedImage = (file: File): boolean => {
  return props.allowedTypes.includes(file.type as AllowedImageType)
}

const props = withDefaults(defineProps<{
  modelValue?: {
    original: string
  },
  errors?: string[],
  maxSizeMb?: number|null,
  allowedTypes?: AllowedImageType[]
}>(), {
  maxSizeMb: null,
  allowedTypes: () => ['image/jpeg', 'image/png'],
})

const imageEl: Ref<HTMLImageElement|null> = ref(null)

const tryToLoadImage = (link: string) => {
  const img = new Image()
  img.onerror = () => {
    isUnrecognisedFile.value = true
  }
  img.onload = () => {
    imageEl.value!.src = link
  }
  img.src = link
}

const setLocalValues = (value: any) => {
  if (value === null || value === undefined || value instanceof File) {
    return
  }

  tryToLoadImage(value.original)
}

watch(
    () => props.modelValue,
    (value) => {
      setLocalValues(value)
    }
)

setLocalValues(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const files: Ref<File[]> = ref([])

const isUnrecognisedFile: Ref<boolean|null> = ref(false)

const isImageFile = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {

    if (isAllowedImage(file)) {
      resolve(true)
    }

    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(true)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }

    img.src = url
  })
}

const handleUploadedFiles = (uploadFiles: FileList) => {
  isUnrecognisedFile.value = false

  Array.from(uploadFiles).map(async (file) => {

    const isImage = await isImageFile(file)

    if (!isImage) {
      ElNotification({
        message: 'Загруженный файл не является изображением',
        type: 'error',
        duration: 5000
      })
      return
    }

    if (props.maxSizeMb !== null && props.maxSizeMb < (file.size / (1024 ** 2))) {
      ElNotification({
        message: `Размер файла превышает ${props.maxSizeMb?.toString()}MB`,
        type: 'error',
        duration: 5000
      })

      return
    }

    files.value.push(file)

    nextTick(() => {

      const blobLink = URL.createObjectURL(file)

      tryToLoadImage(blobLink)

      emit('update:modelValue', files.value[0])
    })
  })
}

const onChange = (e: Event) => {
  handleUploadedFiles((e.target as HTMLInputElement).files!)
}

const onDrop = (e: DragEvent) => {
  handleUploadedFiles(e.dataTransfer!.files)
}

const onRemove = () => {
  files.value.splice(0, files.value.length)
  isUnrecognisedFile.value = false

  emit('update:modelValue', null)
}

const onClick = () => {
  const inputFile = document.createElement('input')

  inputFile.addEventListener('change', onChange)

  inputFile.type = 'file'
  inputFile.click()
  inputFile.remove()
}
</script>

<template>
  <div class="input-file" :class="{'--empty': files.length === 0 && modelValue?.original === undefined, '--has-errors': errors && errors[0]}">
    <template v-if="files.length > 0 || modelValue?.original !== undefined">
      <div class="input-file__image-wrapper" v-if="files.length > 0 || modelValue?.original !== undefined" @click="onRemove">
        <template v-if="isUnrecognisedFile">
          <el-icon :size="30" :class="{'--has-errors': errors && errors[0] }">
            <IconDelete />
          </el-icon>
          <p class="input-file__image-label">Загруженный файл</p>
        </template>
        <img v-else ref="imageEl" src="#" alt="image">
        <div class="input-file__image-overlay"/>
        <div class="input-file__cross-wrapper">
          <el-icon :size="30">
            <IconDelete />
          </el-icon>
        </div>
      </div>
    </template>
    <div class="input-file__input"
         @keydown.enter.prevent="onClick"
         tabindex="0"
         v-else
         @click="onClick"
         @drop.prevent="onDrop"
         @dragover.prevent
    >
      <p class="input-file__label input-file__label_choose">Перетащите файл сюда</p>
      <p class="input-file__label input-file__label_or">или</p>
      <p class="input-file__label input-file__label_download">Выберите с устройства</p>
      <p class="input-file__label input-file__label_allow-formats">
        Разрешенные форматы:
        <template v-if="props.allowedTypes">
          <code v-for="(allowedType, index) in props.allowedTypes">{{ mimeTypeToExtensionMapper[allowedType] }}{{ index !== props.allowedTypes.length - 1 ? ', ' : ''}}</code>
        </template>
        <template v-else>
          <span>все</span>
        </template>
      </p>
      <p class="input-file__label input-file__label_max-size">Максимальный размер: <span>{{ props.maxSizeMb ? props.maxSizeMb + 'MB' : 'не ограничен' }}</span></p>
    </div>
  </div>
  <div class="input__error">{{ errors && errors[0] ? errors[0] : null }}</div>
</template>
