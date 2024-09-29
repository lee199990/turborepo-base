import type { ConfigEnv, UserConfig } from 'vite';
import { defaultConfig } from '../../custom-build/default-config';
// https://vitejs.dev/config/

export default ({ mode }: ConfigEnv): UserConfig => {
    return { ...defaultConfig(mode, __dirname) };
};
