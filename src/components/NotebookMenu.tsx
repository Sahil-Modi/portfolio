"use client";

import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  label: string;
  shortcut?: string;
  action: () => void;
  separator?: boolean;
  disabled?: boolean;
}

interface MenuProps {
  label: string;
  items: MenuItem[];
}

const NotebookMenu: React.FC<MenuProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm font-medium transition-colors rounded"
        style={{
          color: "var(--text-primary)",
          backgroundColor: isOpen ? "var(--cell-hover-bg)" : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = "var(--cell-hover-bg)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {label}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 min-w-48 py-1 rounded shadow-lg border z-50"
          style={{
            backgroundColor: "var(--notebook-bg)",
            borderColor: "var(--cell-border)",
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.separator ? (
                <div
                  className="my-1 h-px"
                  style={{ backgroundColor: "var(--cell-border)" }}
                />
              ) : (
                <button
                  onClick={() => {
                    if (!item.disabled) {
                      item.action();
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className="w-full px-4 py-2 text-left text-sm flex items-center justify-between transition-colors"
                  style={{
                    color: item.disabled
                      ? "var(--text-secondary)"
                      : "var(--text-primary)",
                    opacity: item.disabled ? 0.5 : 1,
                    cursor: item.disabled ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      e.currentTarget.style.backgroundColor =
                        "var(--cell-hover-bg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span
                      className="text-xs ml-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.shortcut}
                    </span>
                  )}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotebookMenu;