import React, { useState, useMemo, useCallback } from 'react';
import prettier from 'prettier/standalone';
import parserBabylon from 'prettier/parser-babylon';
import styled from 'styled-components';
import { Radio, Typography } from 'antd';
import { FormEditorValue } from './form-type';

interface FormEditorProps {
  theme?: 'light' | 'dark';
  value?: FormEditorValue;
}

const { Title, Paragraph, Text } = Typography;

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

  > * {
    overflow: auto;
  }
`;

const EditorHeader = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
`;

const Paper = styled.div`
  padding: 1rem;
  border: 1px solid lightblue;
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
  width: 400px;
  margin: auto;
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

  const jsonOfValue = useMemo(
    () =>
      prettier.format(JSON.stringify(value), {
        parser: 'json',
        plugins: [parserBabylon]
      }),
    [value]
  );

  const handleChangeContentType = useCallback(e => {
    setContentType(e.target.value as 'edit' | 'preview');
  }, []);

  const content = useMemo(
    () =>
      contentType === 'edit' ? (
        <CenterClientWrapper>
          <Title level={2}>{value.title}</Title>
        </CenterClientWrapper>
      ) : null,
    [contentType, value]
  );

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
        <Title level={4}>当前组件</Title>
        <Title level={4}>属性编辑</Title>
      </EditorRight>
    </Wrapper>
  );
};

export default FormEditor;
