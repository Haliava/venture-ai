import { squishText } from "@/shared/lib/utils";
import { FIELD_API_NAMES, StartupForm } from "@/shared/types/form";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input"
import { useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";

export const InputTags = ({ className }: {className?: string}) => {
  const formik = useFormikContext<StartupForm>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState(formik.values.tags);

  const handleEnterNewTag = (e: KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value;

    if (value && e.key === 'Enter' && inputRef.current && document.activeElement === inputRef.current) {
      console.log(formik.values.tags, value, 'values vaue')
      formik.setFieldValue(
        FIELD_API_NAMES.tags, [...formik.values.tags, value]
      )
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    console.log(formik.values.tags)
    setTags(formik.values.tags);
  }, [formik.values.tags])

  useEffect(() => {
    window.addEventListener('keydown', handleEnterNewTag);
    return () => window.removeEventListener('keydown', handleEnterNewTag);
  }, [])

  return (
    <div className={`flex flex-col gap-4 px-[5vw] ${tags.length ? 'mb-5': ''} ${className}`}>
      <div className="flex items-center h-min gap-2">
        <p className="text-[32px] font-semibold h-min">Теги:</p>
        <Input ref={inputRef} className="border-none" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <Badge className="line-clamp-1 bg-help text-text-blue text-[16px] px-7 rounded-full font-semibold">
            {squishText(tag)}
          </Badge>
        ))}
      </div>
    </div>
  )
}