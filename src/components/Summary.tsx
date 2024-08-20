import TypewriterEffect from "./TypewriterEffect";

export default function Summary() {
  return (
    <div className="h-full flex flex-1 items-center justify-center gap-4">
      <div className="flex-1">
        <h1 className="text-6xl mb-8">
          <TypewriterEffect text={"Hi, I'm Iyanu"} />
          <span className="animate-pulse ease-in-out duration-300">_</span>
        </h1>
        <p className="text-lg">
          A highly motivated and skilled software engineer enthusiast. Eager to
          leverage problem-solving and critical thinking skills honed through
          academic coursework and personal development. Dedicated to achieving
          the highest professional standards in the field of software, through
          continuous learning and development.
        </p>
      </div>
    </div>
  );
}
