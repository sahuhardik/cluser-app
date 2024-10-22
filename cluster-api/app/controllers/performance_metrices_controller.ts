import { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';
import { inject } from '@adonisjs/fold';

import { metricsRequestValidator } from '../validators/performance_metrice.js';
import PerformanceMetricsService from '../services/performance_metrice_service.js';

@inject()
export default class PerformanceMetricesController {
  // Injecting PerformanceMetricsService via the constructor, (DI)
  constructor(private performanceMetricsService: PerformanceMetricsService) {}

  /**
   * Fetch IOPS (Input/Output Operations per Second) for a cluster within a given time range.
   */
  public async getIOPS({ request, response }: HttpContext) {

    // Note: To prevent overwhelming the response with excessive data, this API should be implemented with pagination for data-intensive applications.
   
    // Note: Additionally, the API should enforce restrictions based on a specified date range, which will vary according to business requirements.
   
    // Note: By analyzing the data requests, we can implement caching for the outputs using the cluster ID, start date, and end date.
    // This approach allows us to leverage previously calculated data for new requests. 
    // For example, if we've already calculated metrics for the date range from October 1, 2024, to October 15, 2024, and then receive a new request for the range from October 1, 2024, to October 20, 2024, we can fetch the data for October 16 to October 20 and aggregate it with the existing results.
    // This strategy reduces the database workload by avoiding large row queries. However, this solution's effectiveness depends on the request patterns we observe, as it may introduce overhead if such patterns are not consistent. The implementation of this solution should consider various factors.


    const data = request.all()
    const payload = await metricsRequestValidator.validate(data)

    const { clusterId, startDate, endDate, interval } = payload;

    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);

    // Fetch only the IOPS metric from the service
    const iops = await this.performanceMetricsService.calculateIOPS(clusterId, start, end, interval);

    return response.json(iops);
  }

  /**
   * Fetch throughput (MBps) for a cluster within a given time range.
   */
  public async getThroughput({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await metricsRequestValidator.validate(data)

    const { clusterId, startDate, endDate, interval } = payload;

    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);

    // Fetch only the throughput metric from the service
    const throughput = await this.performanceMetricsService.calculateThroughput(clusterId, start, end, interval);

    return response.json(throughput);
  }
}
