// ReactElement

import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ElemntType, Key, Props, ReactElement, Ref, Type } from 'shared/ReactTypes';

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
export const jsx = (type: ElemntType, config: any, ...maybeChildren: any): ReactElement => {
  let key = null;
  let ref = null;
  const props: Props = {};
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  if (maybeChildren.length === 1) {
    props.children = maybeChildren[0];
  } else if (maybeChildren.length > 1) {
    props.children = maybeChildren;
  }
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElemntType, config: any): ReactElement => {
  let key = null;
  let ref = null;
  const props: Props = {};
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  return ReactElement(type, key, ref, props);
};
