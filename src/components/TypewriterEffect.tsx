"use client";
import { useEffect, useState } from "react";

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Typing speed: 100 milliseconds per character

    return () => clearInterval(interval);
  }, [text]);

  return <span className=" ease-in-out duration-300">{displayText}</span>;
};
export default TypewriterEffect;
