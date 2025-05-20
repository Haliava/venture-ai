import FormAccordion from '@/features/form-accordion';
import InputTags from '@/features/input-tags';
import { defaultFormValues, fieldApiNameToDisplayName, FIELDS } from '@/shared/constants/form';
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
import { useAnalyst } from '@/shared/hooks/useAnalyst';

export const Form = ({ className }: { className?: string }) => {
  const { askAnalyst, isAnswerLoading } = useAnalyst();
  const { values: storeValues, setValues: setStoreValues } = useFormStore();
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

  const handleSubmitForm = (
    values: StartupFormFieldValues,
  ) => {
    askAnalyst(values);
  }

  const handleAccordionValueChange = (values: string[]) => {
    setOpenAccordionItems(values)
  }

  // useEffect(() => {
  //   if (!localStorage.getItem('form-values')) return;
  //   setStoreValues(JSON.parse(localStorage.getItem('form-values')!))
  // }, [localStorage.getItem('form-values')])

  return (
    <Formik
      initialValues={storeValues}
      onSubmit={handleSubmitForm}
      validate={validateForm}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      enableReinitialize
    >
      {(formik) => {
        const { setValues } = formik;

        const resetForm = () => {
          setValues(defaultFormValues);
          setStoreValues(defaultFormValues);
        }

        return (
          <div className={`${className} lg:rounded-[1.5rem] lg:bg-bg-grey`}>
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
            <div className='relative flex flex-wrap items-center px-[5vw] gap-5 lg:flex lg:px-0'>
              <Button
                onClick={() => {
                  console.log(formik.errors)
                  formik.submitForm()
                }}
                disabled={isAnswerLoading}
                type="submit"
                className='cursor-pointer bg-danger hover:bg-danger-secondary py-[1.5rem] px-[1rem] text-ai-lg rounded-[10px]'
              >
                <p className='font-bold text-ai-lg lg:text-ai-md lg:font-medium'>Анализировать</p>
              </Button>
              <ClearFieldsButton resetForm={resetForm} />
              <RecordAudio className="lg:absolute lg:right-0" />
            </div>
            {Object.values(formik.errors).filter(Boolean).length > 0 && (
              <div className='mt-5'>
                {Object.entries(formik.errors).map(([k, v]) => {
                  const errors = Array.isArray(v) ? v : [v];
                  return (
                    <>
                      <p className='text-danger'>{fieldApiNameToDisplayName[k as keyof StartupFormFieldValues]}:</p>
                      {errors.map(error => (
                        <p className='text-danger'>{error}</p>
                      ))}
                      <br />
                    </>
                  )
                })}
              </div>
            )}
            <FeedbackForm className="mt-5 lg:absolute lg:left-0 lg:m-auto lg:py-[5vmin]" starClassName="size-10" />
          </div>
        )
      }}
    </Formik>
  )
}