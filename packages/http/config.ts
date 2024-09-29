import type { AxiosRequestConfig } from 'axios'

export const defaultConfig: AxiosRequestConfig = {
    baseURL: '',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 1000 * 30,
}
