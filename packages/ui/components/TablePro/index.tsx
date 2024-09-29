import React, { FC, useEffect, useRef } from "react";
import Pagination from "./Pagination";
import classnames from "classnames";
import Data from "./Data";
import Find from "./Find";

import { useSize } from "ahooks";

interface ITableProProps {
  /** 类名 */
  className?: string;
  /** 自定义高度 */
  height?: number;
  /** 外层Dom */
  rootDom?: HTMLElement | null;
  /** 监听Dom 元素高度 */
  onResize?: (rezise: Resize) => void;
}

export type Resize = {
  rootHeight: number;
  tableProHeight: number;
  findHeight: number;
  dataHeight: number;
  paginationHeight: number;
};

type ITableProStatic = {
  Data: typeof Data;
  Find: typeof Find;
  Pagination: typeof Pagination;
};

/** 静态 - 组件参数 */
export type StaticCompProps = {
  className?: string;
  style?: React.CSSProperties;
};

const TablePro: FC<ITableProProps> & ITableProStatic = props => {
  const { rootDom = null, height, className, onResize } = props;

  /** 外层 - dom */
  const rootDomRef = useRef<HTMLElement | null>(rootDom);

  /** 外层 - 大小 */
  const rootDomZise = useSize(rootDomRef);

  /** Table - Ref */
  const TableProRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const findDom: HTMLDivElement | null | undefined =
      TableProRef.current?.querySelector(".table-pro-find");
    // const DataDom: HTMLDivElement | null | undefined =
    //   TableProRef.current?.querySelector(".table-pro-data");
    const paginationDom: HTMLDivElement | null | undefined =
      TableProRef.current?.querySelector(".table-pro-pagination");

    const rootHeight = height || rootDomZise.height || 0,
      tableProHeight = TableProRef.current?.clientHeight || 0,
      findHeight = findDom?.clientHeight || 0,
      paginationHeight = paginationDom?.clientHeight || 0,
      dataHeight = rootHeight - findHeight - paginationHeight;

    /** 触发监听回调 */
    onResize &&
      onResize({
        rootHeight,
        tableProHeight,
        findHeight,
        paginationHeight,
        dataHeight,
      });
  }, [rootDomZise, height]);

  return (
    <div ref={TableProRef} className={classnames(["l-table-pro", className])}>
      {props.children}
    </div>
  );
};

TablePro.Data = Data;
TablePro.Find = Find;
TablePro.Pagination = Pagination;

export default TablePro;
