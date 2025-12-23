import { cloneDeep } from 'lodash-es'
import { FetchError } from 'ofetch'

type IItem = {[key: string]: any}

export const useForm = () => {
    const errors = ref<{[key: string]: string[]}>({})

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

    return {
        errors,
        isFetchError,
        formRequestBody
    }
}