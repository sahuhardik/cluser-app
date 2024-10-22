import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cluster from '../../app/models/Cluster.js';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

/**
 * Seeder for populating the 'clusters' table with 3 random cluster entries.
 * 
 * Each cluster is given a unique UUID, a random name, status (active/inactive), and a description.
 */
export default class ClusterSeeder extends BaseSeeder {
  public async run() {
    const clusters = [
      {
        id: uuidv4(),
        name: faker.company.name(),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        description: faker.lorem.sentence(),
      },
      {
        id: uuidv4(),
        name: faker.company.name(),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        description: faker.lorem.sentence(),
      },
      {
        id: uuidv4(),
        name: faker.company.name(),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        description: faker.lorem.sentence(),
      },
    ];

    await Cluster.createMany(clusters);
  }
}
