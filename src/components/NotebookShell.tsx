"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import NotebookMenu from "./NotebookMenu";
import NotebookToolbar from "./NotebookToolbar";
import KeyboardShortcuts from "./KeyboardShortcuts";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";
import { useNotebook } from "../context/NotebookContext";

interface NotebookShellProps {
  children: React.ReactNode;
  notebookTitle?: string;
}

const NotebookShell: React.FC<NotebookShellProps> = ({
  children,
  notebookTitle = "sahil_modi_portfolio",
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lastSaved, setLastSaved] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    kernelStatus,
    currentCellType,
    runAllCells,
    stopExecution,
    restartKernel,
    downloadNotebook,
    downloadPDF,
    changeCellType,
    clearOutputs,
  } = useNotebook();

  useEffect(() => {
    // Load saved theme from localStorage, or fall back to system preference
    const savedTheme = localStorage.getItem("notebook-theme") as
      | "light"
      | "dark"
      | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const resolvedTheme = savedTheme ?? (systemPrefersDark ? "dark" : "light");
    setTheme(resolvedTheme);
    document.documentElement.setAttribute("data-theme", resolvedTheme);

    // Listen for system theme changes (only applies when user hasn't set a manual preference)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("notebook-theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Initialize last saved time
    updateLastSaved();
    const interval = setInterval(updateLastSaved, 60000); // Update every minute

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const updateLastSaved = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setLastSaved(`Last Checkpoint: ${timeString}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("notebook-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleCopySelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";

    if (selectedText) {
      navigator.clipboard.writeText(selectedText).then(() => {
        const toast = document.createElement("div");
        toast.textContent = "Copied to clipboard!";
        toast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: var(--success);
          color: white;
          padding: 12px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          z-index: 10000;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    } else {
      const toast = document.createElement("div");
      toast.textContent = "No text selected";
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--warning);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        z-index: 10000;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  const handleSave = () => {
    updateLastSaved();
    const toast = document.createElement("div");
    toast.textContent = "Portfolio checkpoint saved";
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--success);
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      z-index: 10000;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleDownloadNotebook = () => {
    downloadNotebook();
  };

  const handleExportPDF = () => {
    downloadPDF();
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fileMenuItems = [
    {
      label: "New Notebook",
      shortcut: "Ctrl+N",
      action: () => {},
      disabled: true,
    },
    { label: "Open...", shortcut: "Ctrl+O", action: () => {}, disabled: true },
    { label: "Make a Copy...", action: () => {}, disabled: true },
    { label: "Save...", action: handleSave },
    { separator: true, label: "", action: () => {} },
    { label: "Rename Notebook...", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "Download as .ipynb", action: downloadNotebook },
    { label: "Download as PDF", action: handleExportPDF },
    { separator: true, label: "", action: () => {} },
    { label: "Print Preview", shortcut: "Ctrl+P", action: handlePrint },
  ];

  const editMenuItems = [
    { label: "Cut Cell", shortcut: "X", action: () => {}, disabled: true },
    {
      label: "Copy Selection",
      shortcut: "Ctrl+C",
      action: handleCopySelection,
    },
    { label: "Paste Cell", shortcut: "V", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "Delete Cell", shortcut: "D,D", action: () => {}, disabled: true },
    {
      label: "Undo Delete Cell",
      shortcut: "Z",
      action: () => {},
      disabled: true,
    },
    { separator: true, label: "", action: () => {} },
    {
      label: "Find and Replace",
      shortcut: "Ctrl+F",
      action: () => {},
      disabled: true,
    },
  ];

  const viewMenuItems = [
    { label: "Toggle Header", action: () => {}, disabled: true },
    { label: "Toggle Toolbar", action: () => {}, disabled: true },
    { label: "Toggle Line Numbers", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "Toggle Dark Mode", action: toggleTheme },
  ];

  const insertMenuItems = [
    {
      label: "Insert Cell Above",
      shortcut: "A",
      action: () => {},
      disabled: true,
    },
    {
      label: "Insert Cell Below",
      shortcut: "B",
      action: () => {},
      disabled: true,
    },
  ];

  const cellMenuItems = [
    {
      label: "Run Cell",
      shortcut: "Ctrl+Enter",
      action: () => {},
      disabled: true,
    },
    {
      label: "Run Cell and Select Below",
      shortcut: "Shift+Enter",
      action: () => {},
      disabled: true,
    },
    { label: "Run All", action: runAllCells },
    { label: "Run All Above", action: () => {}, disabled: true },
    { label: "Run All Below", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "Clear Output", action: () => {}, disabled: true },
    { label: "Clear All Output", action: clearOutputs },
  ];

  const kernelMenuItems = [
    {
      label: "Interrupt Kernel",
      shortcut: "I,I",
      action: stopExecution,
    },
    {
      label: "Restart Kernel",
      shortcut: "0,0",
      action: restartKernel,
    },
    {
      label: "Restart & Clear Output",
      action: () => {
        restartKernel();
        setTimeout(clearOutputs, 1000);
      },
    },
    {
      label: "Restart & Run All",
      action: () => {
        restartKernel();
        setTimeout(runAllCells, 1000);
      },
    },
    { separator: true, label: "", action: () => {} },
    { label: "Change Kernel", action: () => {}, disabled: true },
  ];

  const widgetsMenuItems = [
    { label: "Save Widget State", action: () => {}, disabled: true },
    { label: "Clear Widget State", action: () => {}, disabled: true },
  ];

  const helpMenuItems = [
    { label: "Keyboard Shortcuts", action: () => {}, disabled: true },
    { separator: true, label: "", action: () => {} },
    { label: "About Portfolio", action: () => scrollToSection("home") },
    { label: "View Projects", action: () => scrollToSection("projects") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  const menuItems = [
    { label: "File", items: ["New", "Open", "Save", "Export PDF"] },
    { label: "Edit", items: ["Cut", "Copy", "Paste", "Find"] },
    {
      label: "View",
      items: ["Toggle Header", "Toggle Toolbar", "Cell Toolbar"],
    },
    { label: "Insert", items: ["Insert Cell Above", "Insert Cell Below"] },
    { label: "Cell", items: ["Run Cells", "Run All", "Clear Output"] },
    { label: "Kernel", items: ["Interrupt", "Restart", "Restart & Clear"] },
    { label: "Widgets", items: [] },
    { label: "Help", items: ["Keyboard Shortcuts", "About"] },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--notebook-bg)" }}
    >
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded focus:text-sm"
        style={{
          backgroundColor: "var(--button-primary)",
          color: "#ffffff",
        }}
      >
        Skip to main content
      </a>

      {/* Keyboard Shortcuts Handler */}
      <KeyboardShortcuts />
      <KeyboardShortcutsModal />

      {/* Render Notebook Menu */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "var(--menu-bg)" }}
        role="banner"
      >
        {/* Top Bar with Notebook Title */}
        <div
          className="flex items-center justify-between px-2 sm:px-4 py-2 border-b"
          style={{
            backgroundColor: "var(--menu-bg)",
            borderColor: "var(--menu-border)",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "var(--toolbar-bg)" }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>

            {/* Jupyter Logo */}
            <Image
              src="/jupyter_logo.png"
              alt="Jupyter Logo"
              width={50}
              height={50}
              className="w-8 h-8 sm:w-[50px] sm:h-[50px]"
            />

            {/* Notebook Title */}
            <div className="flex items-center gap-2">
              <div
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium code-font max-w-[140px] sm:max-w-none truncate"
                style={{
                  backgroundColor: "var(--code-bg)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--cell-border)",
                  cursor: "not-allowed",
                  opacity: 0.9,
                }}
              >
                {notebookTitle}
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded sm:inline"
                style={{
                  backgroundColor: "var(--prompt-bg)",
                  color: "var(--text-muted)",
                }}
              >
                .ipynb
              </span>
            </div>
          </div>

          {/* Right Side - Status */}
          <div className="flex items-center gap-4">
            <span
              className="text-xs hidden md:block"
              style={{ color: "var(--text-muted)" }}
            >
              {lastSaved}
            </span>

            {/* Kernel Status */}
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full hidden sm:inline-block"
                style={{
                  backgroundColor:
                    kernelStatus === "idle"
                      ? "var(--kernel-idle)"
                      : kernelStatus === "busy"
                        ? "var(--kernel-busy)"
                        : kernelStatus === "starting"
                          ? "var(--warning)"
                          : "var(--error)",
                }}
              />
              <span
                className="text-xs hidden sm:block"
                style={{ color: "var(--text-secondary)" }}
              >
                Python 3{" "}
                {kernelStatus === "busy"
                  ? "(busy)"
                  : kernelStatus === "starting"
                    ? "(starting)"
                    : ""}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "var(--toolbar-bg)" }}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Bar - Desktop */}
        <div
          className="hidden md:flex items-center px-2 py-1 border-b"
          style={{
            backgroundColor: "var(--menu-bg)",
            borderColor: "var(--menu-border)",
          }}
        >
          <NotebookMenu label="File" items={fileMenuItems} />
          <NotebookMenu label="Edit" items={editMenuItems} />
          <NotebookMenu label="View" items={viewMenuItems} />
          <NotebookMenu label="Insert" items={insertMenuItems} />
          <NotebookMenu label="Cell" items={cellMenuItems} />
          <NotebookMenu label="Kernel" items={kernelMenuItems} />
          <NotebookMenu label="Widgets" items={widgetsMenuItems} />
          <NotebookMenu label="Help" items={helpMenuItems} />
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-b"
            style={{
              backgroundColor: "var(--menu-bg)",
              borderColor: "var(--menu-border)",
            }}
          >
            <nav
              className="py-2 px-3 space-y-1"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Achievements", id: "achievements" },
                { label: "Resume", id: "resume" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded text-sm transition-colors"
                  style={{ color: "var(--text-primary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--cell-hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div
                className="border-t my-2"
                style={{ borderColor: "var(--menu-border)" }}
              />
              <button
                onClick={() => {
                  runAllCells();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded text-sm transition-colors"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--cell-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Run All Cells
              </button>
              <button
                onClick={() => {
                  downloadNotebook();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded text-sm transition-colors"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--cell-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Download as .ipynb
              </button>
              <button
                onClick={() => {
                  downloadPDF();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded text-sm transition-colors"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--cell-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Download Resume (PDF)
              </button>
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded text-sm transition-colors"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--cell-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Toggle {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </nav>
          </div>
        )}

        {/* Toolbar - hidden on mobile */}
        <div className="hidden md:block">
          <NotebookToolbar
            onSave={handleSave}
            onCopy={handleCopySelection}
            onRun={runAllCells}
            onStop={stopExecution}
            onRestart={restartKernel}
            cellType={currentCellType}
            onCellTypeChange={changeCellType}
          />
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[80px] md:h-[144px]" />

      {/* Notebook Content */}
      <main
        id="main-content"
        className="max-w-full mx-auto"
        style={{ backgroundColor: "var(--notebook-surface)" }}
        role="main"
      >
        {children}
      </main>
    </div>
  );
};

export default NotebookShell;
