import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { local } from 'l-browser-storage';
import { Button as AButton, ButtonProps } from 'antd';

import './index.less';

type IButtonProps = ButtonProps & React.RefAttributes<HTMLElement>;

export type IButtonClickType = React.MouseEvent<HTMLElement, MouseEvent> & {
    handleCountDown: () => void;
};

enum DEFAULT {
    MODE = 'theme',
    SIZE = 'middle'
}

interface IProps extends IButtonProps {
    mode?: 'default' | 'theme' | 'disabled';
    size?: 'large' | 'middle' | 'small';
    initTime?: number;
    currentTime?: number;
    onEnd?: () => void;
    onClick?: (e: IButtonClickType) => void;
    onChangeTime?: (time: number) => void;
}

/** 本地倒计时 */
const initCountDown = local.get('countDown').data;

const Button: FC<IProps> = props => {
    const {
        mode = DEFAULT.MODE,
        size = DEFAULT.SIZE,
        block = true,
        className,
        initTime = 0,
        currentTime = 0,
        onEnd,
        onClick,
        onChangeTime,
        ...buttonProps
    } = props;

    /** 当前计数 */
    const [countDown, setCountDown] = useState<number>(initCountDown || currentTime);

    // useMount(() => {
    //     /** 是否存在倒计时 */
    //     if (initTime) {
    //         /** 默认倒计时时间 */
    //         if (initCountDown && initCountDown > 0) {
    //             /** 更改当前计数 */
    //             setCountDown(() => initCountDown);
    //             /** 触发计数监听 */
    //             onChangeTime && onChangeTime(initCountDown);
    //             /** 触发开始倒计时 */
    //             handleCountDown();
    //         }
    //     }
    // });

    /** 开始倒计时 */
    const handleCountDown = () => {
        /** 获取当前倒计时时间 */
        let time = countDown - 1;
        /** 触发计数监听 */
        onChangeTime && onChangeTime(time);
        /** 存储计数 */
        local.set('countDown', time);
        const timer = setInterval(() => {
            /** 当前倒计时时间-1 */
            --time;
            /** 触发计数监听 */
            onChangeTime && onChangeTime(time);
            /** 存储计数 */
            local.set('countDown', time);
            /** 判断是否倒计时小于0 */
            if (time <= 0) {
                /** 清除倒计时 */
                clearInterval(timer);
                /** 清除存储计数 */
                local.remove('countDown');
                /** 恢复默认值 */
                setCountDown(initTime);
                /** 触发结束 */
                onEnd && onEnd();
            }
        }, 1000);
    };

    /** 点击按钮 */
    const handleClickButton = (e: IButtonClickType) => {
        /** 增加倒计时 */
        e.handleCountDown = handleCountDown;
        onClick && onClick(e);
    };

    return (
        <div className="l-button">
            <AButton
                className={classnames(`-${mode}`, `-${size}`, className)}
                block={block}
                onClick={handleClickButton}
                {...buttonProps}
            >
                {props.children}
            </AButton>
        </div>
    );
};

export default Button;
