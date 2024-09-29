import React, { FC } from "react";
import classnames from "classnames";
import { GetFuncPropsType } from "../../constants/interface";
import { Input } from "antd";

interface ITextAreaProps extends GetFuncPropsType<typeof Input.TextArea> {
  /** 输入框 label */
  label?: string;
  /** 是否必填 */
  require?: boolean;
}

const TextArea: FC<ITextAreaProps> = props => {
  const { label, require, className, ...textAreaProps } = props;
  return (
    <div className="l-textarea">
      {label && (
        <div className="mb-8">
          {label} {!require && <span className="color-999999">（选填）</span>}
        </div>
      )}
      <Input.TextArea className={classnames(["l-textarea", className])} {...textAreaProps} />
    </div>
  );
};

export default TextArea;
