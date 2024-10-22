import User from '#models/User';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany(
      [
        ...Array.from({ length: 10 }).map(() => ({
          id: uuidv4(),
          name: faker.name.fullName(),
          email: faker.internet.email(),
        })),
        {
          id: '5bce40c4-c67a-4e27-9453-9d8ff81bb49b',
          name: 'Hardik Sahu',
          email: 'sahuhardic@gmail.com'
        }
      ]
    );
  }
}
