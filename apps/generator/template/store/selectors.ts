/**
 * 本页面定义的选择器用于快速从模块中选择所需要的数据
 * 需要注意的是，为了性能考虑有时这些选择器是有记忆性的
 */

import type { $NameState } from './define'
import { NAMESPACE_$NAME } from './define'
import type { Store } from '@reduxjs/toolkit'

export function $nameSelector<S extends Store>(state: S) {
    return state.getState()[NAMESPACE_$NAME] as $NameState
}
