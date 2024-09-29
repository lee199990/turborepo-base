import { defaultConfig } from '../../custom-build/default-config'
import type { ConfigEnv, UserConfig } from 'vite'

export default ({ mode }: ConfigEnv): UserConfig => {
    return { ...defaultConfig(mode, __dirname) }
}
