"use client";

import { useEffect, useState } from 'react';
import { useIOPSData, IOPSResponse } from "../services/performanceMetrics";
import PerformanceChart from "./PerformanceChart";
import { formatNumber } from '../utils/conversions';

interface IOPSChartProps {
  clusterId: string;
  startDate: string;
  endDate: string;
  interval: string;
}

export default function IOPSChart({ clusterId, startDate, endDate, interval }: IOPSChartProps) {
  const [chartData, setChartData] = useState<IOPSResponse[] | null>(null);

  const { data, isLoading, error } = useIOPSData(clusterId, startDate, endDate, interval);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  if (error) {
    return <div>Failed to load data.</div>;
  }

  if (isLoading || !chartData) {
    return <div>Loading...</div>;
  }

  const { totalReads, totalWrites } = chartData.reduce((acc, iops) => {
    return {
      totalReads: iops.iopsRead + acc.totalReads,
      totalWrites: iops.iopsWrite + acc.totalWrites,
    }
  }, {
    totalReads: 0,
    totalWrites: 0,
  });

  return (
    <PerformanceChart
      title="IOPS"
      data={chartData}
      xAxisKey="timeSlot"
      lines={[
        { dataKey: "iopsRead", stroke: "#8884d8", name: "Read" },
        { dataKey: "iopsWrite", stroke: "#82ca9d", name: "Write" },
      ]}
      legendReadLabel="Read"
      legendReadValue={`${formatNumber(totalReads)} IOPS`}
      legendWriteLabel="Write"
      legendWriteValue={`${formatNumber(totalWrites)} IOPS`}
    />
  );
}
