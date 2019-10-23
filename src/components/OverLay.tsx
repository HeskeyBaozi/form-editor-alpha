import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';

const DragHints = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  background: #09d3ac8c;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  color: #fff;
  cursor: pointer;

  > * {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const FunctionWrapper = styled.div`
  width: 24px;
  height: 84px;
  border-radius: 4px 0 0 4px;
  position: absolute;
  right: 0;
  top: 16px;
  bottom: 0;
  margin: auto;
  text-align: center;
  overflow: hidden;
  opacity: 0;
  z-index: 100;

  .ant-btn {
    line-height: 28px;
    height: 28px;
    width: 24px;
    border-radius: 0;
    padding: 0;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  z-index: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:hover {
    ${DragHints} {
      opacity: 1;
    }

    ${FunctionWrapper} {
      opacity: 1;
    }
  }
`;

interface OverLayProps {}

const OverLay: React.FC<OverLayProps> = () => {
  return (
    <CardOverlay>
      <DragHints>
        <Icon type="drag" />
        <span>拖拽此处或点击右侧按钮可更换位置</span>
      </DragHints>
      <FunctionWrapper>
        <Button type="primary" size="small">
          <Icon type="up" />
        </Button>
        <Button type="primary" size="small">
          <Icon type="down" />
        </Button>
        <Button type="primary" size="small">
          <Icon type="delete" />
        </Button>
      </FunctionWrapper>
    </CardOverlay>
  );
};

export default OverLay;
