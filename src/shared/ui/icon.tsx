import { Icon as TIcon } from "../types/icon"
import icons from '@/shared/assets/icons';

export type IconProps = {
  type: TIcon
} & React.SVGProps<SVGSVGElement>

export const Icon = ({ type, ...props }: IconProps) => {
  const IconCoponent = icons[type]

  return <IconCoponent {...props} />
}