export enum Device {
  WEB = 'web',
  MOBILE = 'mobile',
}

export enum Constraint {
  MIN_SYMBOL_COUNT = 'MIN_SYMBOL_COUNT',
  MAX_SYMBOL_COUNT = 'MAX_SYMBOL_COUNT',
  APPROPRIATE_FORMAT = 'APPROPRIATE_FORMAT',
}

export type PartialConstraints = Partial<Record<Constraint, string>>;

export type Tab = {
  href: string;
  text: string;
}