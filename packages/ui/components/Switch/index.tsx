import React, { FC } from "react";
import { Switch as ASwitch } from "antd";
import { GetFuncPropsType } from "../../constants/interface";

interface ISwitchProps extends GetFuncPropsType<typeof ASwitch> {
  label?: string;
}

const Switch: FC<ISwitchProps> = props => {
  const { label, ...switchProps } = props;

  return (
    <div className="l-switch flex-c-start">
      {label && <span>{label}</span>}
      <ASwitch {...switchProps} />
    </div>
  );
};

export default Switch;
