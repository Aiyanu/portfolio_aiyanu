import Link from "next/link";
import React, { useEffect, useState } from "react";
import Underline from "../Underline";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, LeafIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "CocktailDB",
    url: "https://aicocktaildb.netlify.app/",
    thumbnail: "/assets/project1.png",
  },
  {
    name: "Admin Dashboard",
    url: "https://ai-admin-dash-ui.netlify.app/",
    thumbnail: "/assets/project2.png",
  },
  {
    name: "Food Ordering app",
    url: "https://ai-food-ordering-app.vercel.app/",
    thumbnail: "/assets/project3.png",
  },
  {
    name: "Airbnb Clone",
    url: "https://airbnb-clone-5f1eb9.netlify.app/",
    thumbnail: "/assets/project4.png",
  },
  {
    name: "Casecobra",
    url: "https://casecobra-ai-ruby.vercel.app/",
    thumbnail: "/assets/project5.png",
  },
  {
    name: "Student Management System (WIP)",
    // url: "https://casecobra-ai-ruby.vercel.app/",
    // thumbnail: "/assets/project5.png",
  },
  {
    name: "Kuda Clone (WIP)",
    // url: "https://casecobra-ai-ruby.vercel.app/",
    // thumbnail: "/assets/project5.png",
  },
];

export default function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const pagination = (
    page: number = 1
  ): {
    name: string;
    url?: string;
    thumbnail?: string;
  }[] => {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = page * projectsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-4xl uppercase text-center md:text-left">
          Projects
        </h1>
        <Underline className="max-md:w-1/6 w-1/12" />
      </div>
      <div className="grid lg:grid-flow-row gap-16 place-items-center max-md:grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-1 px-8">
        {pagination(currentPage).map((project, index) => (
          <Link
            key={index}
            className={cn(
              `flex-1 grayscale hover:grayscale-0 border-4 border-[#bbb] rounded-md w-72 h-96 bg-cover relative hover:text-[#4b6cc1] hover:border-[#4b6cc1]`,
              {
                "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail,
              }
            )}
            href={project.url || "#"}
            style={{
              background: `${
                project.thumbnail ? `url(${project.thumbnail})` : ""
              }`,
            }}
            target="_blank"
          >
            <span className="absolute right-2 bottom-2 text-4xl font-bold">
              {project.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={handlePrevious}
          className="px-4 py-2 mx-2 rounded-md disabled:opacity-50"
          disabled={currentPage === 1}
          variant={"outline"}
        >
          <ArrowLeft />
        </Button>
        <span className="px-4 py-2 mx-2 text-xl">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          className="px-4 py-2 mx-2 rounded-md disabled:opacity-50"
          disabled={currentPage === totalPages}
          variant={"outline"}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
