import React, { FC, useState } from "react";
import classnames from "classnames";
import { SearchProps } from "antd/lib/input/Search";
import { Input as AInput } from "antd";

import "./index.less";

type IInputProps = SearchProps & React.RefAttributes<any>;

interface IProps extends IInputProps {
  /** 错误消息 */
  errorMessage?: string;
  /** 正则表达式 */
  valid?: RegExp | RegExp[] | string;
  /** 是否合法 */
  isValid?: boolean;
  /** 是否合法监听 */
  onValid?: (isValid: boolean) => void;
}

const Input: FC<IProps> = props => {
  const {
    value,
    valid,
    isValid,
    className,
    errorMessage,
    autoComplete = "off",
    onValid,
    onChange,
    ...inputProps
  } = props;

  /** 是否合法 自动监听 */
  const [isValidAuto, setIsValidAuto] = useState<boolean>(true);

  /** 监听Input事件 */
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange && onChange(e);

    // 是否合法
    if (valid) {
      let bool = true;

      /** 是否是数组 */
      if (Array.isArray(valid)) {
        for (const item of valid) {
          if (!item.test(value)) {
            bool = false;
            break;
          }
        }
      } else if (typeof valid === "string") {
        bool = valid === value;
      } else {
        bool = valid.test(value);
      }

      isVaildFunc(bool);
    }
  };

  /** 判断是否合法函数 */
  const isVaildFunc = (bool: boolean) => {
    if (bool) {
      // 合法操作

      // 触发手动监听
      onValid && onValid(true);

      // 自动监听
      isValid === undefined && setIsValidAuto(true);
    } else {
      // 不合法操作

      // 触发手动监听
      onValid && onValid(false);

      // 自动监听
      isValid === undefined && setIsValidAuto(false);
    }
  };

  return (
    <div className={classnames(["position-relative l-input", className])}>
      <AInput.Search
        className="input"
        value={value}
        autoComplete={autoComplete}
        onChange={handleChangeInput}
        {...inputProps}
      />
      <p
        className={classnames([
          "position-absolute l-10 color-error f12",
          { "d-none": isValid === undefined ? isValidAuto : isValid },
          "error",
        ])}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default Input;
