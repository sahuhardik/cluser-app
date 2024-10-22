import PerformanceMetricsService from '../app/services/performance_metrice_service.js';
import { DateTime } from 'luxon';
import { IntervalEnum } from '../app/enums.js';
import ClusterOperation from '../app/models/ClusterOperation.js';

jest.mock('../models/ClusterOperation');
jest.mock('@adonisjs/lucid/services/db');

describe('PerformanceMetricsService', () => {
  let performanceMetricsService: PerformanceMetricsService;

  beforeEach(() => {
    performanceMetricsService = new PerformanceMetricsService();
  });

  describe('calculateIOPS', () => {
    it('should calculate IOPS for a given cluster and interval', async () => {
      const clusterId = '4966664c-2f1e-4dd4-9dab-384db00dbad6';
      const startDate = DateTime.local(2024, 10, 1);
      const endDate = DateTime.local(2024, 10, 21);
      const interval = IntervalEnum['1_HOUR'];

      const expectedResult = [
        {
          timeSlot: '2024-10-01 00:00:00',
          iopsRead: 200,
          iopsWrite: 150,
        },
        {
          timeSlot: '2024-10-01 01:00:00',
          iopsRead: 300,
          iopsWrite: 100,
        },
      ];

      const mockData = [
        {
          $extras: {
            time_interval: '2024-10-01 00:00:00',
            readMetric: 200,
            writeMetric: 150,
          },
        },
        {
          $extras: {
            time_interval: '2024-10-01 01:00:00',
            readMetric: 300,
            writeMetric: 100,
          },
        },
      ];

      (ClusterOperation.query as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(mockData),
      });

      const result = await performanceMetricsService.calculateIOPS(
        clusterId,
        startDate,
        endDate,
        interval
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe('calculateThroughput', () => {
    it('should calculate throughput for a given cluster and interval', async () => {
      const clusterId = '4966664c-2f1e-4dd4-9dab-384db00dbad6';
      const startDate = DateTime.local(2024, 10, 1);
      const endDate = DateTime.local(2024, 10, 21);
      const interval = IntervalEnum['1_HOUR'];

      const expectedResult = [
        {
          timeSlot: '2024-10-01 00:00:00',
          throughputRead: 5000,
          throughputWrite: 3000,
        },
        {
          timeSlot: '2024-10-01 01:00:00',
          throughputRead: 8000,
          throughputWrite: 2000,
        },
      ];

      const mockData = [
        {
          $extras: {
            time_interval: '2024-10-01 00:00:00',
            readMetric: 5000,
            writeMetric: 3000,
          },
        },
        {
          $extras: {
            time_interval: '2024-10-01 01:00:00',
            readMetric: 8000,
            writeMetric: 2000,
          },
        },
      ];

      (ClusterOperation.query as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(mockData),
      });

      const result = await performanceMetricsService.calculateThroughput(
        clusterId,
        startDate,
        endDate,
        interval
      );

      expect(result).toEqual(expectedResult);
    });
  });
});
