// ReactElement

import { REACT_ELEMENT_TYPE } from 'react/shared/ReactSymbols';
import { Key, Props, ReactElement, Ref, Type } from 'react/shared/ReactTypes';

const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElement {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'wxx',
  };
  return element;
};
