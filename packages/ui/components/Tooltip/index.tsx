import React, { FC } from 'react';
import classnames from 'classnames';
import { Tooltip as ATooltip } from 'antd';
import lessVariable from '../../style/variable.module.less';
import { GetFuncPropsType } from '../../constants/interface';

type IProps = GetFuncPropsType<typeof ATooltip>;

const DEFAULT = {
    COLOR: lessVariable['theme-color-button']
};

const Tooltip: FC<IProps> = props => {
    const { className, overlayClassName, color = DEFAULT.COLOR, ...tooltipProps } = props;

    return (
        <ATooltip
            color={color}
            className={classnames(['l-tooltip', className])}
            overlayClassName={classnames(['f12', overlayClassName])}
            {...tooltipProps}
        >
            {props.children}
        </ATooltip>
    );
};

export default Tooltip;
