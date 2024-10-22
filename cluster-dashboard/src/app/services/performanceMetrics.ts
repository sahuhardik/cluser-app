import { ChartData } from '../components/PerformanceChart';
import axiosClient from './axiosClient';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface IOPSResponse extends ChartData {
  timeSlot: string;
  iopsRead: number;
  iopsWrite: number;
}

export interface ThroughputResponse extends ChartData {
  timeSlot: string;
  throughputRead: number;
  throughputWrite: number;
}

export const fetchIOPSData = async (
  clusterId: string,
  startDate: string,
  endDate: string,
  interval: string
): Promise<IOPSResponse[]> => {
  const response = await axiosClient.get<IOPSResponse[]>('/performance-metrices/iops', {
    params: {
      clusterId,
      startDate,
      endDate,
      interval,
    },
  });
  return response.data;
};

export const useIOPSData = (
  clusterId: string,
  startDate: string,
  endDate: string,
  interval: string
): UseQueryResult<IOPSResponse[], Error> => {
  return useQuery<IOPSResponse[], Error>({
    queryKey: ['iopsData', clusterId, startDate, endDate, interval], 
    queryFn: () => fetchIOPSData(clusterId, startDate, endDate, interval)
  });
};

export const fetchThroughputData = async (
  clusterId: string,
  startDate: string,
  endDate: string,
  interval: string
): Promise<ThroughputResponse[]> => {
  const response = await axiosClient.get<ThroughputResponse[]>('/performance-metrices/throughput', {
    params: {
      clusterId,
      startDate,
      endDate,
      interval,
    },
  });
  return response.data;
};

export const useThroughputData = (
  clusterId: string,
  startDate: string,
  endDate: string,
  interval: string
): UseQueryResult<ThroughputResponse[], Error> => {
  return useQuery<ThroughputResponse[], Error>({
    queryKey: ['throughputData', clusterId, startDate, endDate, interval],
    queryFn: () => fetchThroughputData(clusterId, startDate, endDate, interval),
  });
};
