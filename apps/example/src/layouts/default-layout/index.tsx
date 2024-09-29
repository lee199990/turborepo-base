/**
 * 基础组件模板
 */
import './layout.scss'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

export interface layoutProps {
}

const Layout: FC<layoutProps> = () => {
    return (
        <div className="layout-box">
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
