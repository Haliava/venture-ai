import { StartupFormFieldValues } from "../types/form";
import { Constraint, Tab } from "../types/general";
import { User } from "../types/user";

export const BIG_NUM = 10e6
export const STORAGE = {
  SENT_FEEDBACK: 'sentFeedback',
} as const;

export const LOADING_LINES = [
  'Сканируем космос на признаки разумных инвестиций...',
  'Просчитываем вероятность, что это новый Uber, а не новый Juicero...',
  'Отправили запрос Илону Маску, ждем ответа...',
  'Привлекаем шамана, чтобы он подвигал юнит-экономику...',
  'Ищем инвестора, который не спросит про прибыль...',
  'Подключаем экстрасенсов венчурного рынка...',
  'Перечитываем бизнес-план, надеясь, что в этот раз поймем...',
  'Считаем, сколько пивот-раундов потребуется...',
  'Скрываем данные от СБЕРа, пока не поздно...',
  'Запустили чат в Кремниевой долине, все молчат...',
  'На всякий случай проверяем патенты...',
  'Ставим на красное и крутим венчурную рулетку...',
  'Запросили консультацию у дедушки с рынка...',
  'Ищем на карте – есть ли хоть один клиент...',
  'Считаем burn rate и запасаемся валерьянкой...',
  'Гадаем на кофейной гуще, но кофе кончился...',
  'Переписываем прогноз, чтобы звучал оптимистично...',
]

export const constraints:
  Record<
    keyof StartupFormFieldValues,
    Record<Constraint.MAX_SYMBOL_COUNT | Constraint.MIN_SYMBOL_COUNT, number>
  > = {
  compeition: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 2000,
  },
  idea: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 1500,
  },
  problem: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 1500,
  },
  publications: {
    [Constraint.MIN_SYMBOL_COUNT]: 200,
    [Constraint.MAX_SYMBOL_COUNT]: 1500,
  },
  roadmap: {
    [Constraint.MIN_SYMBOL_COUNT]: 500,
    [Constraint.MAX_SYMBOL_COUNT]: 3000,
  },
  solution: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 2000,
  },
  stategy: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 2000,
  },
  tags: {
    [Constraint.MIN_SYMBOL_COUNT]: 10,
    [Constraint.MAX_SYMBOL_COUNT]: 1000,
  },
  team: {
    [Constraint.MIN_SYMBOL_COUNT]: 200,
    [Constraint.MAX_SYMBOL_COUNT]: 1500,
  },
  tech: {
    [Constraint.MIN_SYMBOL_COUNT]: 500,
    [Constraint.MAX_SYMBOL_COUNT]: 2500,
  },
  users: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 1000,
  },
  utp: {
    [Constraint.MIN_SYMBOL_COUNT]: 200,
    [Constraint.MAX_SYMBOL_COUNT]: 800,
  },
  volume: {
    [Constraint.MIN_SYMBOL_COUNT]: 300,
    [Constraint.MAX_SYMBOL_COUNT]: 2000,
  },
}
export const userFormConstraints:
  Record<
    keyof Omit<User, 'email' | 'avatar' | 'phone'>,
    {[Key in Constraint.MAX_SYMBOL_COUNT | Constraint.MIN_SYMBOL_COUNT | Constraint.APPROPRIATE_FORMAT]: string | number | undefined}
  > = {
  name: {
    [Constraint.MIN_SYMBOL_COUNT]: 2,
    [Constraint.MAX_SYMBOL_COUNT]: 40,
    [Constraint.APPROPRIATE_FORMAT]: undefined,
  },
  surname: {
    [Constraint.MIN_SYMBOL_COUNT]: 2,
    [Constraint.MAX_SYMBOL_COUNT]: 40,
    [Constraint.APPROPRIATE_FORMAT]: undefined,
  },
  password: {
    [Constraint.MAX_SYMBOL_COUNT]: BIG_NUM,
    [Constraint.MIN_SYMBOL_COUNT]: 8,
    [Constraint.APPROPRIATE_FORMAT]: undefined,
  }
}
export const MAX_TAG_LENGTH = 20;
export const MIN_SYMBOL_COUNT = 10;
export const MAX_SYMBOL_COUNT = 1000;

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
