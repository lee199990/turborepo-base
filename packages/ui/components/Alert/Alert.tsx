import React, { FC } from 'react';
import { Alert as AAlert } from 'antd';

import './index.less';

type IAlertProps = Parameters<typeof AAlert>[0];

type IProps = IAlertProps;

const Alert: FC<IProps> = props => {
    return (
        <div className="l-alert">
            <AAlert className="color-666666" {...props} />
        </div>
    );
};

export default Alert;
