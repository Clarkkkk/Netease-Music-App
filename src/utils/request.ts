import axios from 'axios'

// 请求中间件
axios.interceptors.request.use((config) => {
    config.url = import.meta.env.VITE_API + config.url
    config.withCredentials = true

    return config
})

// 响应中间件
axios.interceptors.response.use(async (response) => {
    return response.data
})

type RequestArguments<T extends ApiType> = T['params'] extends Record<string, unknown> | FormData
    ? [api: T['api'], params: T['params']]
    : [api: T['api']]

export function get<Type extends ApiGetType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    return axios.get(api, { params })
}

export function post<Type extends ApiPostType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    return axios.post(api, params)
}
