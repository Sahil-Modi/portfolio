"use client";

import React from "react";
import NotebookCell from "./NotebookCell";

const SocialProofNotebook = () => {
  return (
    <div id="achievements">
      {/* Markdown Cell - Achievements Header */}
      <NotebookCell type="markdown" executionCount={null}>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Achievements
        </h1>

        <p
          className="text-sm sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Recognitions, leadership, and accomplishments
        </p>
      </NotebookCell>

      {/* Code Cell - Load Achievements */}
      <NotebookCell type="code" executionCount={11}>
        {`# Achievements and recognitions
achievements = [
    {
        "title": "Built Multiple AI & Healthcare Platforms",
        "description": "Developed AI and healthcare-based platforms including EHR 360, Medi-Reach, and Maternity Care System using full stack and AI technologies.",
        "type": "Technical Achievement"
    },

    {
        "title": "Highest Scorer in First Year",
        "description": "Achieved the highest overall academic score in the class during the first year of degree.",
        "type": "Academic Achievement"
    },

    {
        "title": "Treasurer - DOT COM Club",
        "description": "Managed club responsibilities, coordination, and financial activities as Treasurer of the DOT COM Club.",
        "type": "Leadership Role"
    },

    {
        "title": "1st Prize - Global Entrepreneurship Summit",
        "description": "Won first prize at the Global Entrepreneurship Summit held at college for innovation and presentation excellence.",
        "type": "Competition Win"
    },

    {
        "title": "E-Waste Recycling Initiative",
        "description": "Contributed to an environmental initiative that successfully collected and recycled over 2+ tons of e-waste.",
        "type": "Social Impact"
    }
]

for a in achievements:
    print(f"[{a['type']}] {a['title']}")
    print(f"  {a['description']}")`}
      </NotebookCell>

      {/* Output Cell - Achievements */}
      <NotebookCell type="output" executionCount={11}>
        <div className="space-y-4">

          {/* Technical Achievement */}
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Built Multiple AI & Healthcare Platforms
                </h3>

                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Technical Achievement
                </p>
              </div>

              <span
                className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                style={{
                  backgroundColor: "var(--warning)",
                  color: "#ffffff",
                }}
              >
                Achievement
              </span>
            </div>

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Developed AI and healthcare-based platforms including
              <strong> EHR 360</strong>, <strong>Medi-Reach</strong>, and
              <strong> Maternity Care System</strong> using full stack and AI
              technologies.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {["AI/ML", "Healthcare", "Full Stack"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs code-font"
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
          </div>

          {/* Academic Achievement */}
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Highest Scorer in First Year
                </h3>

                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Academic Achievement
                </p>
              </div>

              <span
                className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                style={{
                  backgroundColor: "var(--success)",
                  color: "#ffffff",
                }}
              >
                Academic
              </span>
            </div>

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Achieved the highest overall academic score in the class during
              the first year of degree.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {["Academics", "Performance", "Consistency"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs code-font"
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
          </div>

          {/* Leadership Role */}
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Treasurer - DOT COM Club
                </h3>

                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Leadership Role
                </p>
              </div>

              <span
                className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                style={{
                  backgroundColor: "var(--link-color)",
                  color: "#ffffff",
                }}
              >
                Leadership
              </span>
            </div>

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Managed club operations, coordination, and financial activities as
              Treasurer of the DOT COM Club.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {["Leadership", "Management", "Coordination"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs code-font"
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
          </div>

          {/* Competition Win */}
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  1st Prize - Global Entrepreneurship Summit
                </h3>

                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Competition Win
                </p>
              </div>

              <span
                className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                style={{
                  backgroundColor: "var(--warning)",
                  color: "#ffffff",
                }}
              >
                Winner
              </span>
            </div>

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Won first prize at the Global Entrepreneurship Summit held in
              college for innovation and presentation excellence.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {["Innovation", "Entrepreneurship", "Presentation"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs code-font"
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
          </div>

          {/* Social Impact */}
          <div
            className="border rounded-lg p-3 sm:p-5"
            style={{
              borderColor: "var(--cell-border)",
              backgroundColor: "var(--cell-bg)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3
                  className="text-base sm:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  E-Waste Recycling Initiative
                </h3>

                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Social Impact
                </p>
              </div>

              <span
                className="px-3 py-1 rounded text-xs font-medium self-start flex-shrink-0"
                style={{
                  backgroundColor: "var(--success)",
                  color: "#ffffff",
                }}
              >
                Impact
              </span>
            </div>

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Contributed to an initiative that successfully collected and
              recycled over 2+ tons of e-waste promoting environmental
              sustainability.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {["Sustainability", "E-Waste", "Community"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs code-font"
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
          </div>
        </div>
      </NotebookCell>
    </div>
  );
};

export default SocialProofNotebook;