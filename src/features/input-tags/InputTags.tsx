import { constraints } from "@/shared/constants/general";
import { squishText } from "@/shared/lib/utils";
import { useFormStore } from "@/shared/store/form";
import { FIELD_API_NAMES, StartupForm } from "@/shared/types/form";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Input } from "@/shared/ui/input"
import { useFormikContext } from "formik";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const InputTags = ({ className }: {className?: string}) => {
  const { setFormValue } = useFormStore();
  const formik = useFormikContext<StartupForm>();
  const [displayCross, setDisplayCross] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEnterNewTag: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = (e.target as HTMLInputElement).value;

    if (
        value &&
        e.key === 'Enter' &&
        inputRef.current &&
        document.activeElement === inputRef.current &&
        !formik.values.tags?.includes(value)
    ) {
      if (value.length < constraints.tags.MIN_SYMBOL_COUNT || value.length > constraints.tags.MAX_SYMBOL_COUNT) {
        toast.error(`Минимальная длина тега - ${constraints.tags.MIN_SYMBOL_COUNT}, максимальная - ${constraints.tags.MAX_SYMBOL_COUNT}`)
        return;
      }
      formik.setFieldValue(FIELD_API_NAMES.tags, [...formik.values.tags, value]);
      setFormValue(FIELD_API_NAMES.tags, [...formik.values.tags, value]);
      inputRef.current.value = '';
    }
  }

  const handleDeleteTag = (tagName: string) => {
    formik.setFieldValue(FIELD_API_NAMES.tags, [...(formik.values.tags?.filter(tag => tag !== tagName) ?? [])]);
    setDisplayCross('');
  }

  return (
    <div className={`flex flex-col gap-4 px-[5vw] lg:px-2 ${formik.values.tags?.length ? 'mb-5': ''} ${className} mb-0.5`}>
      <div className="flex items-center h-min gap-2">
        <span className="text-ai-lg font-semibold h-min flex">Теги:<p className="text-danger">*</p></span>
        <Input ref={inputRef} className="border-none" onKeyDown={handleEnterNewTag} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {formik.values.tags?.map((tag, i) => (
          <Badge
            key={`${tag}-${i}`}
            onMouseOver={() => setDisplayCross(tag)}
            onFocus={() => setDisplayCross(tag)}
            onBlur={() => setDisplayCross('')}
            onMouseLeave={() => setDisplayCross('')}
            className="relative line-clamp-1 bg-help text-[1rem] text-text-blue px-7 rounded-full font-semibold flex gap-2 cursor-default select-none active:scale-105 hover:scale-105"
          >
            {squishText(tag)}
            {displayCross === tag && (
              <Button onClick={() => handleDeleteTag(tag)} className="absolute right-2 [&&]:p-0 h-fit cursor-pointer">
                <Icon type="plus" className="rotate-45 stroke-danger" />
              </Button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  )
}