import React from 'react';
import { UIEntity } from '../form-type';
import InputBlock from './InputBlock';

export interface GeneralBlockProps {
  entity: UIEntity;
}

const GeneralBlock: React.FC<GeneralBlockProps> = ({ entity }) => {
  const { type, key, title, value } = entity;
  switch (type) {
    case 'Input':
      return <InputBlock entity={entity} />;
    default:
      return (
        <div>
          <div>type = {type}</div>
          <div>key = {key}</div>
          <div>title = {title}</div>
          <div>value = {value}</div>
        </div>
      );
  }
};

export default GeneralBlock;
