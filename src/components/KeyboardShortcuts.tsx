"use client";

import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNotebook } from "../context/NotebookContext";

const KeyboardShortcuts: React.FC = () => {
  const { runAllCells, stopExecution, restartKernel } = useNotebook();

  // Helper to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Shift + Enter: Run all cells
  useHotkeys(
    "shift+enter",
    (e) => {
      e.preventDefault();
      runAllCells();
    },
    { enableOnFormTags: false }
  );

  // 1: Go to Hero section
  useHotkeys(
    "1",
    (e) => {
      e.preventDefault();
      scrollToSection("hero");
    },
    { enableOnFormTags: false }
  );

  // 2: Go to About section
  useHotkeys(
    "2",
    (e) => {
      e.preventDefault();
      scrollToSection("about");
    },
    { enableOnFormTags: false }
  );

  // 3: Go to Projects section
  useHotkeys(
    "3",
    (e) => {
      e.preventDefault();
      scrollToSection("projects");
    },
    { enableOnFormTags: false }
  );

  // 4: Go to Contact section
  useHotkeys(
    "4",
    (e) => {
      e.preventDefault();
      scrollToSection("contact");
    },
    { enableOnFormTags: false }
  );

  // I, I: Interrupt kernel
  useHotkeys(
    "i i",
    (e) => {
      e.preventDefault();
      stopExecution();
    },
    { enableOnFormTags: false }
  );

  // 0, 0: Restart kernel
  useHotkeys(
    "0 0",
    (e) => {
      e.preventDefault();
      restartKernel();
    },
    { enableOnFormTags: false }
  );

  // This component does not render anything
  return null;
};

export default KeyboardShortcuts;