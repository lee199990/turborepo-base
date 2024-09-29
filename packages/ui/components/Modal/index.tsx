import React, { FC } from 'react';
import classnames from 'classnames';
import { Modal as AModal, Button } from 'antd';
// import Button from 'ant';
import { GetFuncPropsType } from '../../constants/interface';

import './index.less';

type IModalProps = GetFuncPropsType<typeof AModal>;

enum DEFAULT {
    /** 取消 */
    CANCELTEXT = '取消',
    /** 确定 */
    OKTEXT = '确定'
}

const Modal: FC<IModalProps> = props => {
    const {
        footer,
        className,
        confirmLoading,
        okText = DEFAULT.OKTEXT,
        cancelText = DEFAULT.CANCELTEXT,
        onOk,
        onCancel,
        ...modalProps
    } = props;

    return (
        <AModal
            className={classnames(['l-modal', className])}
            footer={
                footer !== undefined
                    ? footer
                    : [
                          <Button key="cancel" mode="default" onClick={onCancel}>
                              {cancelText}
                          </Button>,
                          <Button
                              key="ok"
                              mode="theme"
                              className="ml-16"
                              loading={confirmLoading}
                              onClick={onOk}
                          >
                              {okText}
                          </Button>
                      ]
            }
            onCancel={onCancel}
            {...modalProps}
        >
            {props.children}
        </AModal>
    );
};

export default Modal;
