"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface NotebookContextType {
  isRunning: boolean;
  currentCellType: string;
  kernelStatus: "idle" | "busy" | "starting" | "dead";
  currentExecutingCell: number;
  completedCells: number[];
  collapsedCells: number[];
  runAllCells: () => void;
  runSingleCell: (cellNumber: number) => void;
  stopExecution: () => void;
  restartKernel: () => void;
  downloadNotebook: () => void;
  downloadPDF: () => void;
  changeCellType: (type: string) => void;
  clearOutputs: () => void;
  toggleCellCollapse: (cellNumber: number) => void;
}

// Reusable toast notification function
const showToast = (
  message: string,
  type: "success" | "warning" | "info" = "success",
) => {
  const colors = {
    success: "var(--success)",
    warning: "var(--warning)",
    info: "var(--link-color)",
  };

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const NotebookContext = createContext<NotebookContextType | undefined>(
  undefined,
);

export const useNotebook = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error("useNotebook must be used within NotebookProvider");
  }
  return context;
};

interface NotebookProviderProps {
  children: React.ReactNode;
}

export const NotebookProvider: React.FC<NotebookProviderProps> = ({
  children,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentCellType, setCurrentCellType] = useState("Code");
  const [kernelStatus, setKernelStatus] = useState<
    "idle" | "busy" | "starting" | "dead"
  >("idle");
  const [currentExecutingCell, setCurrentExecutingCell] = useState(-1);
  // Cells that have been successfully executed
  const [completedCells, setCompletedCells] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [collapsedCells, setCollapsedCells] = useState<number[]>([]);

  const runSingleCell = useCallback((cellNumber: number) => {
    setIsRunning(true);
    setKernelStatus("busy");
    setCurrentExecutingCell(cellNumber);

    // Remove from completed cells if re-running
    setCompletedCells((prev) => prev.filter((n) => n !== cellNumber));

    // Execute single cell
    setTimeout(() => {
      setCompletedCells((prev) => [...prev, cellNumber]);
      setCurrentExecutingCell(-1);
      setIsRunning(false);
      setKernelStatus("idle");
      showToast(`Cell ${cellNumber} executed`, "success");
    }, 300);
  }, []);

  const runAllCells = useCallback(() => {
    setIsRunning(true);
    setKernelStatus("busy");
    setCompletedCells([]); // Clear completed cells before running all

    // Get all code cells (execution counts: 1-12)
    const cellExecutionCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Execute cells sequentially with animation
    let currentIndex = 0;

    const executeNextCell = () => {
      if (currentIndex < cellExecutionCounts.length) {
        setCurrentExecutingCell(cellExecutionCounts[currentIndex]);

        setTimeout(() => {
          // Mark current cell as completed
          setCompletedCells((prev) => [
            ...prev,
            cellExecutionCounts[currentIndex],
          ]);
          currentIndex++;
          executeNextCell();
        }, 300); // `300ms` delay between cells
      } else {
        // All cells executed
        setCurrentExecutingCell(-1);
        setIsRunning(false);
        setKernelStatus("idle");
        showToast("All cells executed successfully", "success");
      }
    };

    executeNextCell();
  }, []);

  const stopExecution = useCallback(() => {
    setIsRunning(false);
    setKernelStatus("idle");
    setCurrentExecutingCell(-1);
    // Don't clear completed cells on stop - keep the progress
    showToast("Kernel interrupted", "warning");
  }, []);

  const restartKernel = useCallback(() => {
    setKernelStatus("starting");
    setIsRunning(false);
    setCurrentExecutingCell(-1);
    setCompletedCells([]); // Clear all outputs on restart

    showToast("Restarting kernel...", "info");

    setTimeout(() => {
      setKernelStatus("busy");
      setIsRunning(true);

      // Get all code cells (execution counts: 1-12)
      const cellExecutionCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      // Execute cells sequentially with animation
      let currentIndex = 0;

      const executeNextCell = () => {
        if (currentIndex < cellExecutionCounts.length) {
          setCurrentExecutingCell(cellExecutionCounts[currentIndex]);

          setTimeout(() => {
            // Mark current cell as completed
            setCompletedCells((prev) => [
              ...prev,
              cellExecutionCounts[currentIndex],
            ]);
            currentIndex++;
            executeNextCell();
          }, 400); // `400ms` delay between cells
        } else {
          // All cells executed
          setCurrentExecutingCell(-1);
          setKernelStatus("idle");
          setIsRunning(false);
          showToast("Kernel restarted & all cells executed", "success");
        }
      };

      executeNextCell();
    }, 1000);
  }, []);

  const downloadNotebook = useCallback(() => {
    // Simulate notebook download
    const notebookData = {
      cells: [
        // Title
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# Sahil Modi - Portfolio\n",
            "## Data Science & Analytics Enthusiast | Full Stack Developer | Cloud & DevOps Learner\n",
            "\n",
            "This notebook contains my professional portfolio including projects, skills, and contact information.",
          ],
        },
        // Hero Section - Imports
        {
          cell_type: "code",
          execution_count: 1,
          metadata: {},
          outputs: [],
          source: [
            "# Import required libraries for portfolio\n",
            "from portfolio import Engineer\n",
            "from skills import AI, MachineLearning, DataScience\n",
            "from tools import Python, PyTorch, TensorFlow, React\n",
            "import passion",
          ],
        },
        // Hero Section - Initialize Profile
        {
          cell_type: "code",
          execution_count: 2,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "Hi, I'm Sahil Modi\n",
                "Driven and detail-oriented software developer with experience in full-stack development, backend engineering, and AI-powered healthcare solutions. Passionate about data science, cloud computing, and analytics, with hands-on exposure to Python, React, FastAPI, SQL, Firebase, and cloud deployment workflows. Skilled at building scalable applications, REST APIs, and data-driven systems while continuously exploring modern DevOps and cloud technologies to improve software performance and deployment efficiency.\n",
                "\n",
              ],
            },
          ],
          source: [
            "# Initialize Sahil's Profile\n",
            "sahil = Engineer(\n",
            '    name="Sahil Modi",\n',
            '    role="Data Science & Analytics Enthusiast | Full Stack Developer | Cloud & DevOps Learner",\n',
            '    location="Mumbai, Maharashtra, India",\n',
            '    status="Open to opportunities"\n',
            ")\n",
            "\n",
            "# Display profile\n",
            "sahil.introduce()",
          ],
        },
        // Hero Section - Skills
        {
          cell_type: "code",
          execution_count: 3,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "Technical Skills:\n",
                "ML & AI: TensorFlow, PyTorch, Scikit-Learn, LangChain, OpenCV\n",
                "Data & Analytics: Power BI, Tableau, Pandas, NumPy, MongoDB, Pinecone\n",
                "Programming: Python, JavaScript, SQL\n",
                "Frameworks: FastAPI, Django, Flask, React.js, Next.js, Bootstrap, TailwindCSS\n",
                "Deployment: Git/GitHub, CI/CD, Docker, AWS, Azure\n",
              ],
            },
          ],
          source: [
            "# Technical Skills\n",
            "skills = {\n",
            '    "Programming": ["Python", "SQL", "JavaScript"],\n',
            '    "Frameworks": ["React.js", "FastAPI", "Node.js", "Express.js", "MongoDB", "Firebase"],\n',
            '    "Data Science": ["NumPy", "Pandas", "Data Analysis", "EDA", "Data Visualization", "Predictive Analytics", "Basic Machine Learning"],\n',
            '    "DevOps & Cloud": ["Docker", "Git & GitHub", "CI/CD Basics", "Linux", "Cloud Computing Fundamentals", "Firebase", "Vercel"],\n',
            '    "Other": ["REST APIs", "Full Stack Development", "SDLC", "Data Structures & Algorithms"]\n',
            "}\n",
            "\n",
            "# Display skills\n",
            'print("Technical Skills:")\n',
            "for category, techs in skills.items():\n",
            "    print(f\"{category}: {', '.join(techs)}\")",
          ],
        },
        // About Section Header
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# About Me\n",
            "\n",
            "Passionate about transforming complex problems into intelligent solutions through AI and Machine Learning.",
          ],
        },
        // About Section - Introduction
        {
          cell_type: "code",
          execution_count: 4,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "Hey there! I'm Sahil. I love puzzles, whether it's solving a tough coding problem, solving a Rubik's cube in record time, or brainstorming the next fun idea for my tech club. My approach to life is simple: stay curious, keep experimenting, and enjoy the journey.\n",
              ],
            },
          ],
          source: [
            "# About Sahil Modi\n",
            'intro = """\n',
            "Passionate software developer with strong interests in data science, analytics, cloud technologies, and scalable full-stack applications. Experienced in building backend systems, healthcare technology platforms, and AI-assisted solutions using modern development frameworks and cloud-based architectures. Skilled in Python, React, FastAPI, SQL, and DevOps fundamentals, with a focus on solving real-world problems through data-driven and efficient software solutions.\n",
            '"""\n',
            "\n",
            "print(intro)",
          ],
        },
        // About Section - Education
        {
          cell_type: "code",
          execution_count: 5,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "EDUCATION\n",
                "  BVoc in Software Development\n",
                "  Jai Hind College (2026)\n",
                "  CGPA: 9.5\n",
              ],
            },
          ],
          source: [
            "# Academic Background\n",
            "education = [\n",
            "    {\n",
            '        "degree": "Bachelor of Vocation (B.Voc) in Software Development",\n',
            '        "institution": "Jai Hind College, Mumbai University",\n',
            '        "duration": "2023 – 2026",\n',
            '        "cgpa": "9.5"\n',
            "    }\n",
            "]\n",
            "\n",
            'print("EDUCATION")\n',
            "for edu in education:\n",
            "    print(f\"  {edu['degree']}\")\n",
            "    print(f\"  {edu['institution']} ({edu['duration']})\")\n",
            "    print(f\"  CGPA: {edu['cgpa']}\")\n",
            "    print()",
          ],
        },
        // About Section - Experience
        {
          cell_type: "code",
          execution_count: 6,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "WORK EXPERIENCE\n",
                "  Web Developer Intern\n",
                "  Plasmid Technologies Pvt. Ltd. | Oct 2024 - Dec 2024\n",
                "  Built Power BI dashboards for data visualization\n",
                "\n",
                "  Full Stack Developer Intern\n",
                "  DVNJ Health Tech Pvt. Ltd. | Oct 2025 - Jan 2026\n",
                "  Developed high-performance cross-platform applications using React Native, Firebase, AWS Cloud, and GitHub, while ensuring application stability through GUI and functional testing.\n",
              ],
            },
          ],
          source: [
            "# Work Experience\n",
            "experience = [\n",
            "    {\n",
            '        "role": "Full Stack Developer Intern (Professionalized Entry)",\n',
            '        "company": "Freelance / Academic Projects",\n',
            '        "period": "2024 – Present",\n',
            '        "description": "Developed scalable backend APIs using Python and FastAPI; Built responsive frontend interfaces using React.js; Worked on cloud-hosted solutions and deployment workflows; Integrated databases and optimized application performance; Collaborated on analytics-focused healthcare systems."\n',
            "    },\n",
            "    {\n",
            '        "role": "Backend & Cloud Development Projects",\n',
            '        "company": "",\n',
            '        "period": "2024 – Present",\n',
            '        "description": "Designed RESTful APIs and backend services; Explored cloud deployment and DevOps workflows; Implemented scalable architecture concepts; Worked with version control and deployment automation tools."\n',
            "    }\n",
            "]\n",
            "\n",
            'print("WORK EXPERIENCE")\n',
            "for exp in experience:\n",
            "    print(f\"  {exp['role']}\")\n",
            "    print(f\"  {exp['company']} | {exp['period']}\")\n",
            "    print(f\"  {exp['description']}\")\n",
            "    print()",
          ],
        },
        // Projects Section Header
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# Featured Projects\n",
            "\n",
            "Real-world solutions with live deployments",
          ],
        },
        // Projects Section - Data
        {
          cell_type: "code",
          execution_count: 7,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "1. Saarthi - AI Academic Assistant\n",
                "2. CubeDev\n",
                "3. Hand Gesture System Control\n",
              ],
            },
          ],
          source: [
            "# Load and display projects\n",
            "projects = [\n",
            "    {\n",
            '        "name": "EHR 360 – Electronic Health Record Platform",\n',
            '        "description": "Designed and developed a cloud-based Electronic Health Record (EHR) platform to streamline patient management and healthcare data handling.",\n',
            '        "type": "Personal Project",\n',
            '        "tags": ["React", "Node.js", "Firebase", "Vercel"],\n',
            '        "timeline": "2025",\n',
            '        "github": "https://github.com/Sahil-Modi/ehr360-healthcare-system"\n',
            "    },\n",
            "    {\n",
            '        "name": "AI-Powered Healthcare Analytics System",\n',
            '        "description": "Developed a healthcare-focused analytics system capable of ranking, scoring, and analyzing patient and donor data using predictive logic.",\n',
            '        "type": "Personal Project",\n',
            '        "tags": ["Python", "FastAPI", "NumPy", "SQL"],\n',
            '        "timeline": "2025"\n',
            "    },\n",
            "    {\n",
            '        "name": "Full Stack Task & Workflow Management System",\n',
            '        "description": "Built a full-stack productivity platform for task tracking, workflow management, and team collaboration.",\n',
            '        "type": "Personal Project",\n',
            '        "tags": ["React", "Node.js", "MongoDB", "Express.js"],\n',
            '        "timeline": "2025"\n',
            "    },\n",
            "    {\n",
            '        "name": "Cloud Deployment & DevOps Practice Projects",\n',
            '        "description": "Worked on deployment-focused projects involving CI/CD concepts, cloud hosting, containerization basics, and backend deployment automation.",\n',
            '        "type": "Personal Project",\n',
            '        "tags": ["Docker", "GitHub Actions", "Firebase", "Vercel", "Linux"],\n',
            '        "timeline": "2025"\n',
            "    }\n",
            "]\n",
            "\n",
            "# Display projects\n",
            "for i, proj in enumerate(projects, 1):\n",
            "    print(f\"{i}. {proj['name']}\")",
          ],
        },
        // Publications Section Header
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# Research Publications\n",
            "\n",
            "Contributing to research through academic publications",
          ],
        },
        // Publications Section - Data
        {
          cell_type: "code",
          execution_count: 8,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "1. Phishing Detection and Prevention Using ML Algorithms\n",
                "   Authors: Kavya Chouhan, Rohana Deshpande, Fatima Shaikh\n",
                "   Zenodo, 2025\n",
                "   DOI: 10.5281/zenodo.15681835\n",
                "   Status: Published\n",
              ],
            },
          ],
          source: [
            "# Load research publications\n",
            "publications = [\n",
            "    {\n",
            '        "title": "NASSCOM Certification for Jr Software Developer",\n',
            '        "authors": ["Sahil Modi"],\n',
            '        "venue": "NASSCOM",\n',
            '        "year": 2026,\n',
            '        "type": "Certification",\n',
            '        "doi": "",\n',
            '        "status": "Completed"\n',
            "    }\n",
            "]\n",
            "\n",
            "# Display publications\n",
            "for i, pub in enumerate(publications, 1):\n",
            "    print(f\"{i}. {pub['title']}\")\n",
            "    print(f\"   Authors: {', '.join(pub['authors'])}\")\n",
            "    print(f\"   {pub['venue']}, {pub['year']}\")\n",
            "    print(f\"   DOI: {pub['doi']}\")\n",
            "    print(f\"   Status: {pub['status']}\")\n",
            "    print()",
          ],
        },
        // Contact Section Header
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# Get in Touch\n",
            "\n",
            "Interested in collaboration or have a question? Let's connect!",
          ],
        },
        // Contact Section - Info
        {
          cell_type: "code",
          execution_count: 9,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: [
                "Email: sahilmodic819@gmail.com\n",
                "Linkedin: linkedin.com/in/sahil-modi819\n",
                "Github: github.com/sahil-modi\n",
                "Location: Mumbai, Maharashtra, India\n",
                "Availability: Open to opportunities\n",
              ],
            },
          ],
          source: [
            "# Contact information\n",
            "contact = {\n",
            '    "email": "sahilmodic819@gmail.com",\n',
            '    "linkedin": "linkedin.com/in/sahil-modi819",\n',
            '    "github": "github.com/sahil-modi",\n',
            '    "location": "Mumbai, Maharashtra, India",\n',
            '    "availability": "Open to opportunities"\n',
            "}\n",
            "\n",
            "# Display contact methods\n",
            "for platform, info in contact.items():\n",
            '    print(f"{platform.title()}: {info}")',
          ],
        },
        // Contact Form
        {
          cell_type: "code",
          execution_count: 10,
          metadata: {},
          outputs: [
            {
              output_type: "stream",
              name: "stdout",
              text: ["Contact form ready!\n"],
            },
          ],
          source: [
            "# Contact form function\n",
            "def send_message(name, email, subject, message):\n",
            '    """Send a message through the contact form"""\n',
            "    # Email validation\n",
            "    if not email or '@' not in email:\n",
            '        return {"success": False, "error": "Invalid email"}\n',
            "    \n",
            "    payload = {\n",
            '        "from_name": name,\n',
            '        "from_email": email,\n',
            '        "subject": subject,\n',
            '        "message": message\n',
            "    }\n",
            "    \n",
            "    # Auto-reply confirmation sent to user\n",
            '    print(f"Message sent successfully from {name}!")\n',
            '    print(f"Auto-reply confirmation sent to {email}")\n',
            '    return {"success": True}\n',
            "\n",
            'print("Contact form ready!")',
          ],
        },
        // Footer
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "---\n",
            "\n",
            "© 2026 Sahil Modi.\n",
            "\n",
            "Kernel: Python 3.13 | Portfolio Version: 1.0.0",
          ],
        },
      ],
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3",
        },
        language_info: {
          codemirror_mode: {
            name: "ipython",
            version: 3,
          },
          file_extension: ".py",
          mimetype: "text/x-python",
          name: "python",
          nbconvert_exporter: "python",
          pygments_lexer: "ipython3",
          version: "3.13.0",
        },
      },
      nbformat: 4,
      nbformat_minor: 4,
    };

    // Convert to JSON and download
    const dataStr = JSON.stringify(notebookData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sahil_modi_portfolio.ipynb";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show toast notification
    showToast(
      "Notebook downloaded as sahil_modi_portfolio.ipynb",
      "success",
    );
  }, []);

  const changeCellType = useCallback((type: string) => {
    setCurrentCellType(type);
    showToast(`Cell type changed to ${type}`, "info");
  }, []);

  const downloadPDF = useCallback(() => {
    // Download resume PDF
    const link = document.createElement("a");
    link.href = "/resume/Sahil_modi_resume.pdf";
    link.download = "Sahil_Modi_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Resume downloaded as PDF", "success");
  }, []);

  const clearOutputs = useCallback(() => {
    setCompletedCells([]); // Clear all completed cells
    showToast("All outputs cleared", "warning");
  }, []);

  const toggleCellCollapse = useCallback((cellNumber: number) => {
    setCollapsedCells((prev) =>
      prev.includes(cellNumber)
        ? prev.filter((n) => n !== cellNumber)
        : [...prev, cellNumber],
    );
  }, []);

  return (
    <NotebookContext.Provider
      value={{
        isRunning,
        currentCellType,
        kernelStatus,
        currentExecutingCell,
        completedCells,
        collapsedCells,
        runAllCells,
        runSingleCell,
        stopExecution,
        restartKernel,
        downloadNotebook,
        downloadPDF,
        changeCellType,
        clearOutputs,
        toggleCellCollapse,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};
