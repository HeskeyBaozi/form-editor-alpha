import React, { useMemo } from 'react';
import { GeneralBlockProps } from './GeneralBlock';
import { Input, Form } from 'antd';

interface InputBlockProps extends GeneralBlockProps {}

const InputBlock: React.FC<InputBlockProps> = ({ entity }) => {
  const { hintText, title, orientation } = entity;
  const computedItemLayout = useMemo(() => {
    return orientation
      ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }
      : {};
  }, [orientation]);

  return (
    <Form.Item hasFeedback={false} label={title} {...computedItemLayout}>
      <Input placeholder={hintText} />
    </Form.Item>
  );
};

export default InputBlock;
