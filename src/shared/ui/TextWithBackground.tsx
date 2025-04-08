import { HTMLAttributes, ReactNode } from "react"

export type TextWithBackgroundProps = {
  bgColor?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>

export const TextWithBackground = ({bgColor, children, ...props}: TextWithBackgroundProps) => {
  return (
    <span {...props} className={`bg-${bgColor ? bgColor: 'bg-accent'} rounded-xl p-3.5`} >
      {children}
    </span>
  )
}