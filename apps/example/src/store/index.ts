import { pubSingleStore } from '@jmrepo/store'

export const appStore = pubSingleStore

/**
 * 用于标记组件内的props类型，store在全局存在，如果需要请继承此接口
 * 更推荐使用hook函数 useStore()来获取store
 */
export interface StoreProps {
    store: typeof appStore
}
