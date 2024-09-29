import type { ViteEnv } from '../../../custom-build/config-define'

export function useEnv() {
    return import.meta.env as ImportMetaEnv & ViteEnv
}
