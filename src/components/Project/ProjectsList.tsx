import Link from "next/link";
import React, { useEffect, useState } from "react";
import Underline from "../Underline";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  { name: "Casecobra", url: "https://casecobra-ai-ruby.vercel.app/", thumbnail: "/assets/project5.png" },
  { name: "CocktailDB", url: "https://aicocktaildb.netlify.app/", thumbnail: "/assets/project1.png" },
  { name: "Admin Dashboard", url: "https://ai-admin-dash-ui.netlify.app/", thumbnail: "/assets/project2.png" },
  { name: "Food Ordering app", url: "https://ai-food-ordering-app.vercel.app/", thumbnail: "/assets/project3.png" },
  { name: "Airbnb Clone", url: "https://airbnb-clone-5f1eb9.netlify.app/", thumbnail: "/assets/project4.png" },
  { name: "Student Management System (WIP)" },
  { name: "Kuda Clone (WIP)" },
];

export default function ProjectsList() {
  const [currentPage, setCurrentPage] = useState(1);

  // If you want full pages on lg (4 cols x 3 rows) set this to 12.
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

      {/* Warning banner directly under the underline */}
      <div className="mt-4 px-4 flex justify-center">
        <div
          className="w-full max-w-4xl rounded-md border px-4 py-2 text-center text-sm font-medium
                     bg-yellow-100 text-yellow-800 border-yellow-200
                     dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700"
          role="status"
          aria-live="polite"
        >
          Some sites may be down — contact me to reactivate them.
        </div>
      </div>

      {/* MOBILE: vertical stacked column (visible on screens smaller than 'sm') */}
      <div className="sm:hidden mt-6 px-4 flex flex-col gap-6">
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            className={cn(
              "w-full rounded-md overflow-hidden border-4 border-[#bbb] hover:border-[#4b6cc1] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4b6cc1]",
              { "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail }
            )}
            aria-label={`Open ${project.name}`}
          >
            {/* fixed height so items look consistent while scrolling */}
            <div
              className="w-full h-64 relative"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute left-4 bottom-4 text-lg font-semibold text-white drop-shadow">
                {project.name}
              </span>
              {!project.url && (
                <span className="absolute right-4 top-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  WIP
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP / TABLET GRID: hidden on mobile (sm and up) */}
      <div className="hidden sm:grid gap-8 place-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 mt-6">
        {pagination(currentPage).map((project, index) => (
          <Link
            key={index}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            className={cn(
              "relative rounded-md overflow-hidden border-4 border-[#bbb] hover:border-[#4b6cc1] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4b6cc1]",
              {
                "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail,
              }
            )}
            aria-label={`Open ${project.name}`}
          >
            {/* aspect ratio spacer so cards stay consistent */}
            <div className="w-full h-0 pb-[100%] md:pb-[120%] lg:pb-[100%]" />
            <div
              className="absolute inset-0"
              style={
                project.thumbnail
                  ? {
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                  : undefined
              }
            />
            <span className="absolute left-3 bottom-3 text-lg md:text-2xl font-semibold text-white drop-shadow">
              {project.name}
            </span>
            {!project.url && (
              <span className="absolute right-3 top-3 bg-black/60 text-white text-xs px-2 py-1 rounded">WIP</span>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination controls (only for sm and up; hidden on mobile where we use vertical stacked list) */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
