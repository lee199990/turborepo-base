import React, { FC } from "react";
import classnames from "classnames";
import { Select as ASelect } from "antd";

import { GetFuncPropsType } from "../../constants/interface";

import "./index.less";

interface ISelectProps extends GetFuncPropsType<typeof ASelect> {
  /** label */
  label?: string;
  /** 是否必填 */
  require?: boolean;
}

interface ISelectStatic {
  Option: typeof ASelect.Option;
}

const DEFAULT = {
  REQUIRE: true,
};

const Select: FC<ISelectProps> & ISelectStatic = props => {
  const { label, dropdownClassName, require = DEFAULT.REQUIRE, ...selectProps } = props;
  return (
    <div className="l-select">
      {label && (
        <div className="mb-8">
          {label} {!require && <span className="color-999999">（选填）</span>}
        </div>
      )}
      <ASelect
        dropdownClassName={classnames(["dropdown-container", dropdownClassName])}
        {...selectProps}
      />
    </div>
  );
};

Select.Option = ASelect.Option;

export default Select;
