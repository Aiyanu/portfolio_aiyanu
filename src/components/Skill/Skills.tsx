import SkillList from "./SkillList";

import { FaPython, FaJava, FaReact, FaAws, FaGitAlt } from "react-icons/fa";
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
  SiGo,
} from "react-icons/si";
import Underline from "../Underline";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: <FaPython size={65} /> },
      { name: "Java", icon: <FaJava size={65} /> },
      { name: "Golang", icon: <SiGo size={65} /> },
      { name: "JavaScript", icon: <SiJavascript size={65} /> },
      { name: "TypeScript", icon: <SiTypescript size={65} /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: <SiHtml5 size={65} /> },
      { name: "CSS", icon: <SiCss3 size={65} /> },
      { name: "ReactJS", icon: <FaReact size={65} /> },
      { name: "NextJS", icon: <SiNextdotjs size={65} /> },
      { name: "Styled Components", icon: <SiStyledcomponents size={65} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={65} /> },
      { name: "Redux", icon: <SiRedux size={65} /> },
      { name: "React Query", icon: <SiReactquery size={65} /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "ExpressJS", icon: <SiExpress size={65} /> },
      { name: "NestJS", icon: <SiNestjs size={65} /> },
      { name: "Gin", icon: <SiGin size={65} /> },
      { name: "Flask", icon: <SiFlask size={65} /> },
      { name: "Django", icon: <SiDjango size={65} /> },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: <SiMysql size={65} /> },
      { name: "PostgresSQL", icon: <SiPostgresql size={65} /> },
      { name: "MongoDB", icon: <SiMongodb size={65} /> },
      { name: "PrismaORM", icon: <SiPrisma size={65} /> },
      { name: "TypeORM", icon: <SiTypeorm size={65} /> }, // GraphQL icon as placeholder
      { name: "Mongoose", icon: <SiMongoose size={65} /> }, // MongoDB icon as placeholder
      { name: "Sequelize", icon: <SiSequelize size={65} /> },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Git", icon: <FaGitAlt size={65} /> },
      { name: "AWS", icon: <FaAws size={65} /> },
    ],
  },
];

export default function Skills() {
  return (
    <div>
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
