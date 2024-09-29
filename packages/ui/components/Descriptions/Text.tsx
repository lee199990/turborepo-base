import React, { CSSProperties, FC, ReactText, useMemo } from 'react';
import { Divider } from 'antd';
import classnames from 'classnames';

type DataChild = {
    name: ReactText;
    value?: ReactText;
    /** 是否显示 */
    visible?: Data['visible'];
    /** class */
    className?: Data['className'];
    /** style */
    style?: Data['style'];
    /** 提示 */
    hint?: ReactText | boolean | JSX.Element | ((item: DataChild) => JSX.Element);
    /** 自定义render */
    render?: (item: DataChild) => JSX.Element;
};

export type Data = {
    /** 是否显示 */
    visible?: boolean;
    /** 间隔 */
    divider?: boolean;
    /** class */
    className?: string;
    /** style */
    style?: CSSProperties;
    /** key */
    key?: ReactText;
    /** 标题 */
    title: ReactText;
    /** 子数据 */
    child?: DataChild[];
    /** 排列方式 */
    direction?: 'horizontal' | 'vertical';
    /** 自定义render */
    render?: (item?: DataChild[]) => JSX.Element;
};

interface ITextProps {
    data: Data[];
}

type IContentProps = {
    data: DataChild[];
} & Required<Pick<Data, 'direction'>>;

const DEFAULT = {
    DIRECTION: 'horizontal' as NonNullable<Data['direction']>,
    VISIBLE: true
};

const Content: FC<IContentProps> = props => {
    const { data, direction } = props;

    const Comp = useMemo(() => {
        switch (direction) {
            case 'horizontal':
                return (
                    <div className="flex-b-between flex-wrap">
                        {data.map(
                            (
                                { visible, name, value, hint, style, className, render },
                                index,
                                arr
                            ) => {
                                visible === undefined && (visible = DEFAULT.VISIBLE);
                                if (visible) {
                                    return (
                                        <div className="mb-16 w-50" key={name}>
                                            <div
                                                className={classnames(['flex-s-start', className])}
                                                style={style}
                                            >
                                                <div className="color-999999">{name}</div>
                                                <div>{render ? render(arr[index]) : value}</div>
                                            </div>
                                            {hint && typeof hint === 'function'
                                                ? hint(arr[index])
                                                : hint}
                                        </div>
                                    );
                                }
                            }
                        )}
                    </div>
                );

            case 'vertical':
                return (
                    <div>
                        {data.map(({ name, value, visible, render, className }, index, arr) => {
                            visible === undefined && (visible = DEFAULT.VISIBLE);
                            if (visible) {
                                return (
                                    <div
                                        className={classnames(['flex-c-start mb-16', className])}
                                        key={name}
                                    >
                                        <div className="color-999999">{name}</div>
                                        <div>{render ? render(arr[index]) : value}</div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );

            default:
                return <></>;
        }
    }, [direction, data]);

    return Comp;
};

const Text: FC<ITextProps> = props => {
    const { data } = props;

    return (
        <>
            {data.map(
                ({
                    key,
                    title,
                    child,
                    style,
                    divider,
                    direction,
                    className,
                    render,
                    visible = DEFAULT.VISIBLE
                }) => {
                    visible === undefined && (visible = DEFAULT.VISIBLE);

                    if (visible) {
                        return (
                            <div
                                key={key || title}
                                className={classnames([className])}
                                style={style}
                            >
                                <div>
                                    <div className="mb-16 f16 f-600">{title}</div>
                                    {(render && render(child)) ||
                                        (child && (
                                            <Content
                                                direction={direction || DEFAULT.DIRECTION}
                                                data={child}
                                            />
                                        ))}
                                </div>
                                {divider && <Divider key={key || title} />}
                            </div>
                        );
                    }
                }
            )}
        </>
    );
};

export default Text;
