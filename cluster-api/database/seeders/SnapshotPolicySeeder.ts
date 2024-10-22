import SnapshotPolicy from '#models/SnapshotPolicy'
import { BaseSeeder } from '@adonisjs/lucid/seeders'


export default class SnapshotPolicySeeder extends BaseSeeder {
  public async run () {
    await SnapshotPolicy.createMany([
      {
        userId: 'user1',
        policyName: 'ProjectX_Daily',
        directory: '/Production/ProjectX',
        scheduleType: 'Daily or Weekly',
        timeZone: 'America/Los_Angeles',
        snapshotTime: '07:00:00',
        selectedDays: JSON.stringify(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
        deleteOption: 'afterDays',
        deleteAfterDays: 99,
        enableLockedSnapshots: false,
        enablePolicy: true,
      },
      {
        userId: 'user2',
        policyName: 'BackupPolicy_Weekly',
        directory: '/Production/Backup',
        scheduleType: 'Daily or Weekly',
        timeZone: 'America/New_York',
        snapshotTime: '23:00:00',
        selectedDays: JSON.stringify(['Sat', 'Sun']),
        deleteOption: 'never',
        deleteAfterDays: null,
        enableLockedSnapshots: true,
        enablePolicy: true,
      },
    ])
  }
}