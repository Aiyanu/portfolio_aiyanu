"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProjectsList from "@/components/Project/ProjectsList";
import { useGlobalContext } from "@/context/GlobalContext";

const Projects = () => {
  const { closeMenu } = useGlobalContext();
  return (
    <MaxWidthWrapper onClick={closeMenu}>
      <ProjectsList />
    </MaxWidthWrapper>
  );
};

export default Projects;
