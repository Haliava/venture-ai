import { squishText } from "@/shared/lib/utils";
import { useFormStore } from "@/shared/store/form";
import { FIELD_API_NAMES, StartupForm } from "@/shared/types/form";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input"
import { useFormikContext } from "formik";
import { useRef } from "react";

export const InputTags = ({ className }: {className?: string}) => {
  const { setFormValue } = useFormStore();
  const formik = useFormikContext<StartupForm>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEnterNewTag: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = (e.target as HTMLInputElement).value;

    if (value && e.key === 'Enter' && inputRef.current && document.activeElement === inputRef.current) {
      formik.setFieldValue(FIELD_API_NAMES.tags, [...formik.values.tags, value]);
      setFormValue(FIELD_API_NAMES.tags, [...formik.values.tags, value]);
      inputRef.current.value = '';
    }
  }

  return (
    <div className={`flex flex-col gap-4 px-[5vw] lg:px-2 ${formik.values.tags.length ? 'mb-5': ''} ${className} mb-0.5`}>
      <div className="flex items-center h-min gap-2">
        <p className="text-ai-lg font-semibold h-min">Теги:</p>
        <Input ref={inputRef} className="border-none" onKeyDown={handleEnterNewTag} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {formik.values.tags.map((tag, i) => (
          <Badge key={`${tag}-${i}`} className="line-clamp-1 bg-help text-[1rem] text-text-blue px-7 rounded-full font-semibold">
            {squishText(tag)}
          </Badge>
        ))}
      </div>
    </div>
  )
}