import React, { FC } from "react";
import classnames from "classnames";
import { StaticCompProps } from ".";

const Pagination: FC<StaticCompProps> = props => {
  const { className, ...paginationProps } = props;

  return (
    <div className={classnames(["table-pro-pagination", className])} {...paginationProps}>
      <div>{props.children}</div>
    </div>
  );
};

export default Pagination;
