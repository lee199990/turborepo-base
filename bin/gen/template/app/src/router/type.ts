export interface RouteMeta {
    icon?: string
    title?: string
    index?: number
}

export interface RouteObject {
    path: string
    name: string
    element: React.ReactNode
    children?: RouteObject[]
    meta?: RouteMeta
}
