import FormAccordion from '@/features/form-accordion';
import InputTags from '@/features/input-tags';
import { defaultFormValues, FIELDS } from '@/shared/constants/form';
import { formFieldErrors } from '@/shared/lib/utils';
import { useFormStore } from '@/shared/store/form';
import { FIELD_API_NAMES, StartupForm, StartupFormFieldValues } from '@/shared/types/form';
import { Accordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Formik } from 'formik';
import FeedbackForm from '../feedback-form';
import { useState } from 'react';
import ClearFieldsButton from '@/features/clear-fields-button';
import RecordAudio from '@/features/record-audio';

export const Form = () => {
  const { values: storeValues, setValues: setStoreValues, submitForm } = useFormStore();
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([])

  const validateForm = (formValues: StartupForm) => {
    const fieldErrors: {[K in keyof Partial<StartupFormFieldValues>]: string[]} = {};

    Object.entries(formValues).map(([key, value]) => {
      const errors = formFieldErrors(key as keyof StartupFormFieldValues, Array.isArray(value) ? value.join(','): value);
      if (errors.length) {
        fieldErrors[key as FIELD_API_NAMES] = errors;
      }
    })

    return fieldErrors;
  }

  const handleAccordionValueChange = (values: string[]) => {
    setOpenAccordionItems(values)
  }

  return (
    <Formik
      initialValues={storeValues}
      onSubmit={submitForm}
      validate={validateForm}
      enableReinitialize
    >
      {(formik) => {
        const { setValues } = formik;

        const resetForm = () => {
          setValues(defaultFormValues);
          setStoreValues(defaultFormValues);
        }

        return (
          <div>
            <InputTags />
            <Accordion
              type="multiple"
              value={openAccordionItems}
              onValueChange={handleAccordionValueChange}
              className="border-y-[1px] mb-5"
            >
              {FIELDS.map((item, i) => (
                <FormAccordion key={item.apiFieldName} num={i + 1} {...item} setValues={setOpenAccordionItems} />
              ))}
            </Accordion>
            <div className='flex flex-wrap items-center px-[5vw] gap-5'>
              <Button type="submit" className='bg-danger py-[1.5rem] px-[1rem] text-ai-lg rounded-[10px]'>
                <p className='font-bold text-ai-lg'>Анализировать</p>
              </Button>
              <ClearFieldsButton resetForm={resetForm} />
              <RecordAudio />
            </div>
            <FeedbackForm className="mt-5" starClassName="size-12" />
          </div>
        )
      }}
    </Formik>
  )
}