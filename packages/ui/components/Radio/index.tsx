import React, { FC } from "react";
import classnames from "classnames";
import { Radio as ARadio } from "antd";
import { GetFuncPropsType } from "../../constants/interface";

import "./index.less";

type IGroupRadio = typeof ARadio.Group;

type IRadio = GetFuncPropsType<typeof ARadio>;

type IStatic = {
  Group: IGroupRadio;
};

const Radio: FC<IRadio> & IStatic = props => {
  const { className } = props;

  return <ARadio className={classnames(["l-radio", className])} {...props} />;
};

Radio.Group = ARadio.Group;

export default Radio;
