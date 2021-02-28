---
nav:
  title: 组件
  path: /components
---

## MForm

Demo:

```tsx
import React, { useState } from 'react';
import { MForm } from 'dumi-template';

const schema = [
  { type: 'MInput', key: 'name', label: '名字' },
  { type: 'MInput', key: 'pwd', label: '密码' },
];

const ruleConfig = {
  // name: [{ validator: /(.*){3,6}/g, msg: '请输入指定长度的姓名' }],
  pwd: [
    {
      // validator: val => {
      //   return new Promise((res, rej) => {
      //     setTimeout(() => {
      //       const a = /^\d{3,5}$/.test(val);
      //       console.log(111, val, a);
      //       res(a);
      //     }, 2000);
      //   });
      // },
      validator: /^\d{3,5}$/,
      msg: '请输入数字',
    },
  ],
};

export default () => {
  const [fromData, setFromData] = useState({
    name: 'jimi',
    pwd: 'dd',
  });
  return (
    <MForm
      title="First Demo"
      schema={schema}
      onChange={setFromData}
      fromData={fromData}
      ruleConfig={ruleConfig}
    ></MForm>
  );
};
```

[更多技巧](https://d.umijs.org/guide/demo-principle)
