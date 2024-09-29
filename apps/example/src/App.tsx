import routes from '@/router'
import { appStore } from '@/store'
import { App as AntApp, ConfigProvider } from 'antd'
import type { FC } from 'react'
import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

const App: FC = () => {
    return (
        <Provider store={appStore}>
            <ConfigProvider>
                <AntApp>
                    <RouterProvider router={routes} />
                </AntApp>
            </ConfigProvider>
        </Provider>
    )
}

export default App
