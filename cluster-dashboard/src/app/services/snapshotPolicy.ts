import axiosClient from './axiosClient';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface SnapshotPolicy {
  policyName: string;
  directory: string;
  scheduleType: string;
  timeZone: string;
  snapshotTime: string;
  days: string[];
  deleteOption: string;
  deleteAfterDays: number;
  snapshotLocking: boolean;
  enablePolicy: boolean;
}

export const fetchSnapshotPolicy = async (userId: string): Promise<SnapshotPolicy> => {
  const response = await axiosClient.get<SnapshotPolicy>('/snapshot-policy', {
    params: {
      userId,
    },
  });
  return response.data;
};

export const useSnapshotPolicy = (userId: string): UseQueryResult<SnapshotPolicy, Error> => {
  return useQuery<SnapshotPolicy, Error>(
    {
      queryKey: ['snapshotPolicy', userId],
      queryFn: () => fetchSnapshotPolicy(userId),
      enabled: !!userId
    }
  );
};

export const upsertSnapshotPolicy = async (userId: string, policyData: SnapshotPolicy): Promise<SnapshotPolicy> => {
  const response = await axiosClient.put<SnapshotPolicy>('/snapshot-policy', {
    userId,
    ...policyData,
    snapshotTime: '12:00',
    days: [],
    deleteOption: 'afterDays',
    snapshotLocking: true
  });
  return response.data;
};
