import React, { FC } from "react";
import classnames from "classnames";
import { StaticCompProps } from ".";

const Find: FC<StaticCompProps> = props => {
  const { className, ...findProps } = props;

  return (
    <div className={classnames(["table-pro-find", className])} {...findProps}>
      <div>{props.children}</div>
    </div>
  );
};

export default Find;
