import SkillList from "./SkillList";

import { FaPython, FaJava, FaReact, FaAws, FaGitAlt, FaGoogle } from "react-icons/fa";
import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiStyledcomponents,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiSequelize,
  SiFlask,
  SiDjango,
  SiJavascript,
  SiTypeorm,
  SiMongoose,
  SiGin,
  SiReactquery,
  SiGo, SiSpringboot
} from "react-icons/si";
import Underline from "../Underline";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: <FaPython size={12} /> },
      { name: "Java", icon: <FaJava size={12} /> },
      { name: "Golang", icon: <SiGo size={12} /> },
      { name: "JavaScript", icon: <SiJavascript size={12} /> },
      { name: "TypeScript", icon: <SiTypescript size={12} /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: <SiHtml5 size={12} /> },
      { name: "CSS", icon: <SiCss3 size={12} /> },
      { name: "ReactJS", icon: <FaReact size={12} /> },
      { name: "NextJS", icon: <SiNextdotjs size={12} /> },
      { name: "Styled Components", icon: <SiStyledcomponents size={12} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={12} /> },
      { name: "Redux", icon: <SiRedux size={12} /> },
      { name: "Tanstack Query", icon: <SiReactquery size={12} /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "ExpressJS", icon: <SiExpress size={12} /> },
      { name: "NestJS", icon: <SiNestjs size={12} /> },
      { name: "Gin", icon: <SiGin size={12} /> },
      { name: "Flask", icon: <SiFlask size={12} /> },
      { name: "Django", icon: <SiDjango size={12} /> },
      { name: "Spring Boot", icon: <SiSpringboot size={12} /> },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: <SiMysql size={12} /> },
      { name: "PostgresSQL", icon: <SiPostgresql size={12} /> },
      { name: "MongoDB", icon: <SiMongodb size={12} /> },
      { name: "PrismaORM", icon: <SiPrisma size={12} /> },
      { name: "TypeORM", icon: <SiTypeorm size={12} /> }, // GraphQL icon as placeholder
      { name: "Mongoose", icon: <SiMongoose size={12} /> }, // MongoDB icon as placeholder
      { name: "Sequelize", icon: <SiSequelize size={12} /> },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Git", icon: <FaGitAlt size={12} /> },
      { name: "AWS", icon: <FaAws size={12} /> },
      { name: "Google Cloud", icon: <FaGoogle size={12} /> },
    ],
  },
];

export default function Skills() {
  return (
    <div className="">
      <h2 className="text-4xl space-y-4">Skills</h2>
      <Underline />
      <div className="space-y-4">
        {skills.map((skill, index) => {
          return (
            <div className="space-y-2" key={index}>
              <p className="text-lg">{skill.category}</p>
              <SkillList skills={skill.items} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
