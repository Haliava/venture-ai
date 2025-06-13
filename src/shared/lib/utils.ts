import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { constraints, MAX_TAG_LENGTH, userFormConstraints } from "../constants/general"
import { ERROR_MESSAGES, fieldApiNameToDisplayName, FIELDS } from "../constants/form";
import { FIELD_API_NAMES, FIELD_NAMES, StartupFormFieldValue } from "../types/form";
import { User } from "../types/user";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export function formFieldErrors(apiFieldName: StartupFormFieldValue, value: string | string[]) {
  const errors = [];
  const fieldDescriptors = FIELDS.find(item => item.title === getFormFieldName(apiFieldName))
  const joinedValue = Array.isArray(value) ? value.join(',') : value;
  
  if (fieldDescriptors?.required && joinedValue.length <= 0) {
    errors.push(ERROR_MESSAGES.REQUIRED)
  }

  if (apiFieldName === FIELD_API_NAMES.tags && value.length < 2) {
    errors.push(ERROR_MESSAGES.TOO_FEW_TAGS);
  }

  if (joinedValue.length > 0 && joinedValue.length < constraints[apiFieldName].MIN_SYMBOL_COUNT) {
    errors.push(ERROR_MESSAGES.TOO_SHORT(constraints[apiFieldName].MIN_SYMBOL_COUNT))
  }

  if ((Array.isArray(value) ? value : [value]).some(valueItem => valueItem.length > constraints[apiFieldName].MAX_SYMBOL_COUNT)) {
    errors.push(ERROR_MESSAGES.TOO_LONG(constraints[apiFieldName].MAX_SYMBOL_COUNT))
  }

  return errors;
}

export function userFormFieldErrors(fieldName: keyof User, value: string) {
  const errors = [];
  const filteredName = fieldName as keyof Omit<User, 'email' | 'avatar' | 'phone'>;

  if (!(fieldName in userFormConstraints)) return [];

  if (value.length < +(userFormConstraints[filteredName].MIN_SYMBOL_COUNT ?? -1)) {
    errors.push(ERROR_MESSAGES.TOO_SHORT(+(userFormConstraints[filteredName].MIN_SYMBOL_COUNT || 0)))
  }

  if (value.length > +(userFormConstraints[filteredName].MAX_SYMBOL_COUNT ?? -1)) {
    errors.push(ERROR_MESSAGES.TOO_LONG(+(userFormConstraints[filteredName].MAX_SYMBOL_COUNT || 0)))
  }

  if (
    userFormConstraints[filteredName].APPROPRIATE_FORMAT && !!value &&
    !(new RegExp(`${userFormConstraints[filteredName].APPROPRIATE_FORMAT}`)).test(value)
  ) {
    errors.push(ERROR_MESSAGES.WRONG_PHONE_FORMAT)
  }

  return errors;
}

export function displayTimerTime(elapsedSeconds: number) {
  const paddedMinutes = (Math.floor(elapsedSeconds / 60)).toString().padStart(2, '0');
  const paddedSeconds = (elapsedSeconds - 60 * Math.floor(elapsedSeconds / 60)).toString().padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

export const generatePDF = async (elem: HTMLElement) => {
  const canvas = await html2canvas(elem, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  let heightLeft = imgHeight;
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('startup-analysis.pdf');
}
