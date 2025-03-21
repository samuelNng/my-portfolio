// src/components/Projects.js
import React from "react";

const Projects = () => {
  const projectList = [
    {
      title: "Project One",
      description: "A brief description of Project One.",
      link: "https://github.com/yourusername/project-one"
    },
    {
      title: "Project Two",
      description: "A brief description of Project Two.",
      link: "https://github.com/yourusername/project-two"
    },
    // Add more projects as needed
  ];

  return (
    <section id="projects" className="my-8">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectList.map((project, index) => (
          <div key={index} className="bg-white shadow p-4 rounded">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="text-blue-600 hover:underline mt-2 inline-block">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
