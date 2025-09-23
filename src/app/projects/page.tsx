// app/projects/page.tsx
"use client";

import React, { Suspense } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProjectsList from "@/components/Project/ProjectsList";
import { useGlobalContext } from "@/context/GlobalContext";

// small fallback while the ProjectsList hydrates / loads client-only hooks
function ProjectsFallback() {
  return (
    <div className="w-full py-20 grid place-items-center">
      <div className="text-center">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="h-40 w-[min(700px,90%)] bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { closeMenu } = useGlobalContext();

  return (
    <MaxWidthWrapper onClick={closeMenu}>
      <Suspense fallback={<ProjectsFallback />}>
        <ProjectsList />
      </Suspense>
    </MaxWidthWrapper>
  );
}
