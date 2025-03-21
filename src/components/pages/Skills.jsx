// src/components/Skills.js
import React from "react";

const Skills = () => {
  const skills = ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Node.js"];

  return (
    <section id="skills" className="my-8">
      <h2 className="text-3xl font-bold mb-4">Key Skills</h2>
      <ul className="flex flex-wrap">
        {skills.map((skill, index) => (
          <li key={index} className="bg-blue-100 text-blue-800 m-1 px-3 py-1 rounded">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
