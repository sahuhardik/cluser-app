import SnapshotPolicy from '../models/SnapshotPolicy.js';

export default class SnapshotPolicyService {
  public async getSnapshotPolicyByUserId(userId: string) {
    const policy = await SnapshotPolicy.findBy('userId', userId)
    
    // Note: We can create custom API error classes like NotFoundException, BadRequestException, etc.,
    // and throw them. Then, implement an error-handling middleware that will generate the appropriate response format and status based on the error class.
    // if (!policy) {
    //   throw new Error('Snapshot policy not found for the user'); 
    // }
    return policy;
  }

  public async upsertSnapshotPolicy(userId: string, policyData: any) {
    let policy = await SnapshotPolicy.findBy('userId', userId)

    if (policy) {
      policy.merge(policyData);
      await policy.save();
    } else {
      policy = await SnapshotPolicy.create({ userId, ...policyData, selectedDays: '[]' });
    }
    return policy;
  }
}
