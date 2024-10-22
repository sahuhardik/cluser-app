"use client";

import { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Select({ options, selectedValue, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  const selectedLabel = options.find(option => option.value === selectedValue)?.label || "Select an option";

  return (
    <div className="relative inline-block text-left w-48">
      <button
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
        className="inline-flex justify-between items-center w-full bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-600"
      >
        {selectedLabel}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
