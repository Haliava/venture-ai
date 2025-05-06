export enum Device {
  WEB = 'web',
  MOBILE = 'mobile',
}

export enum Constraint {
  MIN_SYMBOL_COUNT = 'MIN_SYMBOL_COUNT',
  MAX_SYMBOL_COUNT = 'MAX_SYMBOL_COUNT',
}

export type Tab = {
  href: string;
  text: string;
}