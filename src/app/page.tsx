import React from 'react';
import IconCloud from "@/components/magicui/icon-cloud";
import TypingAnimation from "@/components/magicui/typing-animation";
import WordPullUp from "@/components/magicui/word-pull-up";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];
import Ripple from "@/components/magicui/ripple";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly bg-black min-h-screen text-white">
      
      <div className="flex flex-col justify-center  w-full md:w-2/5">
            <TypingAnimation
      className=" font-bold text-white text-8xl text-start dark:text-white"
      text="DSA"
    />
        <WordPullUp
      className="text-white text-start"
      words="Data Structure And "/>
      <WordPullUp
      className="text-white text-start"
      words="Algorithms"/>
      </div>
      <div className="flex flex-col justify-center items-center  w-full md:w-2/5">
        <IconCloud iconSlugs={slugs} />
      </div>
      
    </div>
  );
};

export default Page;
