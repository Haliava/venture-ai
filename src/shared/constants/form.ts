import { FIELD_API_NAMES, StartupFormFieldValue, StartupFormFieldValues } from "../types/form";

export const FIELDS = [
  { 
    title: 'Идея проекта',
    apiFieldName: FIELD_API_NAMES.idea,
    description: 'Опишите концепцию проекта. Это конкретный продукт с\xa0конкретными характеристиками и механизмом работы.',
    required: true
  },
  {
    title: 'УТП проекта',
    apiFieldName: FIELD_API_NAMES.utp,
    description: 'Опишите уникальное торговое предложение Вашего продукта. Чем он отличается от предложений конкурентов?',
    required: true
  },
  {
    title: 'Проблема',
    apiFieldName: FIELD_API_NAMES.problem,
    description: 'Проблема - конкретная “боль” клиентов, которую решает Ваш продукт. Опишите ситуацию, где клиент испытывает дискомфорт.',
    required: true
  },
  {
    title: 'Решение',
    apiFieldName: FIELD_API_NAMES.solution,
    description: 'Напишите как Ваш продукт решает описанную выше проблему. Выражайте решение в измеримом эквиваленте (время, проценты, суммы и т.д.) ',
    required: true
  },
  {
    title: 'Технология реализации',
    apiFieldName: FIELD_API_NAMES.tech,
    description: 'Опишите какие технологии и инструменты используются для создания Вашего продукта.',
    required: false
  },
  {
    title: 'Целевая аудитория',
    apiFieldName: FIELD_API_NAMES.users,
    description: 'Опишите подробный портрет аудитории, для которой предназначен продукт.',
    required: false,
  },
  {
    title: 'Дорожная карта',
    apiFieldName: FIELD_API_NAMES.roadmap,
    description: 'Напишите 3-5 этапов развития проекта и их даты. ',
    required: false,
  },
  {
    title: 'Объем рынка',
    apiFieldName: FIELD_API_NAMES.volume,
    description: 'Объем потенциальных клиентов и доля, на которую Вы претендуете (PAM, TAM, SAM, SOM). ',
    required: false,
  },
  {
    title: 'Конкуренты',
    apiFieldName: FIELD_API_NAMES.compeition,
    description: 'Напишите 3-5 конкурентов, которые решают похожую проблему. Опишите их сильные и слабые стороны.',
    required: false,
  },
  {
    title: 'Стратегия',
    apiFieldName: FIELD_API_NAMES.stategy,
    description: 'Опишите модель дохода и то, как на Вашем продукте можно зарабатывать.',
    required: false,
  },
  {
    title: 'Команда проекта',
    apiFieldName: FIELD_API_NAMES.team,
    description: 'Команда - люди, которые стоят за стартапом. Назовите имя каждого участника и их роль в проекте, опыт работы.',
    required: false,
  },
  {
    title: 'Публикации',
    apiFieldName: FIELD_API_NAMES.publications,
    description: 'При наличии, опишите экспертные статьи, исследования и/или упоминание в прессе Вашей команды. Дайте ссылки на них.',
    required: false,
  },
] as const satisfies { title: string; description: string; apiFieldName: FIELD_API_NAMES, required: boolean; }[];

export const fieldApiNameToDisplayName: Record<StartupFormFieldValue, typeof FIELDS[number]['title'] | 'Теги'> = {
  compeition: 'Конкуренты',
  idea: 'Идея проекта',
  problem: 'Проблема',
  publications: 'Публикации',
  roadmap: 'Дорожная карта',
  solution: 'Решение',
  stategy: 'Стратегия',
  team: 'Команда проекта',
  tech: 'Технология реализации',
  users: 'Целевая аудитория',
  utp: 'УТП проекта',
  volume: 'Объем рынка',
  tags: 'Теги',
}

export const defaultFormValues: StartupFormFieldValues = {
  idea: '',
  utp: '',
  problem: '',
  solution: '',
  tech: '',
  users: '',
  roadmap: '',
  volume: '',
  compeition: '',
  stategy: '',
  team: '',
  publications: '',
  tags: [],
}

export const ERROR_MESSAGES = {
  TOO_LONG: (MAX_SYMBOL_COUNT: number) => `В поле не должно быть больше ${MAX_SYMBOL_COUNT} символов.`,
  TOO_SHORT: (MIN_SYMBOL_COUNT: number) => `В поле не должно быть меньше ${MIN_SYMBOL_COUNT} символов.`,
  TOO_FEW_TAGS: 'В поле теги должно быть указано минимум 2 тега',
  REQUIRED: 'Поле обязательно к заполнению',
  WRONG_PHONE_FORMAT: 'Введите номер телефона в формате +7 953 123 45 67',
}