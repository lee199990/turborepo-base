import React, { FC } from 'react';
import { Checkbox as ACheckbox } from 'antd';
import { GetFuncPropsType } from '../../constants/interface';

import './index.less';

type ICheckboxPorps = GetFuncPropsType<typeof ACheckbox>;

type ICheckboxProps = ICheckboxPorps;

type ICheckboxStatic = {
    Group: typeof ACheckbox.Group;
};

const Checkbox: FC<ICheckboxProps> & ICheckboxStatic = props => {
    return (
        <div className="l-checkbox">
            <ACheckbox {...props} />
        </div>
    );
};

Checkbox.Group = ACheckbox.Group;

export default Checkbox;
