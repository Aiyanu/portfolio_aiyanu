import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const SkillList = ({
  skills,
}: {
  skills: { name: string; icon: React.JSX.Element }[];
}) => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {skills.map((skill, index) => (
        <HoverCard key={index + skill.name}>
          <HoverCardTrigger>
            <div className="bg-blue-400/65 rounded-full px-3 cursor-default hover:bg-blue-300/90">
              {skill.name}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-24">{skill.icon}</HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default SkillList;
