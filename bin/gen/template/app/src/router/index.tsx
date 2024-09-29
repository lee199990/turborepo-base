import DefaultLayout from '@/layouts/default-layout'
import mainRoutes from '@/router/routes-module/mainRoutes'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
// createBrowserRouter, createHashRouter -> 创建路由实例，在方法中自定义路由 path 和组件的对应关系
// RouterProvider -> 作为一个组件渲染，并传入 createBrowserRouter 执行后生成的 router 实例

const baseRoutes: RouteObject[] = [{
    children: mainRoutes,
    element: <DefaultLayout />,
    path: '/',
}]

const routes = createBrowserRouter(baseRoutes)
export default routes
