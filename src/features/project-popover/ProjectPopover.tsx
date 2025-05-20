import { Project } from "@/shared/types/projects";
import { Button } from "@/shared/ui/button"
import { Icon } from "@/shared/ui/icon"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"

export type ProjectPopover = {
  project: Pick<Project, 'id'>;
}

export const ProjectPopover = () => {
  const handleSaveAsPDF = () => {}
  const handleShare = () => {}
  const handleEditTitle = () => {}
  const handleEditDescription = () => {}
  const handleChangeProjectImage = () => {}
  const handleDeleteProject = () => {}

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <Icon type="ellipsis" color="rgba(217, 217, 217, 1)" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        <Button variant="ghost" onClick={handleSaveAsPDF}>
          <p className="font-normal text-ai-sm">Сохранить в PDF</p>
        </Button>
        <Button variant="ghost" onClick={handleShare}>
          <p className="font-normal text-ai-sm">Поделиться</p>
        </Button>
        <Button variant="ghost" onClick={handleEditTitle}>
          <p className="font-normal text-ai-sm">Переименовать</p>
        </Button>
        <Button variant="ghost" onClick={handleEditDescription}>
          <p className="font-normal text-ai-sm">Добавить описание</p>
        </Button>
        <Button variant="ghost" onClick={handleChangeProjectImage}>
          <p className="font-normal text-ai-sm">Изменить обложку</p>
        </Button>
        <Button variant="ghost" onClick={handleDeleteProject}>
          <p className="font-normal text-ai-sm">Удалить проект</p>
        </Button>
      </PopoverContent>
    </Popover>
  )
}