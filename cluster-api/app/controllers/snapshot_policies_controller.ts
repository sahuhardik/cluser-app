import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import SnapshotPolicyService from '../services/snapshot_policy_service.js';
import { getPolicyValidator, putSnapshotPolicyValidator } from '#validators/snapshot_policy';

@inject()
export default class SnapshotPolicyController {
  constructor(private snapshotPolicyService: SnapshotPolicyService) {}

  public async getSnapshotPolicy({ request, response }: HttpContext) {
    const userId = request.input('userId');
    
    await getPolicyValidator.validate({ userId });

    const policy = await this.snapshotPolicyService.getSnapshotPolicyByUserId(userId);

    return response.json(policy);
  }

  public async upsertSnapshotPolicy({ request, response }: HttpContext) {
    
    const userId = request.input('userId');
    const data = request.all()
    
    await putSnapshotPolicyValidator.validate({...data, userId })
    
    const policyData = request.only(['policyName', 'directory', 'scheduleType', 'timeZone', 'snapshotTime', 'deleteOption', 'enablePolicy']);
    try {
      const updatedPolicy = await this.snapshotPolicyService.upsertSnapshotPolicy(userId, policyData);
      return response.json({ data: updatedPolicy });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}