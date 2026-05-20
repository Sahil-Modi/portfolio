"use client";

import React from "react";

interface ToolbarProps {
  onSave?: () => void;
  onAddCell?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onRun?: () => void;
  onStop?: () => void;
  onRestart?: () => void;
  cellType?: string;
  onCellTypeChange?: (type: string) => void;
}

const NotebookToolbar: React.FC<ToolbarProps> = ({
  onSave,
  onAddCell,
  onCut,
  onCopy,
  onPaste,
  onRun,
  onStop,
  onRestart,
  cellType = "Code",
  onCellTypeChange,
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      const toast = document.createElement("div");
      toast.textContent = "Portfolio autosaved!";
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
    }
  };

  const handleAddCell = () => {
    if (onAddCell) {
      onAddCell();
    } else {
      const toast = document.createElement("div");
      toast.textContent = "Cell insertion disabled in portfolio view";
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

  const handleRun = () => {
    if (onRun) {
      onRun();
    }
  };

  return (
    <div
      className="flex items-center gap-1 px-2 py-2 border-b overflow-x-auto"
      style={{
        backgroundColor: "var(--toolbar-bg)",
        borderColor: "var(--toolbar-border)",
      }}
    >
      {/* Save Button */}
      <button
        onClick={handleSave}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Save and Checkpoint"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>

      {/* Add Cell Button */}
      <button
        onClick={handleAddCell}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Insert cell below"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Separator */}
      <div
        className="w-px h-6 mx-1"
        style={{ backgroundColor: "var(--notebook-border)" }}
      />

      {/* Cut */}
      <button
        onClick={onCut || (() => {})}
        disabled={!onCut}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0 disabled:opacity-30"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Cut selected cells"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
        </svg>
      </button>

      {/* Copy */}
      <button
        onClick={onCopy || (() => {})}
        disabled={!onCopy}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0 disabled:opacity-30"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Copy selected text"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>

      {/* Paste */}
      <button
        onClick={onPaste || (() => {})}
        disabled={!onPaste}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0 disabled:opacity-30"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Paste cells below"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      </button>

      {/* Separator */}
      <div
        className="w-px h-6 mx-1"
        style={{ backgroundColor: "var(--notebook-border)" }}
      />

      {/* Run Button */}
      <button
        onClick={handleRun}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Run selected cells"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>

      {/* Stop Button */}
      <button
        onClick={onStop}
        disabled={!onStop}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Interrupt kernel"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      </button>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        disabled={!onRestart}
        className="p-1.5 rounded hover:opacity-80 transition-opacity flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: "var(--cell-bg)" }}
        title="Restart kernel"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="1 4 1 10 7 10" />
          <polyline points="23 20 23 14 17 14" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
      </button>

      {/* Separator */}
      <div
        className="w-px h-6 mx-1"
        style={{ backgroundColor: "var(--notebook-border)" }}
      />

      {/* Cell Type Dropdown */}
      <select
        value={cellType}
        onChange={(e) => onCellTypeChange && onCellTypeChange(e.target.value)}
        className="px-2 py-1 text-xs rounded border cursor-pointer"
        style={{
          backgroundColor: "var(--cell-bg)",
          color: "var(--text-primary)",
          borderColor: "var(--cell-border)",
        }}
        title="Cell type"
      >
        <option value="Code">Code</option>
        <option value="Markdown">Markdown</option>
        <option value="Raw">Raw NBConvert</option>
      </select>

      {/* Separator */}
      <div
        className="w-px h-6 mx-1 hidden md:block"
        style={{ backgroundColor: "var(--notebook-border)" }}
      />

      {/* Keyboard Shortcuts */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1 text-xs rounded"
        style={{
          backgroundColor: "var(--prompt-bg)",
          color: "var(--text-muted)",
        }}
      >
        <kbd
          className="px-1.5 py-0.5 rounded text-xs font-mono"
          style={{
            backgroundColor: "var(--cell-bg)",
            borderColor: "var(--cell-border)",
            border: "1px solid",
          }}
        >
          H
        </kbd>
        <span>Keyboard Shortcuts</span>
      </div>
    </div>
  );
};

export default NotebookToolbar;
