/**
 * 基础组件模板
 */
import type { FC } from 'react'
import { useEffect } from 'react'
import { useStore } from 'react-redux'

export interface IndexProps {
}

const Index: FC<IndexProps> = (_) => {
    const store = useStore()
    useEffect(() => {
        console.log(store)
        // 初始化
        return () => {
            // 销毁
        }
    }, [])
    return <div className="index-box"> index work! </div>
}

export default Index
