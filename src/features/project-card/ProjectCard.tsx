import { Project } from "@/shared/types/projects"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import ProjectPopover from "../project-popover";

export type ProjectCardProps = {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { description, name, image } = project

  return (
    <Card className="bg-white rounded-[10px]">
      <CardHeader>
        <CardTitle className="flex justify-between p-1">
          <p className="text-ai-regular font-semibold text-text-blue">{name}</p>
          <ProjectPopover project={project} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img className="w-full h-full object-cover" src={image} />
      </CardContent>
      <CardFooter>
        <p className="text-ai-sm font-normal text-text-blue p-1">{description}</p>
      </CardFooter>
    </Card>
  )
}