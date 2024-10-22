"use client";

import { useState } from "react";
import IOPSChart from "../components/IOPSChart";
import Select from "../components/Select";
import ThroughputChart from "../components/ThroughputChart";
export default function PerformanceMetrics() {

  const [selectedValue, setSelectedValue] = useState("1year");

  const options = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "1year", label: "Last 1 year" },
  ];

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const clusterId = 'b4d72bfc-1aba-4f6a-9f96-f07b18ab5d7b';
  const startDate = '2024-10-01';
  const endDate = '2024-10-21';
  const interval = '1h';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-21 font-bold text-gray-200">Performance Metrics</h1>
        <Select
          options={options}
          selectedValue={selectedValue}
          onChange={handleSelectChange}
        />
      </div>
      <IOPSChart clusterId={clusterId} startDate={startDate} endDate={endDate} interval={interval} />
      <ThroughputChart clusterId={clusterId} startDate={startDate} endDate={endDate} interval={interval} />
    </div>
  );
}
