import { MInput, Submit } from './components/input';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Input } from 'antd';
import { createValidator } from '@ignorance/validator';

export interface SchemaItem {
  type: string;
  key: string;
  label: string;
}

interface Props {
  schema: SchemaItem[];
  onChange: (data: any) => void;
  ruleConfig?: {
    [k: string]: any[];
  };
  fromData?: {
    [k: string]: string;
  };
  components?: {
    [k: string]: () => React.Component;
  };
}

const DEFAULT_COMP = {
  Input,
  MInput,
  Submit,
};

const useUpdate = () => {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
};

export default (props: Props) => {
  const {
    ruleConfig = {},
    fromData = {},
    schema,
    onChange,
    components = {},
  } = props;
  const forceUpdate = useUpdate();
  const validateMsg = useRef({});
  const originWidgets = useRef<any>({});
  // const [validateMsg, setValidateMsg] = useState({});
  const {
    verifySingle,
    verifySingleAsync,
    getResult,
    verifyAll,
  } = createValidator(ruleConfig);

  const dataChange = useCallback((key, value: any) => {
    onChange({
      ...fromData,
      [key]: value,
    });
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const validator = useCallback(async (key: string, value: string) => {
    validateMsg.current[key] = await verifySingleAsync(key, value);
    forceUpdate();
  }, []);

  const renderItem = useCallback(() => {
    return schema.map(fromItem => {
      const { type, key } = fromItem;
      // 构造校验函数
      if (!validateMsg.current[key]) validateMsg.current[key] = {};
      // const submit = () => {
      //   verifyAll(fromData);
      //   validateMsgRef.current = getResult();
      // };
      const Widget = DEFAULT_COMP[type] || components[type];
      return (
        <Widget
          value={fromData[key]}
          fromItem={fromItem}
          key={key}
          name={key}
          onChange={dataChange}
          validator={validator}
          validateMsg={validateMsg.current[key]}
        />
      );
    });
  }, [fromData]);

  return <form>{renderItem()}</form>;
};
