import React, { FC } from 'react';
import classnames from 'classnames';
import { Pagination as APagination, PaginationProps } from 'antd';

import './index.less';

type IProps = PaginationProps;

const DEFAULT = {
    SHOW_SIZE_CHANGER: true,
    SHOW_QUICK_JUMPER: true,
    PAGE_SIZE_OPTIONS: ['10', '30', '50', '100']
};

interface ShowTotalProps {
    total: number;
}

/** 总数量 */
const ShowTotal: FC<ShowTotalProps> = props => {
    const { total } = props;

    return <span className="f14 color-999999">总共{total}条数据</span>;
};

const Pagination: FC<IProps> = props => {
    const {
        className,
        total = 0,
        pageSizeOptions = DEFAULT.PAGE_SIZE_OPTIONS,
        showSizeChanger = DEFAULT.SHOW_SIZE_CHANGER,
        showQuickJumper = DEFAULT.SHOW_QUICK_JUMPER,
        showTotal = () => <ShowTotal total={total} />,
        ...paginationProps
    } = props;

    return (
        <div className={classnames(['l-pagination', className])}>
            <APagination
                className="flex-c-end pagination-box"
                total={total}
                showTotal={showTotal}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={showSizeChanger}
                showQuickJumper={showQuickJumper}
                {...paginationProps}
            />
        </div>
    );
};

export default Pagination;
