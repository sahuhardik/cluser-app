import vine from '@vinejs/vine';
import { IntervalEnum } from '../enums.js';

/**
 * Validates the request for fetching performance metrics (IOPS and Throughput)
 */
export const metricsRequestValidator = vine.compile(
  vine.object({
    clusterId: vine.string().trim(),  // Cluster ID for which user wanted matrices
    startDate: vine.date(),
    endDate: vine.date(),
    interval: vine.enum(Object.values(IntervalEnum))
  })
);
