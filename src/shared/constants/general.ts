import { Tab } from "../types/general";

export const MIN_SYMBOL_COUNT = 10;
export const MAX_SYMBOL_COUNT = 1000;
export const MAX_TAG_LENGTH = 20;

export const SCREEN_SM = 320;
export const SCREEN_MD = 512;
export const SCREEN_LG = 816;

export const TABS: Tab[] = [
  { text: 'Главная', href: '/' },
  { text: 'Подписка', href: '/subscribe' },
  { text: 'Проекты', href: '/projects' },
  { text: 'Настройки', href: '/settings' },
  { text: 'Мой профиль', href: '/profile' },
]
