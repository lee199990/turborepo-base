import { defaultConfig } from './config'
import type { BaseRest } from './REST'
import { useEnv } from '@jmrepo/runtime'
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
    ResponseType,
} from 'axios'
import axios, { CanceledError } from 'axios'
import { intersection, split } from 'lodash-es'

const env = useEnv()

class AxiosHttpClient {
    handleResponseMiddleware?: (response: AxiosResponse) => AxiosResponse

    protected axiosClient: AxiosInstance

    protected cancelSourceMap = new Map<string, CancelTokenSource>()

    constructor(config?: CreateAxiosDefaults) {
        this.axiosClient = axios.create({ ...defaultConfig, ...config })
        this.axiosClient.interceptors.request.use(this.handleRequest.bind(this))
        this.axiosClient.interceptors.response.use(this.handleResponse.bind(this), (error) => {
            // 关闭进度条动画
            if (error instanceof CanceledError)
                return Promise.reject(new Error(`取消请求：${error.message}`))

            // 所有的响应异常 区分来源为取消请求/非取消请求
            return Promise.reject(error)
        })
    }

    /**
     * 基础的请求函数封装
     */
    async require<T>(config: AxiosRequestConfig): Promise<T> {
        const source = axios.CancelToken.source()
        this.cancelSourceMap.set(config.url as string, source)
        const res = await this.axiosClient
            .request<T>({ ...config, cancelToken: source.token })
        return res.data
    }

    /**
     * 每次请求时的处理
     * @param config
     */
    private handleRequest(config: InternalAxiosRequestConfig) {
        // const { token } = usersSelector();
        // if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        // config.headers.Authorization = token;
        // }

        if (this.cancelSourceMap.size > 20)
            console.error(`同时存在cancelSource数量过多：${this.cancelSourceMap.size}! 请检查是否正确销毁`)

        if (/^(http|https):\/\//.test(config.url as string))
            return config

        if (intersection(split(
            config.url,
            '/',
            2,
        ), (env.VITE_BASE_SERVICE_FILTER as unknown as string).split(',')).length === 0) {
            // 判断开头是否是需要被过滤掉的接口，否则将会被添加VITE_BASE_SERVICE
            config.url = env.VITE_BASE_SERVICE + config.url
        }

        return config
    }

    /**
     * 处理返回数据
     * @param response
     * @private
     */
    private handleResponse(response: AxiosResponse) {
        // eslint-disable-next-line ts/no-unsafe-member-access
        const responseType = response.request.responseType as ResponseType
        // 二进制数据则直接返回
        if (responseType === 'blob' || responseType === 'arraybuffer')
            return response

        this.cancelSourceMap.delete(response.config.url as string)

        const { status } = response

        if (this.handleResponseMiddleware)
            return this.handleResponseMiddleware(response)

        // 如果状态码不成功，response此时包含错误信息，直接返回
        if (status !== 200)
            console.error(`请求失败：${status}, ${response.config.url}`)

        return response
    }
}

export class HttpClient extends AxiosHttpClient {
    /**
     +     * 通过提供的参数和配置，从指定的实例中获取结果。
     +     *
     +     * @param {T extends BaseRest} instanceOrUrl - 要获取结果的实例。
     +     * @param {T['params']} params - 要包含在请求中的参数， 通过实例的params自动获取。
     +     * @param {AxiosRequestConfig} config - 请求的配置选项。
     +     * @returns {Promise<T['result']>} - 一个Promise，解析为请求的结果， 通过实例的result自动获取。
     +
     */
    get<T extends BaseRest>(instanceOrUrl: T, params?: T['params'], config?: AxiosRequestConfig): Promise<Exclude<T['result'], undefined>>
    /**
     +     * 通过GET请求从指定的URL获取数据。
     +     *
     +     * @param {string} instanceOrUrl - 要获取数据的URL。
     +     * @param {P} params - 可选参数，包含在请求中,通过泛型P来手动指定。
     +     * @param {AxiosRequestConfig} config - 可选的请求配置。
     +     * @returns {Promise<T>} - 一个Promise，解析为获取的数据，通过泛型T来手动指定。
     +
     */
    get<T, P>(instanceOrUrl: string, params?: P, config?: AxiosRequestConfig): Promise<T>
    get(
        instanceOrUrl: BaseRest | string,
        params?: unknown,
        config?: AxiosRequestConfig,
    ) {
        return this.require({
            params,
            url: typeof instanceOrUrl === 'string' ? instanceOrUrl : instanceOrUrl.url,
            ...config,
        })
    }

    post<T extends BaseRest>(
        instanceOrUrl: T,
        data?: T['params'],
        config?: AxiosRequestConfig
    ): Promise<Exclude<T['result'], undefined>>

    post<T extends NonNullable<object>, P>(
        instanceOrUrl: string,
        data?: P,
        config?: AxiosRequestConfig
    ): Promise<T>

    post(
        instanceOrUrl: BaseRest | string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) {
        return this.require({
            data,
            method: 'POST',
            url: typeof instanceOrUrl !== 'string' ? instanceOrUrl?.url : instanceOrUrl,
            ...config,
        })
    }

    delete<T extends BaseRest>(instanceOrUrl: T, params?: T['params'], config?: AxiosRequestConfig): Promise<Exclude<T['result'], undefined>>
    delete<T extends NonNullable<object>, P>(instanceOrUrl: string, params?: P, config?: AxiosRequestConfig): Promise<T>
    delete(
        instanceOrUrl: BaseRest | string,
        params?: unknown,
        config?: AxiosRequestConfig,
    ) {
        return this.require({
            method: 'DELETE',
            params,
            url: typeof instanceOrUrl === 'string' ? instanceOrUrl : instanceOrUrl.url,
            ...config,
        })
    }

    put<T extends BaseRest>(instanceOrUrl: T, data?: T['params'], config?: AxiosRequestConfig): Promise<Exclude<T['result'], undefined>>
    put<T extends NonNullable<object>, P>(instanceOrUrl: string, data?: P, config?: AxiosRequestConfig): Promise<T>
    put(
        instanceOrUrl: BaseRest | string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) {
        return this.require({
            data,
            method: 'PUT',
            url: typeof instanceOrUrl === 'string' ? instanceOrUrl : instanceOrUrl.url,
            ...config,
        })
    }

    /**
     + * 取消指定的请求。
     + *
     + * @param {string} url - 要取消的请求的URL。
     + * @param {string} [msg] - 取消请求时可选的消息。
     +
     */
    cancel(url: string, msg?: string) {
        this.cancelSourceMap.get(url)?.cancel(msg)
        this.cancelSourceMap.delete(url)
    }

    /**
     *
     * @param url
     * @param params
     * @param config
     */
    getFile(
        url: string,
        params?: object,
        config?: AxiosRequestConfig,
    ) {
        return this.axiosClient.request({
            params,
            url,
            ...config,
            responseType: 'blob',
        })
    }
}

export const axiosHttpClient = new HttpClient()
