import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import FormEditor from './components/FormEditor';
import './App.css';

const PreviewWrapper = styled.div`
  border: 1px solid lightblue;
  width: 75vw;
  height: 80vh;
  margin: 1rem auto 1rem auto;
`;

const value = {
  content: [
    {
      type: 'Input',
      title: '姓名',
      value: '路飞',
      key: 'user_name',
      hintText: '请输入姓名',
      orientation: 0,
      url: 'fafa',
      inputType: 'text'
    },
    {
      type: 'SingleChoice',
      title: '单选框',
      value: 'male',
      hintText: 'fafa',
      key: 'sex_choice',
      orientation: 0,
      orientation_child: 0,
      url: 'fafa',
      children: [
        {
          key: 'radio_male',
          type: 'RadioButton',
          title: '男',
          checked: true,
          value: 'male',
          hintText: 'fafa',
          orientation: 0
        },
        {
          key: 'radio_female',
          type: 'RadioButton',
          title: '女',
          value: 'female',
          hintText: 'fafa',
          orientation: 0
        }
      ]
    },
    {
      type: 'MultiChoice',
      title: '多选框',
      value: '',
      hintText: 'fafa',
      key: 'sex_choice',
      orientation: 0,
      orientation_child: 0,
      url: 'fafa',
      children: [
        {
          key: 'checkbox_male',
          type: 'CheckBox',
          title: '男',
          value: 'male',
          hintText: 'fafa',
          orientation: 0
        },
        {
          key: 'checkbox_female',
          type: 'CheckBox',
          title: '女',
          value: 'female',
          hintText: 'fafa',
          inputType: 'fafa',
          orientation: 0
        },
        {
          key: 'checkbox_unknown',
          type: 'CheckBox',
          title: '未知',
          value: 'unknown',
          hintText: 'fafa',
          inputType: 'fafa',
          orientation: 0
        }
      ]
    },
    {
      type: 'Label',
      title: '文本框',
      value: 'textview',
      hintText: 'fafa',
      orientation: 0,
      key: 'sex_choice'
    },
    {
      key: 'switch_bind',
      type: 'Switch',
      title: '绑定微博',
      value: 'fafa',
      orientation: 0,
      on: '开',
      off: '关',
      hintText: 'fafa'
    },
    {
      key: 'image_portrait',
      type: 'ImageView',
      title: '图片',
      orientation: 0,
      value: 'fafafa',
      hintText: 'fafa'
    }
  ],
  id: 'form_user_info',
  key: 0,
  title: '用户信息',
  actions: [
    {
      key: 'action-container',
      type: 'ActionContainer',
      orientation: 0,
      orientation_child: 0,
      url: 'fafa',
      title: 'container',
      value: '',
      children: [
        {
          key: 'button_commit',
          type: 'Button',
          title: 'commit',
          value: '提交',
          hintText: 'fafa',
          url: 'https://falk(接口地址)',
          orientation: 0
        },
        {
          key: 'button_reset',
          type: 'Button',
          title: 'reset',
          value: '重置',
          hintText: 'fafa',
          url: 'https://falk(接口地址)',
          orientation: 0
        }
      ]
    }
  ]
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <PreviewWrapper>
        <FormEditor value={value} />
      </PreviewWrapper>
    </div>
  );
};

export default App;
