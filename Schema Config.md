# Form Editor

基于 `JSONSchema` 的表单数据模型定义

需求

- 可扩展性

## 例子

```json
// 定义一个表单
{
  "schema": {
    "title": "Image judger form",
    "description": "simple description",
    "type": "object",
    "properties": {
      "images": {
        "type": "array",
        "description": "展示用的图片",
        "items": {
          "type": "string"
        },
        "x-component": "ImageGroup",
        "x-params": {}
      },
      "imagesDescription": {
        "type": "string",
        "description": "图片简介文字",
        "x-component": "TextView",
        "x-params": {
          "markdown": true
        }
      },
      "isQualified": {
        "type": "boolean",
        "description": "图片是否合格",
        "x-component": "Switch",
        "x-params": {
          "size": "small"
        }
      },
      "satisfaction": {
        "type": "string",
        "description": "满意度",
        "enum": ["ok", "soso", "bad"],
        "x-component": "RadioGroup",
        "x-params": {
          "buttonStyle": "solid",
          "enumLabels": ["很OK", "一般", "不好"]
        }
      },
      "unqualifiedReason": {
        "type": "string",
        "description": "不合格原因",
        "x-component": "TextArea",
        "x-params": {
          "minRow": 4,
          "maxRow": 10
        }
      }
    },
    "required": ["isQualified"],
    "x-display": [
      "images",
      "imagesDescription",
      "satisfaction",
      "isQualified",
      "unqualifiedReason"
    ],
    "x-ignore": ["images", "imagesDescription"]
  },
  "prefetch": {
    "images": [
      "https://via.placeholder.com/300x300",
      "https://via.placeholder.com/350x350",
      "https://via.placeholder.com/400x400",
      "https://via.placeholder.com/450x450",
      "https://via.placeholder.com/500x500"
    ],
    "imagesDescription": "# 这是一段对图片集合的描述\n ## 标题二\n 如果组件支持`markdown` 语法，那么就会**正确地**渲染这段文字"
  }
}
```

### schema

#### title

表单标题

#### description

表单简单描述，一般只是展示于开发者

#### properties

属性。对于用户提交表单的每一个字段进行描述。`JSONSchema` 本身也是特殊的属性（继承），所以也有以下字段。（带`*`表示一定会有该字段）

- \*type: 数据类型 `string` | `number` | `boolean` | `null` | `array` | `object`
- properties: `object` 特有字段，描述其子属性
- required: `object` 特有字段，对必须出现的子属性进行约束
- items: `array` 特有字段，对数组中的元素进行描述

`x-` 前缀表示其不是`JSONSchema`规范里约定的字段，是我们自己约定的。

- x-component: 表示使用的 UI 组件
- x-params: 表示给 UI 组件提供的参数
- x-display: 表示展示的组件和顺序
- x-ignore: 表示这些字段在提交时不会被一并提交，并且在编辑器中是不可编辑的。

### prefetch

表示对数据的预获取数据，由服务端提供，目的是可以给一些字段提供默认值，或者给展示用的不可编辑字段提供数据。
