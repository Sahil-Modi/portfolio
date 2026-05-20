"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useNotebook } from "../context/NotebookContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface NotebookCellProps {
  type: "code" | "markdown" | "output";
  executionCount?: number | null;
  children: ReactNode;
  language?: string;
  collapsed?: boolean;
}

const NotebookCell: React.FC<NotebookCellProps> = ({
  type,
  executionCount,
  children,
  language = "python",
  collapsed = false,
}) => {
  const {
    kernelStatus,
    isRunning,
    currentExecutingCell,
    completedCells,
    collapsedCells,
    runSingleCell,
    toggleCellCollapse,
  } = useNotebook();
  const cellRef = useRef<HTMLDivElement>(null);
  const [isNewOutput, setIsNewOutput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // Track execution state
  const isExecuting =
    type === "code" &&
    currentExecutingCell === executionCount &&
    (kernelStatus === "busy" || isRunning);

  // Track output execution state
  const isOutputExecuting =
    type === "output" &&
    currentExecutingCell === executionCount &&
    (kernelStatus === "busy" || isRunning);

  // Determine if output cell should be shown
  const shouldShowOutput =
    type !== "output" ||
    (executionCount !== null &&
      executionCount !== undefined &&
      completedCells.includes(executionCount));

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("notebook-theme") as "light" | "dark") || "light";
    setTheme(savedTheme);

    const handleStorageChange = () => {
      const newTheme =
        (localStorage.getItem("notebook-theme") as "light" | "dark") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Animate new output cells
  useEffect(() => {
    if (type === "output" && shouldShowOutput) {
      setIsNewOutput(true);
      const timer = setTimeout(() => setIsNewOutput(false), 300);
      return () => clearTimeout(timer);
    }
  }, [type, shouldShowOutput]);

  // Scroll into view when executing
  useEffect(() => {
    if ((isExecuting || isOutputExecuting) && cellRef.current) {
      cellRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isExecuting, isOutputExecuting]);

  // Measure execution time
  useEffect(() => {
    if (type === "code" && isExecuting) {
      const startTime = Date.now();
      return () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // in seconds
        setExecutionTime(duration);
      };
    }
  }, [type, isExecuting]);

  // Hide cell if output cell is not to be shown
  if (!shouldShowOutput) {
    return null;
  }

  return (
    <div
      ref={cellRef}
      className={`notebook-cell flex border-b transition-all relative ${
        isExecuting || isOutputExecuting ? "executing" : ""
      } ${type === "output" && isNewOutput ? "output-cell-appear" : ""} ${
        isFocused ? "cell-focused" : ""
      }`}
      style={{
        borderColor: "var(--cell-border)",
        backgroundColor: "var(--cell-bg)",
        borderLeftWidth: isFocused ? "4px" : "1px",
        borderLeftColor: isFocused ? "var(--link-color)" : "transparent",
      }}
      onClick={() => type !== "output" && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={type !== "output" ? 0 : undefined}
    >
      {/* Execution indicator */}
      {(isExecuting || isOutputExecuting) && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 animate-pulse"
          style={{ backgroundColor: "var(--link-color)" }}
        />
      )}

      {/* Prompt Area (Left Gutter) */}
      <div
        className="flex-shrink-0 w-10 sm:w-16 md:w-20 flex items-start justify-center pt-2 text-[10px] sm:text-xs code-font relative"
        style={{
          backgroundColor: "var(--prompt-bg)",
          color: type === "output" ? "var(--prompt-out)" : "var(--prompt-in)",
        }}
      >
        {type === "code" && (
          <span className="font-mono flex items-center gap-1">
            {isExecuting ? (
              <>
                <svg
                  className="animate-spin h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>In [*]:</span>
              </>
            ) : (
              <span>
                In [{executionCount !== undefined ? executionCount : " "}]:
              </span>
            )}
          </span>
        )}
        {type === "output" && (
          <span className="font-mono">
            {isOutputExecuting ? (
              <span className="animate-pulse">Out[*]:</span>
            ) : (
              <span>Out[{executionCount}]:</span>
            )}
          </span>
        )}
      </div>

      {/* Cell Content Area */}
      <div
        className="flex-1 min-w-0 overflow-x-auto relative"
        style={{
          backgroundColor:
            type === "code" ? "var(--code-bg)" : "var(--cell-bg)",
        }}
      >
        {type === "code" && (
          <div className="relative">
            {/* Collapse button for code cells */}
            {executionCount && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCellCollapse(executionCount);
                }}
                className="absolute top-2 right-2 p-1 rounded transition-opacity hover:bg-opacity-80 z-10"
                style={{
                  backgroundColor: "var(--cell-hover-bg)",
                  color: "var(--text-secondary)",
                }}
                title={
                  collapsedCells.includes(executionCount)
                    ? "Expand"
                    : "Collapse"
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: collapsedCells.includes(executionCount)
                      ? "rotate(-90deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            )}
            {/* Code content */}
            {!collapsedCells.includes(executionCount || -1) && (
              <div className="pt-2 pb-2 px-2 sm:px-4">
                <SyntaxHighlighter
                  language={language}
                  style={theme === "dark" ? oneDark : oneLight}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.875rem",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        "Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace",
                    },
                  }}
                >
                  {typeof children === "string" ? children : String(children)}
                </SyntaxHighlighter>
                {/* Execution Time Badge */}
                {executionTime !== null && (
                  <div
                    className="text-xs mt-2 px-2 py-1 inline-block rounded"
                    style={{
                      backgroundColor: "var(--prompt-bg)",
                      color: "var(--text-muted)",
                    }}
                  >
                    ⏱ Executed in {executionTime.toFixed(2)}s
                  </div>
                )}
              </div>
            )}
            {collapsedCells.includes(executionCount || -1) && (
              <div
                className="p-4 text-xs italic"
                style={{ color: "var(--text-muted)" }}
              >
                Code cell collapsed
              </div>
            )}
          </div>
        )}

        {type === "markdown" && (
          <div
            className="p-2 sm:p-4 prose prose-sm sm:prose max-w-none"
            style={{ color: "var(--text-primary)" }}
          >
            {children}
          </div>
        )}

        {type === "output" && (
          <div
            className="relative"
            style={{
              backgroundColor: "var(--output-bg)",
              borderTop: "1px solid var(--output-border)",
            }}
          >
            <div className="p-2 sm:p-4">{children}</div>
          </div>
        )}
      </div>

      {/* Right Gutter for Cell Actions */}
      <div className="flex-shrink-0 w-4 sm:w-8 flex items-start justify-center pt-2">
        {/* Cell action buttons - show on hover */}
        {isHovered && type !== "output" && (
          <div className="flex flex-col gap-1">
            {/* Run single cell button */}
            {type === "code" && executionCount && (
              <button
                className="p-1 rounded hover:bg-opacity-80 transition-opacity"
                style={{
                  backgroundColor: "var(--cell-hover-bg)",
                  color: "var(--text-secondary)",
                }}
                title="Run cell"
                onClick={(e) => {
                  e.stopPropagation();
                  runSingleCell(executionCount);
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotebookCell;
