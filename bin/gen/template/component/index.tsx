/**
 * 基础组件模板
 */
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import './index.scss'

export interface $NameProps {
}

const $Name: FC<$NameProps> = () => {
    const [value, setValue] = useState(0)
    useEffect(() => {
        // 初始化
        return () => {
            // 销毁
        }
    }, [])
    return <div className="$name$k-box"> $name work! </div>
}

export default $Name
