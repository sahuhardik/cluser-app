import ClusterOperation from '../models/ClusterOperation.js';
import Database from '@adonisjs/lucid/services/db';
import { DateTime } from 'luxon';
import { IntervalEnum, ClusterOperationType } from '../enums.js';

export default class PerformanceMetricsService {

  /**
   * Calculate IOPS (Input/Output Operations per Second) for a given cluster,
   * grouped by the specified interval, separated into read and write counts.
   *
   * @param clusterId The cluster ID for which metrics are calculated.
   * @param startDate The start date of the time range.
   * @param endDate The end date of the time range.
   * @param interval The time interval to group data (e.g., '30s', '1m', '1h').
   * @returns An array of IOPS data grouped by the specified interval.
   */
  public async calculateIOPS(clusterId: string, startDate: DateTime, endDate: DateTime, interval: IntervalEnum) {
    const dbInterval = this.getDbInterval(interval);
    
    // Note: We are calculating the iops count for each time slot directly in the database query itself, 
    // which avoids having to pull the entire dataset into Node.js for processing.
    const iopsData = await ClusterOperation
      .query()
      .select(
        Database.raw(`strftime('${dbInterval}', created_at) AS time_interval`),
        Database.raw(`count(*) FILTER (WHERE operation_type = '${ClusterOperationType.READ}') AS readMetric`),
        Database.raw(`count(*) FILTER (WHERE operation_type = '${ClusterOperationType.WRITE}') AS writeMetric`)
      )
      .where('cluster_id', clusterId)
      .andWhere('created_at', '>=', startDate.toISO() as string)
      .andWhere('created_at', '<=', endDate.toISO() as string)
      .groupBy('time_interval')
      .orderBy('time_interval', 'asc');

    return this.processMetricsData(iopsData, startDate, endDate, interval, 'IOPS');
  }

  /**
   * Calculate Throughput for a given cluster,
   * grouped by the specified interval, separated into read and write throughput.
   *
   * @param clusterId The cluster ID for which metrics are calculated.
   * @param startDate The start date of the time range.
   * @param endDate The end date of the time range.
   * @param interval The time interval to group data (e.g., '30s', '1m', '1h').
   * @returns An array of Throughput data grouped by the specified interval.
   */
  public async calculateThroughput(clusterId: string, startDate: DateTime, endDate: DateTime, interval: IntervalEnum) {
    const dbInterval = this.getDbInterval(interval);

    // Note: We are calculating the byte count for each time slot directly in the database query itself, 
    // which avoids having to pull the entire dataset into Node.js for processing.
    const throughputData = await ClusterOperation
      .query()
      .select(
        Database.raw(`strftime('${dbInterval}', created_at) AS time_interval`),
        Database.raw(`sum(bytes) FILTER (WHERE operation_type = '${ClusterOperationType.READ}') AS readMetric`),
        Database.raw(`sum(bytes) FILTER (WHERE operation_type = '${ClusterOperationType.WRITE}') AS writeMetric`)
      )
      .where('cluster_id', clusterId)
      .andWhere('created_at', '>=', startDate.toISO() as string)
      .andWhere('created_at', '<=', endDate.toISO() as string)
      .groupBy('time_interval')
      .orderBy('time_interval', 'asc');

    return this.processMetricsData(throughputData, startDate, endDate, interval, 'Throughput');
  }

  private processMetricsData(data: any[], startDate: DateTime, endDate: DateTime, interval: IntervalEnum, metricType: string) {
    // Generate the complete time series for the required interval
    const completeTimeSeries = this.generateTimeSeries(startDate, endDate, this.getIntervalInSeconds(interval));

    // Create a map for read and write metrics for easier lookup
    const metricsMap = new Map(data.map(row => [row.$extras.time_interval, {
      read: row.$extras.readMetric || 0,
      write: row.$extras.writeMetric || 0,
    }]));

    // Prepare the final result
    const result = completeTimeSeries.map(time => ({
      timeSlot: time,
      [`${metricType.toLowerCase()}Read`]: metricsMap.get(time)?.read || 0,
      [`${metricType.toLowerCase()}Write`]: metricsMap.get(time)?.write || 0,
    }));

    return result;
  }

  private generateTimeSeries(startDate: DateTime, endDate: DateTime, intervalInSeconds: number): string[] {
    const series = [];
    let current = startDate;

    while (current <= endDate) {
      series.push(current.toFormat('yyyy-MM-dd HH:mm:ss')); 
      current = current.plus({ seconds: intervalInSeconds });  // Increment by the specified interval
    }

    return series;
  }

  private getDbInterval(interval: IntervalEnum): string {
    const dbIntervals: Record<IntervalEnum, string> = {
      [IntervalEnum['30_SECONDS']]: '%Y-%m-%d %H:%M:%S',
      [IntervalEnum['1_MINUTE']]: '%Y-%m-%d %H:%M:00',
      [IntervalEnum['5_MINUTES']]: '%Y-%m-%d %H:%M:00',
      [IntervalEnum['15_MINUTES']]: '%Y-%m-%d %H:%M:00',
      [IntervalEnum['30_MINUTES']]: '%Y-%m-%d %H:%M:00',
      [IntervalEnum['1_HOUR']]: '%Y-%m-%d %H:00:00',
      [IntervalEnum['8_HOURS']]: '%Y-%m-%d %H:00:00',
      [IntervalEnum['1_DAY']]: '%Y-%m-%d 00:00:00',
      [IntervalEnum['15_DAYS']]: '%Y-%m-%d 00:00:00',
      [IntervalEnum['1_WEEK']]: '%Y-%m-%d 00:00:00',
      [IntervalEnum['1_MONTH']]: '%Y-%m-01 00:00:00',
    };

    return dbIntervals[interval] || '%Y-%m-%d %H:%M:00';  // Default to minute grouping
  }

  private getIntervalInSeconds(interval: IntervalEnum): number {
    const timeScales: Record<IntervalEnum, number> = {
      [IntervalEnum['30_SECONDS']]: 30,
      [IntervalEnum['1_MINUTE']]: 60,
      [IntervalEnum['5_MINUTES']]: 5 * 60,
      [IntervalEnum['15_MINUTES']]: 15 * 60,
      [IntervalEnum['30_MINUTES']]: 30 * 60,
      [IntervalEnum['1_HOUR']]: 60 * 60,
      [IntervalEnum['8_HOURS']]: 8 * 60 * 60,
      [IntervalEnum['1_DAY']]: 24 * 60 * 60,
      [IntervalEnum['15_DAYS']]: 15 * 24 * 60 * 60,
      [IntervalEnum['1_WEEK']]: 7 * 24 * 60 * 60,
      [IntervalEnum['1_MONTH']]: 30 * 24 * 60 * 60,
    };

    return timeScales[interval] || 60;  // Default to 1 minute if no interval matches
  }
}
