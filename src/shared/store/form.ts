import { create } from 'zustand'
import { StartupForm, StartupFormFieldValues } from '../types/form'
import { defaultFormValues } from '../constants/form';

type FormStoreState = {
  values: StartupForm,
  setValues: (newValues: StartupFormFieldValues) => void,
  setFormValue: (fieldName: string, value: string | string[]) => void,
}

export const useFormStore = create<FormStoreState>((set, get) => ({
  values: defaultFormValues,
  setValues: (newValues: Record<string, string | string[]>) =>
    set((state) => ({ values: {...state.values, ...newValues }})),
  setFormValue: (fieldName: string, value: string | string[]) =>
    set((state) => ({ values: { ...state.values, [fieldName]: value }})),
}))