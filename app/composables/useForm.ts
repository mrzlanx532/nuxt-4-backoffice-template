import { cloneDeep } from 'lodash-es'
import { FetchError } from 'ofetch'
import dayjs from 'dayjs'
import { ElNotification } from 'element-plus'
import { type Ref } from 'vue'

type IItem = {[key: string]: any}

export const useForm = () => {
    const isReady = ref(false)
    const errors = ref<{[key: string]: string[]}>({})

    const { $authFetch } = useNuxtApp()

    const isFetchError = (instance: any): instance is FetchError => {
        return instance.name === 'FetchError'
    }

    const formRequestBody = (formDataValues: IItem, id: number | undefined = undefined): IItem | FormData => {

        const _formDataValues = cloneDeep(formDataValues)

        let isRequiredFormData = false

        Object.values(_formDataValues).map((value) => {
            if (value instanceof File) {
                isRequiredFormData = true
            }
        });

        if (isRequiredFormData) {
            const formData = new FormData

            Object.entries(_formDataValues).map(([key, value]) => {

                if (value === undefined) {
                    return
                }

                if (typeof value === 'boolean') {
                    value = value ? 1 : 0
                }

                if (value instanceof Array) {
                    value.forEach(item => {
                        formData.append(`${key}[]`, item)
                    })

                    return
                }

                if (value === null) {
                    value = '__null__'
                }

                formData.append(key, value)
            })

            if (id !== undefined) {
                formData.append('id', id.toString())
            }

            return formData
        }

        Object.entries(_formDataValues).map(([key, value]) => {

            if (value instanceof Array) {
                return
            }

            if (value instanceof Object) {
                _formDataValues[key] = undefined
            }
        })

        if (id !== undefined) {
            _formDataValues.id = id
        }

        return _formDataValues
    }

    const initForm = (
        formData: Ref<{[key: string]: any}>,
        createURL: string,
        updateURL: string,
        emit: ReturnType<typeof defineEmits>,
        id?: number
    ) => {

        const save = async () => {

            try {

                const request = cloneDeep(formData.value)

                if (request.date) {
                    request.date = dayjs(request.date, 'DD.MM.YYYY HH:mm:ss').tz(dayjs.tz.guess()).utc().format('DD.MM.YYYY HH:mm:ss')
                }

                await $authFetch(id ? updateURL : createURL, {
                    body: formRequestBody(request, id),
                    method: 'post'
                })

                ElNotification({
                    title: 'Успех',
                    type: 'success',
                    duration: 3000
                })

                emit('close')

            } catch (e) {
                if (!isFetchError(e)) {
                    throw e;
                    return
                }

                if (e.status === 422) {
                    ElNotification({
                        title: 'Ошибки валидации',
                        message: 'Исправьте ошибки в форме',
                        type: 'error',
                        duration: 3000
                    })

                    errors.value = e.data.errors
                }
            }
        }

        return {
            save,
            isReady,
            errors,
        }
    }

    return {
        initForm,
        formRequestBody
    }
}