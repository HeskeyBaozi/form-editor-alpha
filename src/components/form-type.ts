export type UIType =
  | 'Input'
  | 'SingleChoice'
  | 'RadioButton'
  | 'MultiChoice'
  | 'CheckBox'
  | 'Label'
  | 'Switch'
  | 'ImageView'
  | 'Button';

export interface UIEntity {
  key: string; // primary key
  type: UIType | string;
  title: string;
  value: string;
  orientation: 0 | 1 | number; // 0 = 水平，1 = 垂直
  orientation_child?: 0 | 1 | number; // 0 = 水平，1 = 垂直
  children?: UIEntity[];
  inputType?: string;
  hintText?: string;
  on?: string;
  off?: string;
  url?: string;
}

export interface FormEditorValue {
  id: string;
  key: number; // primary key
  title: string;
  content: UIEntity[];
  actions: UIEntity[];
}
