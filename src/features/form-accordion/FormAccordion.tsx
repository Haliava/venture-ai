import { checkForFieldForErrors, getApiFormFieldNameFromFieldDisplayName } from "@/shared/lib/utils";
import { StartupForm, StartupFormField } from "@/shared/types/form";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Icon } from "@/shared/ui/icon";
import { Textarea } from "@/shared/ui/textarea";
import { useFormikContext } from "formik";
import { useState } from "react";

export type FormAccordionProps = StartupFormField & {
  num?: string | number;
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FormAccordion = ({
  num,
  title,
  description,
  required,
  setValues
}: FormAccordionProps) => {
  const formik = useFormikContext<StartupForm>();
  const apiFieldName = getApiFormFieldNameFromFieldDisplayName(title);
  const [isValid, setIsValid] = useState(true);

  const handleChevronClick = () => {
    setValues(prev => prev.filter(openItem => openItem !== title));
  }

  const handleTextareaValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldValue(apiFieldName, e.target.value, true);
    setIsValid(checkForFieldForErrors(e.target.value))
  }

  return (
    <AccordionItem className="px-[5vw]" value={title}>
      <AccordionTrigger className="text-2xl font-semibold flex items-center">
        <div className="flex flex-row justify-between w-full">
          <p>{`${num}. ${title}${required ? '*': ''}`}</p>
          <Icon
            type="checkmark"
            className={`self-center size-8 ${formik.values[apiFieldName].length > 0 && isValid ? 'fill-success' : 'fill-check'}`}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-3.5">
          <p className="text-check text-[14px] font-medium">{description}</p>
          <div>
            <Textarea
              className={`${formik.errors[apiFieldName] ? 'border-danger' : 'border-none'} active:border-none h-[18vh]`}
              value={formik.values[apiFieldName]}
              onChange={handleTextareaValueChange}
            />
            {formik.errors[apiFieldName] && <p className="text-danger text-[14px] font-medium">{formik.errors[apiFieldName]}</p>}
          </div>
          <div className="flex justify-end">
            <Icon type="arrow" className="size-8" onClick={handleChevronClick} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}