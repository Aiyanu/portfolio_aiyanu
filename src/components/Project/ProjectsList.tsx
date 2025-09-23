"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Underline from "../Underline";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectType = "frontend" | "backend";

type Project = {
  name: string;
  url?: string;
  thumbnail?: string;
  type: ProjectType;
};

const projects: Project[] = [
  { name: "Casecobra", url: "https://casecobra-ai-ruby.vercel.app/", thumbnail: "/assets/project5.png", type: "frontend" },
  { name: "CocktailDB", url: "https://aicocktaildb.netlify.app/", thumbnail: "/assets/project1.png", type: "frontend" },
  { name: "Admin Dashboard", url: "https://ai-admin-dash-ui.netlify.app/", thumbnail: "/assets/project2.png", type: "frontend" },
  { name: "Food Ordering app", url: "https://ai-food-ordering-app.vercel.app/", thumbnail: "/assets/project3.png", type: "frontend" },
  { name: "Airbnb Clone", url: "https://airbnb-clone-5f1eb9.netlify.app/", thumbnail: "/assets/project4.png", type: "frontend" },
  { name: "Kuda Clone API", url: "https://kuda-aiyanu.onrender.com/api-docs/", type: "backend", thumbnail: "/assets/project6.png" },
  { name: "Student Management System (WIP)", type: "backend" },
];

export default function ProjectsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Tab comes from ?tab=frontend | backend. Default to frontend
  const initialTab = (searchParams?.get("tab") === "backend" ? "backend" : "frontend") as ProjectType;
  const [tab, setTab] = useState<ProjectType>(initialTab);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Sync local tab when user navigates with browser buttons or manually changes URL
  useEffect(() => {
    const qp = searchParams?.get("tab");
    setTab(qp === "backend" ? "backend" : "frontend");
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  // Filtered projects list by active tab
  const filtered = useMemo(() => projects.filter((p) => p.type === tab), [tab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / projectsPerPage));

  const pagination = (page: number = 1) => {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = page * projectsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, tab]);

  // Replace the current history entry (no new entry). Also preserve other query params.
  const setTabAndReplaceUrl = (next: ProjectType) => {
    // Update local state immediately for responsive UI
    setTab(next);
    setCurrentPage(1);

    const existing = new URLSearchParams(Array.from((searchParams ?? new URLSearchParams()).entries()));
    existing.set("tab", next);
    const qs = existing.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;

    // replace -> no new history entry
    router.replace(newUrl);
  };

  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-4xl uppercase text-center md:text-left">Projects</h1>
        <Underline className="max-md:w-1/6 w-1/12" />
      </div>

      {/* Warning banner */}
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

      {/* Tabs */}
      <div className="mt-6 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div role="tablist" aria-label="Project categories" className="inline-flex rounded-md bg-transparent p-1">
          <button
            role="tab"
            aria-selected={tab === "frontend"}
            onClick={() => setTabAndReplaceUrl("frontend")}
            className={cn(
              "px-4 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              tab === "frontend"
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "bg-transparent text-gray-600 dark:text-gray-300"
            )}
            type="button"
          >
            Frontend
          </button>

          <button
            role="tab"
            aria-selected={tab === "backend"}
            onClick={() => setTabAndReplaceUrl("backend")}
            className={cn(
              "ml-2 px-4 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              tab === "backend"
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "bg-transparent text-gray-600 dark:text-gray-300"
            )}
            type="button"
          >
            Backend
          </button>
        </div>

        {/* small helper text */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <strong className="text-gray-800 dark:text-gray-200">{tab}</strong> projects — {filtered.length} total
        </div>
      </div>

      {/* MOBILE: stacked list */}
      <div className="sm:hidden mt-6 px-4 flex flex-col gap-6">
        {filtered.map((project, idx) => (
          <Link
            key={idx}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            onClick={() => console.log("project clicked:", project.name)}
            className={cn(
              "group relative rounded-md overflow-hidden border-4 border-[#bbb] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4b6cc1] hover:border-[#4b6cc1]",
              { "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail }
            )}
            aria-label={`Open ${project.name}`}
          >
            <div className="relative w-full h-64">
              {project.thumbnail ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnail})` }}
                  aria-hidden="true"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
              )}

              {/* overlay now uses opacity transition and will fade OUT on hover */}
              <div className="absolute inset-0 bg-black opacity-90 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute left-3 bottom-3 z-20 pr-3">
                <h3 className="transform text-white text-lg md:text-2xl font-extrabold drop-shadow-lg truncate max-w-[70%] transition-transform duration-200 group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:text-[#4b6cc1] group-focus:text-[#4b6cc1]">
                  {project.name}
                </h3>
              </div>

              {!project.url && (
                <span className="absolute right-3 top-3 z-20 bg-black/75 text-white text-xs px-2 py-1 rounded">WIP</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP / TABLET GRID */}
      <div className="hidden sm:grid gap-8 place-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8 mt-6">
        {pagination(currentPage).map((project, index) => (
          <Link
            key={index}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            onClick={() => console.log("project clicked:", project.name)}
            className={cn(
              "group relative rounded-md overflow-hidden border-4 border-[#bbb] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4b6cc1] hover:border-[#4b6cc1]",
              {
                "bg-gray-800/35 dark:bg-gray-300/50": !project.thumbnail,
              }
            )}
            aria-label={`Open ${project.name}`}
          >
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
            {/* overlays fade out on hover to reveal image */}
            <div className="absolute inset-0 bg-black opacity-90 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

            <div className="absolute left-3 bottom-3 z-20 pr-3">
              <h3 className="transform text-white text-lg md:text-2xl font-extrabold drop-shadow-lg truncate transition-transform duration-200 group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:text-[#4b6cc1] group-focus:text-[#4b6cc1]">
                {project.name}
              </h3>
            </div>

            {!project.url && (
              <span className="absolute right-3 top-3 bg-black/75 text-white text-xs px-2 py-1 rounded">WIP</span>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination controls (hidden on mobile) */}
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
