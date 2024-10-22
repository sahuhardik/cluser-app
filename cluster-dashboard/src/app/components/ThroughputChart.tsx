"use client";

import PerformanceChart from "../components/PerformanceChart";
import { useEffect, useState } from 'react';
import { useThroughputData, ThroughputResponse } from "../services/performanceMetrics";
import { formatBytes } from "../utils/conversions";

interface ThroughputChartProps {
  clusterId: string;
  startDate: string;
  endDate: string;
  interval: string;
}

export default function ThroughputChart({ clusterId, startDate, endDate, interval }: ThroughputChartProps) {
  const [chartData, setChartData] = useState<ThroughputResponse[] | null>(null);

  const { data, isLoading, error } = useThroughputData(clusterId, startDate, endDate, interval);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  if (isLoading || !chartData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load data.</div>;
  }

  const { totalReads, totalWrites } = chartData.reduce((acc, throughputData) => {
    return {
      totalReads: throughputData.throughputRead + acc.totalReads,
      totalWrites: throughputData.throughputWrite + acc.totalWrites,
    }
  }, {
    totalReads: 0,
    totalWrites: 0,
  })

  return (
    <PerformanceChart
      title="Throughput"
      data={chartData}
      lines={[
        { dataKey: "throughputRead", stroke: "#8884d8", name: "Read" },
        { dataKey: "throughputWrite", stroke: "#82ca9d", name: "Write" },
      ]}
      xAxisKey="timeSlot"
      legendReadLabel="Read"
      legendReadValue={`${formatBytes(totalReads/chartData.length)}/s`}
      legendWriteLabel="Write"
      legendWriteValue={`${formatBytes(totalWrites/chartData.length)}/s`}
    />
  );
}
