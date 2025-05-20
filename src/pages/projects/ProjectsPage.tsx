import ProjectSearchBar from "@/features/project-search-bar";
import MyProjects from "@/widgets/my-projects";

export const ProjectsPage = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <ProjectSearchBar />
      <MyProjects />
    </div>
  );
}