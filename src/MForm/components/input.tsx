import React, { useMemo, useState } from 'react';

import { SchemaItem } from '../index';

export const MInput = React.memo(
  (props: {
    value: any;
    name: string;
    label: string;
    fromItem: SchemaItem;
    onChange: (key: string, value: string) => void;
    validator: (key: string, value: string) => void;
    validateMsg: {
      name: string;
      valid: boolean;
      msg?: string;
    };
  }) => {
    const { name, label, value, onChange, validateMsg, validator } = props;
    return (
      <div>
        <input
          type="text"
          value={value}
          placeholder={label}
          onChange={e => {
            onChange(name, e.target.value);
            validator(name, e.target.value);
          }}
        />
        <p>{validateMsg.valid || validateMsg.msg}</p>
      </div>
    );
  },
);

export const Submit = () => {
  return <h2 onClick={() => {}}>submit</h2>;
};
