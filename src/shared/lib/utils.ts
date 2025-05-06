import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { constraints, MAX_TAG_LENGTH } from "../constants/general"
import { ERROR_MESSAGES, fieldApiNameToDisplayName, FIELDS } from "../constants/form";
import { FIELD_NAMES, StartupFormFieldValue } from "../types/form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function squishText(text: string) {
  return text.length >= MAX_TAG_LENGTH ? `${text.slice(0, MAX_TAG_LENGTH)}...` : text;
}

export function getFormFieldName(formField: StartupFormFieldValue) {
  return fieldApiNameToDisplayName[formField];
}

export function getApiFormFieldNameFromFieldDisplayName(displayName: FIELD_NAMES) {
  return Object.entries(fieldApiNameToDisplayName).find(entry => entry[1] === displayName)?.[0] as StartupFormFieldValue
}

export function formFieldErrors(apiFieldName: StartupFormFieldValue, value: string) {
  const errors = [];
  const fieldDescriptors = FIELDS.find(item => item.title === getFormFieldName(apiFieldName))

  if (fieldDescriptors?.required && value.length <= 0) {
    errors.push(ERROR_MESSAGES.REQUIRED)
  }

  if (fieldDescriptors?.required && value.length < constraints[apiFieldName].MIN_SYMBOL_COUNT) {
    errors.push(ERROR_MESSAGES.TOO_SHORT(constraints[apiFieldName].MIN_SYMBOL_COUNT))
  }

  if (value.length > constraints[apiFieldName].MAX_SYMBOL_COUNT) {
    errors.push(ERROR_MESSAGES.TOO_LONG(constraints[apiFieldName].MAX_SYMBOL_COUNT))
  }

  return errors;
}

export function displayTimerTime(elapsedSeconds: number) {
  const paddedMinutes = (Math.floor(elapsedSeconds / 60)).toString().padStart(2, '0');
  const paddedSeconds = (elapsedSeconds - 60 * Math.floor(elapsedSeconds / 60)).toString().padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}
