"use client";

interface CustomLegendProps {
  title: string;
  readLabel: string;
  readValue: string | number;
  writeLabel: string;
  writeValue: string | number;
}

export default function CustomLegend({ title, readLabel, readValue, writeLabel, writeValue }: CustomLegendProps) {
  return (
    <div className="mt-4 p-4 border border-gray-700 rounded-md text-gray-300 min-w-[250px] ml-2 mt-10">
      <h3 className="text-white text-xl mb-4">{title}</h3>
      <div className="flex flex-col mb-4">
        <span className="text-gray-400">{readLabel}</span>
        <span className="text-purple-500 text-2xl">{readValue}</span>
      </div>
      <hr className="border-gray-700 mb-4" />
      <div className="flex flex-col">
        <span className="text-gray-400">{writeLabel}</span>
        <span className="text-teal-500 text-2xl">{writeValue}</span>
      </div>
    </div>
  );
}
