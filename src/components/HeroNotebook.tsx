"use client";

import React from "react";
import NotebookCell from "./NotebookCell";

const HeroNotebook = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" aria-label="Introduction">
      {/* Cell 1: Import Libraries */}
      <NotebookCell type="code" executionCount={1}>
        {`# Import required libraries for portfolio
from portfolio import Engineer
from skills import AI, MachineLearning, DataScience
from tools import Python, PyTorch, TensorFlow, React
import passion`}
      </NotebookCell>

      {/* Cell 2: Initialize Profile */}
      <NotebookCell type="code" executionCount={2}>
        {`# Initialize Sahil's Profile
Sahil = Engineer(
    name="Sahil Modi",
    role="AI/ML Engineer & Data Scientist",
    location="India",
    status="Open to opportunities"
)

# Display profile
Sahil.introduce()`}
      </NotebookCell>

      {/* Cell 2 Output */}
      <NotebookCell type="output" executionCount={2}>
        <div className="space-y-4">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Hi, I'm{" "}
            <span style={{ color: "var(--link-color)" }}>Sahil Modi</span>
          </h1>
          <div
            className="text-sm sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            AI/ML Engineer & Data Scientist building intelligent systems with
            measurable impact.
          </div>
          <pre
            className="code-font text-sm"
            style={{ color: "var(--text-primary)" }}
          ></pre>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleScroll("projects")}
              className="px-5 py-2 rounded text-sm font-medium hover:cursor-pointer"
              style={{
                backgroundColor: "var(--button-primary)",
                color: "#ffffff",
              }}
            >
              View Projects
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="px-5 py-2 rounded text-sm font-medium border hover:cursor-pointer"
              style={{
                borderColor: "var(--cell-border)",
                color: "var(--text-primary)",
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </NotebookCell>

      {/* Cell 3: Display Technical Skills */}
      <NotebookCell type="code" executionCount={3}>
        {`# Technical Skills
skills = {
    "AI/ML": [
        "TensorFlow", "PyTorch", "Scikit-Learn",
        "LangChain", "OpenCV", "Hugging Face",
        "RAG", "LLM Integration"
    ],

    "Data & Analytics": [
        "Pandas", "NumPy", "Power BI", "Tableau",
        "SQL", "PostgreSQL", "MongoDB",
        "Pinecone", "FAISS"
    ],

    "Backend Development": [
        "Python", "FastAPI", "Django", "Flask",
        "REST APIs", "JWT Authentication",
        "Microservices"
    ],

    "Frontend": [
        "React.js", "Next.js", "JavaScript",
        "TypeScript", "TailwindCSS", "Bootstrap"
    ],

    "Cloud & DevOps": [
        "Git/GitHub", "Docker", "CI/CD",
        "AWS", "Azure", "Linux",
        "Kubernetes", "GitHub Actions"
    ],

    "Tools & Concepts": [
        "Data Structures & Algorithms",
        "System Design",
        "Postman",
        "PyTest"
    ]
}

# Display skills
print("Technical Skills:")
for category, techs in skills.items():
    print(f"{category}: {', '.join(techs)}")`}
      </NotebookCell>

      {/* Cell 3 Output */}
      <NotebookCell type="output" executionCount={3}>
  <div
    className="code-font text-xs sm:text-sm space-y-1"
    style={{ color: "var(--text-primary)" }}
  >
    <div className="font-bold">Technical Skills:</div>

    <div className="space-y-1">
      <div>
        <span className="font-semibold">AI/ML:</span> TensorFlow, PyTorch,
        Scikit-Learn, LangChain, OpenCV, Hugging Face, RAG, LLM Integration
      </div>

      <div>
        <span className="font-semibold">Data & Analytics:</span> Pandas,
        NumPy, Power BI, Tableau, SQL, PostgreSQL, MongoDB, Pinecone, FAISS
      </div>

      <div>
        <span className="font-semibold">Backend Development:</span> Python,
        FastAPI, Django, Flask, REST APIs, JWT Authentication, Microservices
      </div>

      <div>
        <span className="font-semibold">Frontend:</span> React.js, Next.js,
        JavaScript, TypeScript, TailwindCSS, Bootstrap
      </div>

      <div>
        <span className="font-semibold">Cloud & DevOps:</span> Git/GitHub,
        Docker, CI/CD, AWS, Azure, Linux, Kubernetes, GitHub Actions
      </div>

      <div>
        <span className="font-semibold">Tools & Concepts:</span> Data
        Structures & Algorithms, System Design, Postman, PyTest
      </div>
    </div>
  </div>
</NotebookCell>
    </section>
  );
};

export default HeroNotebook;
