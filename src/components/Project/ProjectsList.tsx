import Link from "next/link";
import React from "react";
import Underline from "../Underline";

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
];

export default function ProjectsList() {
  return (
    <div>
      <div className="max-md:grid max-md:place-items-center">
        <h1 className="text-4xl uppercase text-center md:text-left">
          Projects
        </h1>
        <Underline className="max-md:w-1/3" />
      </div>
      <div className="grid lg:grid-flow-row gap-16 place-items-center max-md:grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-1 px-8">
        {projects.map((project, index) => (
          <Link
            key={index}
            className={`flex-1 grayscale hover:grayscale-0 border-4 border-[#bbb] rounded-md w-72 h-96 bg-cover relative hover:text-[#4b6cc1]`}
            href={project.url}
            style={{
              backgroundImage: `url(${project.thumbnail})`,
            }}
            target="_blank"
          >
            <span className="absolute right-2 bottom-2 text-4xl font-bold">
              {project.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
