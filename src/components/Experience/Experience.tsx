"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

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
];

function Experience() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <Carousel setApi={setApi} className="w-full max-w-3xl">
        <CarouselContent>
          {experiences.map((experience, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-3xl font-semibold">
                    {experience.position}
                  </h3>
                  <p className="text-lg text-gray-500">@{experience.company}</p>
                  <p className="text-lg text-gray-500">
                    {experience.year_range}
                  </p>
                  <p>{experience.summary}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

export default Experience;
