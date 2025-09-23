"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Underline from "../Underline";

const experiences = [
  {
    position: "Full Stack Developer",
    company: "Quadcore Technologies",
    year_range: "June 2022 – August 2022",
    summary:
      "Led the development of a Student Management System, focusing on relational databases to ensure data accuracy and retrieval speed. Designed and implemented the frontend interface, seamlessly integrating it with backend APIs. Empowered the team by providing training on web technologies (HTML, CSS, JavaScript). Additionally, modeled, developed, and documented backend APIs in close collaboration with the backend team, ensuring maintainability and clear communication.",
  },
  {
    position: "Frontend Developer",
    company: "Branddrive",
    year_range: "July 2023 – October 2023",
    summary:
      "Contributed to the development of web pages for the branddrive, vac-insight, and M8S apps, focusing on improving accessibility and user experience. Successfully integrated APIs, optimizing performance through effective data structures and state management strategies. Played a key role in enhancing team efficiency by creating clear API documentation and expanded skills in Fintech applications and monorepos.",
  },
  {
    position: "Full Stack Software Developer",
    company: "Xolani Health",
    year_range: "October 2024 – Current",
    summary:
      "Designed and implemented clean, responsive UI/UX components with React and Tailwind CSS for desktop and web applications.Built and maintained scalable backend services using Node.js, Express, and NestJS, with integration into AWS and Google Cloud.Implemented secure authentication and authorization systems to protect user data.Collaborated with cross-functional teams in an agile environment to deliver high-quality, user-centric software solutions.",
  },
];

function Experience() {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  // update count/current and listen to select events
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handler = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", handler);

    return () => {
      api.off?.("select", handler);
    };
  }, [api]);

  // autoplay logic
  useEffect(() => {
    if (!api) return;

    const advance = () => {
      const snaps = api.scrollSnapList();
      const len = snaps.length;
      if (len === 0) return;

      const selected = api.selectedScrollSnap();
      const nextIndex = (selected + 1) % len;

      // prefer scrollTo, fallback to scrollNext if available
      if (typeof api.scrollTo === "function") {
        api.scrollTo(nextIndex);
      } else if (typeof (api as any).scrollNext === "function") {
        (api as any).scrollNext();
      }
    };

    // start interval
    const start = () => {
      // clear any existing
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      autoplayRef.current = window.setInterval(() => {
        if (!hoverRef.current) advance();
      }, 3000);
    };

    start();

    // cleanup
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [api]);

  // pause on hover handlers attached to the container via refs
  // We'll attach onMouseEnter / onMouseLeave to the root carousel container below.

  return (
    <div className="flex flex-col items-center gap-4 py-12 ">
      <div className="ml-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Experience</h2>
        <Underline className="w-16 -mt-4" />
      </div>

      <div
        className="w-full"
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
      >
        <Carousel setApi={setApi} className="w-full max-w-fit">
          <CarouselContent>
            {experiences.map((experience, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-3xl font-semibold">{experience.position}</h3>
                    <p className="text-lg text-gray-500">@{experience.company}</p>
                    <p className="text-lg text-gray-500">{experience.year_range}</p>
                    <p className="text-sm">{experience.summary}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* arrows removed for automatic navigation */}
        </Carousel>
      </div>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

export default Experience;
