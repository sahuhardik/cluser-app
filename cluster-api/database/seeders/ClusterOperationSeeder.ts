import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { ClusterOperationType } from '../../app/enums.js';
import ClusterOperation from '../../app/models/ClusterOperation.js';
import Cluster from '../../app/models/Cluster.js';


/**
 * Seeder for populating the 'clusterOperations' table with 10,000 random read/write operations.
 * 
 * Each operation is randomly assigned a cluster, operation type (read/write),
 * random number of bytes, and a timestamp between October 1, 2024, and October 21, 2024.
 * 
 * This seeder fetches the cluster IDs from the 'clusters' table and ensures that
 * each operation is associated with one of those clusters.
 */
export default class ClusterOperationSeeder extends BaseSeeder {

  // Number of rows we want to insert
  private static readonly NUM_OPERATIONS = 100000;

  private static readonly START_DATE = DateTime.fromISO('2024-10-01T00:00:00');
  private static readonly END_DATE = DateTime.fromISO('2024-10-21T23:59:59');

  /**
   * Runs the seeder to insert 100,000 random entries into the 'clusterOperations' table.
   */
  public async run() {
    const clusterIds = await this.getClusterIds();
    const operations = this.generateOperations(clusterIds);
    await ClusterOperation.createMany(operations);
  }

  /**
   * Fetch all cluster IDs from the 'clusters' table.
   * @returns {Promise<string[]>} Array of cluster IDs.
   */
  private async getClusterIds(): Promise<string[]> {
    const clusters = await Cluster.query().select('id');  // Fetch only the 'id' field
    return clusters.map(cluster => cluster.id);  // Return an array of IDs
  }

  /**
   * Generate a random date between the start and end date.
   * @param {DateTime} start - The start date of the range.
   * @param {DateTime} end - The end date of the range.
   * @returns {DateTime} - A randomly generated date within the range.
   */
  private getRandomDate(start: DateTime, end: DateTime): DateTime {
    const diff = end.diff(start, 'milliseconds').milliseconds;
    const randomMillis = Math.floor(Math.random() * diff);
    return start.plus({ milliseconds: randomMillis });
  }

  /**
   * Generate an array of operation data.
   * @param {string[]} clusterIds - Array of cluster IDs to randomly assign to operations.
   * @returns {Array<Object>} Array of objects representing operations.
   */
  private generateOperations(clusterIds: string[]): Array<object> {
    const operations = [];

    for (let i = 0; i < ClusterOperationSeeder.NUM_OPERATIONS; i++) {
      const operationType = Math.random() < 0.65 ? ClusterOperationType.READ : ClusterOperationType.WRITE; // wanted 35% write operation and 65% read operations
      const bytes = faker.number.int({ min: 1024, max: 10*1024 * 1024 }); // Bytes between 1KB to 10KB
      const duration = faker.number.float({ min: 50, max: 2000 });  // Duration between 50ms to 2s
      const operationTimestamp = this.getRandomDate(
        ClusterOperationSeeder.START_DATE, 
        ClusterOperationSeeder.END_DATE
      );
      const clusterId = faker.helpers.arrayElement(clusterIds);

      operations.push({
        id: uuidv4(),
        clusterId,
        operationType,
        bytes,
        duration,
        createdAt: operationTimestamp,
        updatedAt: operationTimestamp,
      });
    }

    return operations;
  }
}
