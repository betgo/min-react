const supportSymbols = typeof Symbol === 'function' && typeof Symbol.for === 'function';

export const REACT_ELEMENT_TYPE = supportSymbols ? Symbol.for('react.element') : 0xeac7;
