"use client";

import React, { useState } from "react";
import NotebookCell from "./NotebookCell";
import { ExternalLink } from "lucide-react";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ProjectsNotebook = () => {
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
    id: 1,
    title: "Maternity Care System",
    description:
      "Comprehensive maternity care platform designed for expecting and new mothers, featuring healthcare resources, pregnancy guidance, article management, and responsive patient-focused UI/UX.",
    tags: ["React.js", "Node.js", "Firebase", "Tailwind CSS"],
    type: "Healthcare Project",
    githubUrl: "",
    timeline: "2025",
    featured: true,
  },
     {
    id: 2,
    title: "EHR 360",
    description:
      "Full-stack Electronic Health Record platform enabling secure patient data management, appointment scheduling, medical history tracking, and streamlined healthcare workflows.",
    tags: ["React.js", "Node.js", "Firebase", "Vercel"],
    type: "Major Project",
    githubUrl: "",
    liveUrl: "",
    timeline: "2025 - Present",
    featured: true,
  },
    {
    id: 3,
    title: "Medi-Reach",
    description:
      "AI-powered healthcare accessibility platform focused on intelligent patient support, healthcare service discovery, and optimized medical assistance through data-driven solutions.",
    tags: ["Python", "FastAPI", "Machine Learning", "MongoDB"],
    type: "AI/Healthcare Project",
    githubUrl: "",
    liveUrl: "",
    timeline: "2026",
    featured: true,
  },
  ];

  const displayedProjects = showAll
    ? allProjects
    : allProjects.filter((p) => p.featured);

  return (
    <section id="projects" aria-label="Projects">
      {/* Markdown Cell - Projects Header */}
      <NotebookCell type="markdown" executionCount={null}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          My Projects
        </h2>
        <p
          className="text-sm sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Real-world solutions with live deployments
        </p>
      </NotebookCell>

      {/* Code Cell - Load Projects */}
      <NotebookCell type="code" executionCount={7}>
        {`# Load and display projects
projects = [
    {
        "name": "Maternity Care System",
        "description": "Comprehensive platform for expecting and new mothers with healthcare resources and pregnancy guidance",
        "type": "Healthcare Project",
        "tags": ["React.js", "Node.js", "Firebase", "Tailwind CSS"],
        "timeline": "2025"
    },
    
    {
        "name": "EHR 360",
        "description": "Electronic Health Record platform for secure patient data management and healthcare workflow optimization",
        "type": "Major Project",
        "tags": ["React.js", "Node.js", "Firebase", "Vercel"],
        "timeline": "2025 - Present"
    },
    {
        "name": "Medi-Reach",
        "description": "AI-powered healthcare accessibility platform for intelligent patient support and medical assistance",
        "type": "AI/Healthcare Project",
        "tags": ["Python", "FastAPI", "Machine Learning", "MongoDB"],
        "timeline": "2026"
    },
]

# Display projects
for i, proj in enumerate(projects, 1):
    print(f"{i}. {proj['name']}")`}
      </NotebookCell>

      {/* Output Cell - Projects Grid */}
      <NotebookCell type="output" executionCount={7}>
        <div className="space-y-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="border rounded-lg p-3 sm:p-6 transition-all"
              style={{
                borderColor: "var(--cell-border)",
                backgroundColor: "var(--cell-bg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--link-color)";
                e.currentTarget.style.backgroundColor = "var(--cell-hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cell-border)";
                e.currentTarget.style.backgroundColor = "var(--cell-bg)";
              }}
            >
              {/* Project Header */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h3
                    className="text-base sm:text-xl font-bold flex-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {index + 1}. {project.title}
                  </h3>
                  <span
                    className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                    style={{
                      backgroundColor: "var(--prompt-bg)",
                      color: "var(--link-color)",
                      border: "1px solid var(--cell-border)",
                    }}
                  >
                    {project.type}
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded text-xs code-font"
                    style={{
                      backgroundColor: "var(--code-bg)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--cell-border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <div
                className="text-xs mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {project.timeline}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
                    style={{
                      backgroundColor: "var(--button-secondary)",
                      color: "#ffffff",
                    }}
                  >
                    GitHub <ExternalLink className="inline ml-1 w-3 h-3" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
                    style={{
                      backgroundColor: "var(--button-primary)",
                      color: "#ffffff",
                    }}
                  >
                    View Live <ExternalLink className="inline ml-1 w-3 h-3" />
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <span
                    className="px-4 py-2 rounded text-sm"
                    style={{
                      backgroundColor: "var(--toolbar-bg)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Private Project
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* View More Button */}
          {!showAll && allProjects.length > displayedProjects.length && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full px-4 py-3 rounded border text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--cell-border)",
                color: "var(--text-primary)",
                backgroundColor: "transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--cell-hover-bg)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Load More Projects (
              {allProjects.length - displayedProjects.length} remaining)
            </button>
          )}
        </div>
      </NotebookCell>


    </section>
  );
};

export default ProjectsNotebook;
