import { FIELDS } from "../constants/form";

export type FIELD_NAMES = typeof FIELDS[number]['title'];

export type StartupFormField = {
  title: FIELD_NAMES;
  description: string;
  required?: boolean;
}

export enum FIELD_API_NAMES {
  idea = 'idea',
  utp = 'utp',
  problem = 'problem',
  solution = 'solution',
  tech = 'tech',
  users = 'users',
  roadmap = 'roadmap',
  volume = 'volume',
  compeition = 'compeition',
  stategy = 'stategy',
  team = 'team',
  publications = 'publications',
  tags = 'tags',
}

export type StartupFormFieldValues = {
  idea: string;
  utp: string;
  problem: string;
  solution: string;
  tech: string;
  users: string;
  roadmap: string;
  volume: string;
  compeition: string;
  stategy: string;
  team: string;
  publications: string;
  tags: string[];
}

export type StartupFormFieldValue = keyof StartupFormFieldValues;

export type StartupForm = StartupFormFieldValues;
