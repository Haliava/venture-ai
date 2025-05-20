import { Icon } from "@/shared/ui/icon"
import { Input } from "@/shared/ui/input"

export const ProjectSearchBar = () => {
  return (
    <div className="flex gap-1">
      <Icon type="magnifyingGlass" className="size-4" />
      <p className="font-semibold text-ai-md">Найти</p>
      <Input className="bg-header" />
    </div>
  )
}