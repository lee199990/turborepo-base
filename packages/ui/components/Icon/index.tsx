import React, { FC } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import lessVariable from '../../style/variable.module.less';
import { GetFuncPropsType } from '../../constants/interface';

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2468423_wsi5fc0i36c.js' // 在 iconfont.cn 上生成
});

type IIconProps = GetFuncPropsType<typeof MyIcon>;

interface IProps extends IIconProps {
    /** true 选中 false 未选中 */
    select?: boolean;
}

const selectStyle = { color: lessVariable['theme-color-header-nav'] };
const noSelectStyle = { color: '#666' };

const Icon: FC<IProps> = props => {
    const { select = false, ...iconProps } = props;
    return <MyIcon style={select ? selectStyle : noSelectStyle} {...iconProps} />;
};

export default Icon;
