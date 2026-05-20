"use client";

import React from "react";
import NotebookCell from "./NotebookCell";

const AboutNotebook = () => {
  return (
    <section id="about" aria-label="About Me">
      {/* Markdown Cell - About Header */}
      <NotebookCell type="markdown" executionCount={null}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          About Me
        </h2>
        <p
          className="text-sm sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Passionate about transforming complex problems into intelligent
          solutions through AI and Machine Learning
        </p>
      </NotebookCell>

      {/* Code Cell - Introduction */}
      <NotebookCell type="code" executionCount={4}>
          {`# About Sahil Modi
          intro = """
          Passionate software developer with strong interests in data science, analytics, cloud technologies, and scalable full-stack applications. Experienced in building backend systems, healthcare technology platforms, and AI-assisted solutions using modern development frameworks and cloud-based architectures. Skilled in Python, React, FastAPI, SQL, and DevOps fundamentals, with a focus on solving real-world problems through data-driven and efficient software solutions.
          """

print(intro)`}
      </NotebookCell>

      {/* Output Cell - Introduction */}
      <NotebookCell type="output" executionCount={4}>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            Passionate software developer with strong interests in data science, analytics, cloud technologies, and scalable full-stack applications. Experienced in building backend systems, healthcare technology platforms, and AI-assisted solutions using modern development frameworks and cloud-based architectures. Skilled in Python, React, FastAPI, SQL, and DevOps fundamentals, with a focus on solving real-world problems through data-driven and efficient software solutions.
          </p>
      </NotebookCell>

      {/* Code Cell - Education */}
      <NotebookCell type="code" executionCount={5}>
          {`# Academic Background
          education = [
              {
                  "degree": "Bachelor of Vocation (B.Voc) in Software Development",
                  "institution": "Jai Hind College, Mumbai University",
                  "duration": "2023 – 2026",
                  "cgpa": "9.5"
              }
          ]

          print("EDUCATION")
          for edu in education:
              print(f"  {edu['degree']}")
              print(f"  {edu['institution']} ({edu['duration']})")
              print(f"  CGPA: {edu['cgpa']}")
              print()`}
      </NotebookCell>

      {/* Output Cell - Education */}
      <NotebookCell type="output" executionCount={5}>
        <div
          className="code-font text-xs sm:text-sm space-y-3"
          style={{ color: "var(--text-primary)" }}
        >
          <div className="font-bold">EDUCATION</div>
          <div className="pl-2 sm:pl-4 space-y-3">
              <div>
                <div className="font-medium">Bachelor of Vocation (B.Voc) in Software Development</div>
                <div style={{ color: "var(--text-secondary)" }}>
                  Jai Hind College, Mumbai University (2023 – 2026)
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  CGPA: 9.5
                </div>
              </div>
          </div>
        </div>
      </NotebookCell>

      {/* Code Cell - Experience */}
      <NotebookCell type="code" executionCount={6}>
        {`# Work Experience
experience = [
    {
        "role": "Web Developer Intern",
        "company": "Plasmid Technologies Pvt. Ltd.",
        "period": "Oct 2024 - Dec 2024",
        "description": "Built responsive and dynamic web applications using HTML, CSS, JavaScript, React, and Vite, while managing version control and collaborating on UI enhancements through GitHub."
    },
    {
        "role": "Full Stack Developer Intern",
        "company": "DVNJ Health Tech Pvt. Ltd.",
        "period": "Oct 2025 - Jan 2026",
        "description": "Developed high-performance cross-platform applications using React Native, Firebase, AWS Cloud, and GitHub, while ensuring application stability through GUI and functional testing."
    }
]

print("WORK EXPERIENCE")
for exp in experience:
    print(f"  {exp['role']}")
    print(f"  {exp['company']} | {exp['period']}")
    print(f"  {exp['description']}")
    print()`}
      </NotebookCell>

      {/* Output Cell - Experience */}
      <NotebookCell type="output" executionCount={6}>
        <div
          className="code-font text-xs sm:text-sm space-y-3"
          style={{ color: "var(--text-primary)" }}
        >
          <div className="font-bold">WORK EXPERIENCE</div>
          <div className="pl-2 sm:pl-4 space-y-3">
            <div>
              <div className="font-medium">Web Developer Intern</div>
              <div style={{ color: "var(--text-secondary)" }}>
                Plasmid Technologies Pvt. Ltd. | Oct 2024 - Dec 2024
              </div>
              <div style={{ color: "var(--text-muted)" }}>
                Built responsive and dynamic web applications using HTML, CSS, JavaScript, React, and Vite, while managing version control and collaborating on UI enhancements through GitHub.
              </div>
            </div>
            <div>
              <div className="font-medium">Full Stack Developer Intern</div>
              <div style={{ color: "var(--text-secondary)" }}>
                DVNJ Health Tech Pvt. Ltd. | Oct 2025 - Jan 2026
              </div>
              <div style={{ color: "var(--text-muted)" }}>
                Developed high-performance cross-platform applications using React Native, Firebase, AWS Cloud, and GitHub, while ensuring application stability through GUI and functional testing.
              </div>
            </div>
          </div>
        </div>
      </NotebookCell>
    </section>
  );
};

export default AboutNotebook;
