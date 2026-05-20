"use client";

import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Terminal,
  Brain,
  Settings,
  Server,
  CheckCircle,
} from "lucide-react";

interface JupyterLoaderProps {
  onLoadComplete?: () => void;
  duration?: number;
}

const JupyterLoader: React.FC<JupyterLoaderProps> = ({
  onLoadComplete,
  duration = 2500,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { text: "Initializing Portfolio...", icon: FolderOpen },
    { text: "Loading Python 3.13 kernel...", icon: Terminal },
    { text: "Importing AI/ML modules...", icon: Brain },
    { text: "Setting up environment...", icon: Settings },
    { text: "Starting notebook server...", icon: Server },
    { text: "Ready!", icon: CheckCircle },
  ];

  useEffect(() => {
    // Simulate loading stages
    const stageInterval = duration / stages.length;
    let currentStage = 0;

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLoadingStage(currentStage);
      }
    }, stageInterval);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, duration / 50);

    // Start fade out animation before hiding
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration - 300);

    // Complete loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [duration, onLoadComplete, stages.length]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ${isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      style={{ backgroundColor: "var(--notebook-bg, #111111)" }}
    >
      {/* Jupyter Logo Animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-t-orange-500 border-r-orange-400 border-b-gray-700 border-l-gray-700 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          {React.createElement(stages[loadingStage].icon, {
            size: 28,
            className: "text-orange-500",
          })}
        </div>
      </div>

      {/* Loading Text */}
      <div
        className="text-xl font-medium mb-2 transition-all duration-300"
        style={{ color: "var(--text-primary, #e0e0e0)" }}
      >
        {stages[loadingStage].text}
      </div>

      {/* Notebook Name */}
      <div
        className="text-sm mb-6 font-mono"
        style={{ color: "var(--text-muted, #707070)" }}
      >
        Sahil_Modi_portfolio.ipynb
      </div>

      {/* Progress Bar */}
      <div
        className="w-64 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--cell-border, #2d2d2d)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f97316, #fb923c)",
          }}
        />
      </div>

      {/* Stage Indicator */}
      <div
        className="mt-4 text-xs font-mono"
        style={{ color: "var(--text-muted, #707070)" }}
      >
        [{loadingStage + 1}/{stages.length}] {Math.min(progress, 100)}%
      </div>
    </div>
  );
};

export default JupyterLoader;
