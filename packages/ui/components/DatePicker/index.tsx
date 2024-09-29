import React, { FC } from 'react';
import classnames from 'classnames';
import { DatePicker as ADatePicker } from 'antd';

import './index.less';

type IProps = ConstructorParameters<typeof ADatePicker>[0];

type Static = Pick<
    typeof ADatePicker,
    'WeekPicker' | 'MonthPicker' | 'YearPicker' | 'RangePicker' | 'TimePicker' | 'QuarterPicker'
>;

const DatePicker: FC<IProps> & Static = props => {
    const { className, ...datePickerProps } = props;

    return (
        <ADatePicker className={classnames(['l-date-picker', className])} {...datePickerProps}>
            {props.children}
        </ADatePicker>
    );
};

DatePicker.WeekPicker = ADatePicker.WeekPicker;
DatePicker.MonthPicker = ADatePicker.MonthPicker;
DatePicker.YearPicker = ADatePicker.YearPicker;
DatePicker.RangePicker = ADatePicker.RangePicker;
DatePicker.TimePicker = ADatePicker.TimePicker;
DatePicker.QuarterPicker = ADatePicker.QuarterPicker;

export default DatePicker;
