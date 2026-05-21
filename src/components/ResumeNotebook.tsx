"use client";

import React from "react";
import NotebookCell from "./NotebookCell";
import { useNotebook } from "../context/NotebookContext";
import { ExternalLink } from "lucide-react";

const ResumeNotebook = () => {
  const { downloadPDF } = useNotebook();

  return (
    <div id="resume">
      {/* Markdown Cell - Resume Header */}
      <NotebookCell type="markdown" executionCount={null}>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Resume
        </h1>
        <p
          className="text-sm sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Download my resume or view key highlights below
        </p>
      </NotebookCell>

      {/* Code Cell - Resume */}
      <NotebookCell type="code" executionCount={12}>
        {`# Resume download
import os

resume_path = "public/Sahil_modi_resume.pdf"
assert os.path.exists(resume_path), "Resume file found"

# Key highlights
highlights = {
    "education": ["B.Voc Software Development", "Data Science & AI Enthusiast"],
    "experience": ["Frontend & Full Stack Development", "AI/ML & Healthcare Projects"],
    "skills": ["Python", "TensorFlow", "PyTorch", "LangChain", "Power BI", "React.js"],
    "projects": 3,
    "publications": 0
}

print("Resume ready for download")
print(f"Projects: {highlights['projects']} | Publications: {highlights['publications']}")`}
      </NotebookCell>

      {/* Output Cell - Resume Download */}
      <NotebookCell type="output" executionCount={12}>
        <div className="space-y-4">
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Sahil_Modi_Resume.pdf
                </h3>
                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  AI/ML Engineer • Full Stack Developer • Data Analyst
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={downloadPDF}
                  className="px-4 py-2 rounded text-sm font-medium transition-colors hover:cursor-pointer flex items-center gap-1"
                  style={{
                    backgroundColor: "var(--button-primary)",
                    color: "#ffffff",
                  }}
                  aria-label="Download resume as PDF"
                >
                  Download PDF
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>

                <a
                  href="https://drive.google.com/file/d/1X1wQik_jS58C6L5Q7CV7JoF665vU19ll/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded text-sm font-medium border transition-colors flex items-center gap-1"
                  style={{
                    borderColor: "var(--cell-border)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="View resume in new tab"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Projects", value: "3+" },
              { label: "Healthcare Projects", value: "2" },
              { label: "Tech Stack", value: "20+" },
              { label: "Domains", value: "AI/ML" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded border"
                style={{
                  borderColor: "var(--cell-border)",
                  backgroundColor: "var(--cell-bg)",
                }}
              >
                <div
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: "var(--link-color)" }}
                >
                  {stat.value}
                </div>

                <div
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </NotebookCell>
    </div>
  );
};

export default ResumeNotebook;