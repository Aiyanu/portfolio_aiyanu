import Link from "next/link";
import React, { useEffect, useState } from "react";
import Underline from "../Underline";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "Casecobra",
    url: "https://casecobra-ai-ruby.vercel.app/",
    thumbnail: "/assets/project5.png",
  },
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
    name: "Student Management System (WIP)",
  },
  {
    name: "Kuda Clone (WIP)",
  },
];

export default function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);

  // desktop pagination: set this to fill the grid if you want (e.g. 12 for md:3 x lg:4 rows)
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const pagination = (page: number = 1) => {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = page * projectsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-4xl uppercase text-center md:text-left">Projects</h1>
        <Underline className="max-md:w-1/6 w-1/12" />
      </div>

      {/* MOBILE: single horizontal scroll row (visible on screens smaller than 'sm') */}
      <div className="sm:hidden mt-6 px-4">
        <div className="flex gap-4 overflow-x-auto py-2">
          {projects.map((project, idx) => (
            <Link
              key={idx}
              href={project.url || "#"}
              target={project.url ? "_blank" : undefined}
              className={cn(
                "flex-shrink-0 rounded-md overflow-hidden border-4 border-[#bbb] hover:border-[#4b6cc1] transition",
                {
                  "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail,
                }
              )}
              style={
                project.thumbnail
                  ? {
                    width: "18rem", // w-72
                    height: "24rem", // h-96
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                  : { width: "18rem", height: "24rem" }
              }
              aria-label={project.name}
            >
              <span className="absolute left-3 bottom-3 text-lg font-semibold text-white drop-shadow">
                {project.name}
              </span>
              {!project.url && (
                <span className="absolute right-3 top-3 bg-black/60 text-white text-xs px-2 py-1 rounded">WIP</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* DESKTOP / TABLET GRID: hidden on mobile (sm and up) */}
      <div className="hidden sm:grid gap-8 place-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 mt-6">
        {pagination(currentPage).map((project, index) => (
          <Link
            key={index}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            className={cn(
              "relative rounded-md overflow-hidden border-4 border-[#bbb] hover:border-[#4b6cc1] transition",
              {
                "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail,
              }
            )}
            aria-label={project.name}
            style={
              project.thumbnail
                ? {
                  backgroundImage: `url(${project.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : undefined
            }
          >
            {/* aspect ratio spacer so cards stay consistent */}
            <div className="w-full h-0 pb-[100%] md:pb-[120%] lg:pb-[100%]" />
            <span className="absolute left-3 bottom-3 text-lg md:text-2xl font-semibold text-white drop-shadow">
              {project.name}
            </span>
            {!project.url && (
              <span className="absolute right-3 top-3 bg-black/60 text-white text-xs px-2 py-1 rounded">WIP</span>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination controls (only for sm and up; hidden on mobile where we use the horizontal scroller) */}
      <div className="hidden sm:flex justify-center mt-8">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
