"use client";

import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const KeyboardShortcutsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // H: Show keyboard shortcuts
  useHotkeys(
    "h",
    (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnFormTags: false }
  );

  // Esc: Close modal
  useHotkeys(
    "escape",
    () => {
      setIsOpen(false);
    },
    { enabled: isOpen, enableOnFormTags: true }
  );

  if (!isOpen) return null;

  const shortcuts = [
    { key: "Shift + Enter", description: "Run all cells" },
    { key: "1", description: "Go to Hero section" },
    { key: "2", description: "Go to About section" },
    { key: "3", description: "Go to Projects section" },
    { key: "4", description: "Go to Contact section" },
    { key: "I, I", description: "Interrupt kernel" },
    { key: "0, 0", description: "Restart kernel" },
    { key: "H", description: "Show keyboard shortcuts" },
    { key: "Esc", description: "Close dialog" },
  ];

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="max-w-2xl w-full mx-4 rounded-lg shadow-lg"
        style={{
          backgroundColor: "var(--notebook-bg)",
          border: "1px solid var(--cell-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--cell-border)" }}
        >
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "var(--cell-hover-bg)",
              color: "var(--text-secondary)",
            }}
          >
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
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span
                  className="text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {shortcut.description}
                </span>
                <kbd
                  className="px-3 py-1 rounded text-sm font-mono"
                  style={{
                    backgroundColor: "var(--code-bg)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--cell-border)",
                  }}
                >
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t"
          style={{ borderColor: "var(--cell-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Press <kbd>Esc</kbd> to close this dialog
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;