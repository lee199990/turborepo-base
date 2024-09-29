import React from "react";
import classnames from "classnames";
import { TableProps } from "antd/lib/table";
import { Table as ATable } from "antd";

import "./index.less";

const DEFAULT = {
  PAGINATION: false as false,
};

const Table = <T extends object = any>(props: TableProps<T>): JSX.Element => {
  const { className, pagination = DEFAULT.PAGINATION, columns, ...tableProps } = props;

  return (
    <ATable
      columns={columns}
      pagination={pagination}
      className={classnames(["l-table", className])}
      {...tableProps}
    ></ATable>
  );
};

export default Table;
