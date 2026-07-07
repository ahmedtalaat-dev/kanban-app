"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  { name: "Blue", value: "bg-blue-100 dark:bg-blue-900" },
  { name: "Red", value: "bg-red-100 dark:bg-red-900" },
  { name: "Green", value: "bg-green-100 dark:bg-green-900" },
  { name: "Purple", value: "bg-purple-100 dark:bg-purple-900" },
  { name: "Yellow", value: "bg-yellow-100 dark:bg-yellow-900" },
  { name: "Pink", value: "bg-pink-100 dark:bg-pink-900" },
  { name: "Cyan", value: "bg-cyan-100 dark:bg-cyan-900" },
  { name: "Orange", value: "bg-orange-100 dark:bg-orange-900" },
];

export function ColorPicker({
  value,
  onChange,
  label = "Color",
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customHex, setCustomHex] = useState("#3b82f6");

  const handlePresetClick = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div
          className={`w-6 h-6 rounded border border-slate-300 dark:border-slate-600 ${value}`}
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 w-64">
          <div className="space-y-4">
            {/* Preset Colors */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                Presets
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handlePresetClick(color.value)}
                    className={`w-full h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                      value === color.value
                        ? "border-slate-900 dark:border-slate-100 shadow-md"
                        : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                    } ${color.value}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
