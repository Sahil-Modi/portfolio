"use client";

import React, { useState } from "react";

const DataPlayground = () => {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOutput("Objection");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section id="playground" className="py-16 px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
          Data Playground
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Interactive input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Input Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="inttext -inut"
                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Output
              </label>
              <div className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 min-h-[100px] flex items-center">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">
                    {output || "Objection"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                  Upload
                </span>
              </label>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
              >
                Upload
              </button>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                Object
              </button>
            </div>
          </div>

          {/* Right side - Embedded Dashboard */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Embedded Dashboard
            </h3>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                NLP Trends in Indian Startups
              </h4>

              {/* Chart placeholder */}
              <div className="h-48 flex items-end justify-center space-x-2">
                {[20, 35, 25, 45, 55, 40, 65].map((height, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${height}%`,
                      width: "30px",
                    }}
                  ></div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <div className="text-xs text-slate-500 dark:text-slate-400 space-x-4">
                  <span>2018</span>
                  <span>2019</span>
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataPlayground;
