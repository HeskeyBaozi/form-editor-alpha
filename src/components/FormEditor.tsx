import React, { useState, useMemo, useCallback } from 'react';
import prettier from 'prettier/standalone';
import parserBabylon from 'prettier/parser-babylon';
import styled, { css } from 'styled-components';
import { Radio, Typography, Card, Descriptions } from 'antd';
import { FormEditorValue, UIEntity } from './form-type';
import OverLay from './OverLay';

interface FormEditorProps {
  theme?: 'light' | 'dark';
  value?: FormEditorValue;
}

const { Title } = Typography;

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: ${props => (props.theme === 'light' ? 'white' : 'black')};
  display: grid;
  grid-template-rows: 64px auto;
  grid-template-columns: 150px auto 250px;
  gap: 8px;
  grid-template-areas:
    'header header right'
    'left center right';
`;

const Paper = styled.div`
  padding: 1rem;
  border: 1px solid #282c348a;
  overflow: auto;
`;

const HoverableCard = styled(Card)`
  position: relative;
  transition: border-color 200ms;
  min-height: 120px;
  box-sizing: content-box;
  &:hover {
    border-color: #09d3ac;
  }
  ${(props: { actived: boolean }) =>
    props.actived &&
    css`
      border: 2.5px solid #09d3ac;
    `}
`;

const EditorHeader = styled(Paper)`
  overflow: hidden;
  grid-column-start: 1;
  grid-column-end: span 2;
`;

const EditorLeft = styled(Paper)`
  grid-row-start: 2;
  grid-row-end: span 1;
`;

const EditorCenter = styled(Paper)`
  grid-row-start: 2;
  grid-row-end: span 1;
`;

const EditorRight = styled(Paper)`
  grid-row-start: 1;
  grid-row-end: span 2;
`;

const CenterClientWrapper = styled(Paper)`
  width: 80%;
  min-width: 400px;
  margin: auto;
  border: none;

  > .ant-card {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const JSONWrapper = styled.code`
  display: block;
  margin: auto;
  width: 400px;
  padding: 1rem;
  word-break: break-all;
  white-space: pre;
  font-size: 0.8rem;
`;

const FormEditor: React.FC<FormEditorProps> = ({
  theme = 'light',
  value = {}
}) => {
  const [contentType, setContentType] = useState<'edit' | 'preview'>('edit');
  const [chosenKey, setChosenKey] = useState<string | null>(null);
  const chosenUIEntity: UIEntity | null = useMemo(() => {
    if (chosenKey === value.key && value.key && value.id && value.title) {
      return {
        key: value.key,
        value: value.id,
        title: value.title,
        type: 'Form',
        orientation: -1
      };
    }
    if (value.content) {
      const target = value.content.find(one => one.key === chosenKey);
      if (target) {
        return target;
      }
    }

    if (value.actions) {
      const target = value.actions.find(one => one.key === chosenKey);
      if (target) {
        return target;
      }
    }
    return null;
  }, [value, chosenKey]);

  const jsonOfValue = useMemo(
    () =>
      prettier.format(JSON.stringify(value), {
        parser: 'json5',
        plugins: [parserBabylon]
      }),
    [value]
  );

  const handleChangeContentType = useCallback(e => {
    setContentType(e.target.value as 'edit' | 'preview');
  }, []);

  const handleClickCard = useCallback(
    (key: string) => {
      setChosenKey(key === chosenKey ? null : key);
    },
    [chosenKey]
  );

  const content = useMemo(() => {
    let array: any[] = [];
    if (value.content) {
      array = value.content.map(one => {
        return (
          <HoverableCard
            onClick={() => handleClickCard(one.key)}
            actived={chosenKey === one.key}
            key={one.key}
          >
            <div>
              {one.title} {one.key}
            </div>
            <OverLay />
          </HoverableCard>
        );
      });
    }

    return contentType === 'edit' ? (
      <CenterClientWrapper>
        <HoverableCard
          onClick={() => handleClickCard(value.key || 'default_key')}
          actived={chosenKey === value.key}
          key={value.key}
        >
          <Title level={2}>{value.title}</Title>
        </HoverableCard>
        {array}
      </CenterClientWrapper>
    ) : null;
  }, [contentType, value, chosenKey, handleClickCard]);

  const currentComponentMeta = useMemo(() => {
    if (chosenUIEntity) {
      const { key, type } = chosenUIEntity;
      return (
        <Descriptions title="当前组件" layout="vertical" column={1}>
          <Descriptions.Item label="key">{key}</Descriptions.Item>
          <Descriptions.Item label="UI类型">{type}</Descriptions.Item>
        </Descriptions>
      );
    }
    return (
      <Descriptions title="当前组件" colon={false} column={1}>
        <Descriptions.Item>暂无组件</Descriptions.Item>
      </Descriptions>
    );
  }, [chosenUIEntity]);

  return (
    <Wrapper theme={theme}>
      <EditorHeader>
        <Radio.Group value={contentType} onChange={handleChangeContentType}>
          <Radio.Button value="edit">可视编辑</Radio.Button>
          <Radio.Button value="preview">输出预览</Radio.Button>
        </Radio.Group>
      </EditorHeader>
      <EditorLeft>left</EditorLeft>
      <EditorCenter>
        {content}
        {contentType === 'preview' ? (
          <JSONWrapper>{jsonOfValue}</JSONWrapper>
        ) : null}
      </EditorCenter>
      <EditorRight>
        {currentComponentMeta}
        <Title level={4}>属性编辑</Title>
      </EditorRight>
    </Wrapper>
  );
};

export default FormEditor;
