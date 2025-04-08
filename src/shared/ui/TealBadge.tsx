import { Badge, BadgeProps } from "./badge"

export type TealBadgeProps = BadgeProps & {
  content: string;
} 

export const TealBadge = ({ content, ...props }: TealBadgeProps) => {
  return (
    <Badge className="bg-blue-dark px-5 py-0.5" {...props}>{content}</Badge>
  )
}