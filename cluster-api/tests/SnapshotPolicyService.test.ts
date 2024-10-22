import SnapshotPolicyService from '../app/services/snapshot_policy_service.js';
import SnapshotPolicy from '../app/models/SnapshotPolicy.js';

jest.mock('../models/SnapshotPolicy.js');

describe('SnapshotPolicyService', () => {
  let snapshotPolicyService: SnapshotPolicyService;

  beforeEach(() => {
    snapshotPolicyService = new SnapshotPolicyService();
    jest.clearAllMocks();
  });

  describe('getSnapshotPolicyByUserId', () => {
    it('should return the snapshot policy if it exists', async () => {
      const userId = '5bce40c4-c67a-4e27-9453-9d8ff81bb49b';
      const mockPolicy = {
        id: 1,
        userId,
        policyName: 'Test Policy',
        directory: '/test/directory',
      };

      (SnapshotPolicy.findBy as jest.Mock).mockResolvedValue(mockPolicy);

      const result = await snapshotPolicyService.getSnapshotPolicyByUserId(userId);

      expect(SnapshotPolicy.findBy).toHaveBeenCalledWith('userId', userId);
      expect(result).toEqual(mockPolicy);
    });

    it('should throw an error if snapshot policy is not found', async () => {
      const userId = '1177044e-0948-4459-b98f-3941faef7e6d';

      (SnapshotPolicy.findBy as jest.Mock).mockResolvedValue(null);

      await expect(snapshotPolicyService.getSnapshotPolicyByUserId(userId)).rejects.toThrow('Snapshot policy not found for the user');
    });
  });

  describe('upsertSnapshotPolicy', () => {
    it('should update the snapshot policy if it exists', async () => {
      const userId = 'test-user-id';
      const policyData = {
        policyName: 'Updated Policy',
        directory: '/updated/directory',
      };
      const existingPolicy = {
        merge: jest.fn(),
        save: jest.fn(),
      };

      (SnapshotPolicy.findBy as jest.Mock).mockResolvedValue(existingPolicy);

      await snapshotPolicyService.upsertSnapshotPolicy(userId, policyData);

      expect(SnapshotPolicy.findBy).toHaveBeenCalledWith('userId', userId);
      expect(existingPolicy.merge).toHaveBeenCalledWith(policyData);
      expect(existingPolicy.save).toHaveBeenCalled();
    });

    it('should create a new snapshot policy if it does not exist', async () => {
      const userId = 'test-user-id';
      const policyData = {
        policyName: 'New Policy',
        directory: '/new/directory',
      };

      (SnapshotPolicy.findBy as jest.Mock).mockResolvedValue(null);
      (SnapshotPolicy.create as jest.Mock).mockResolvedValue({
        userId,
        ...policyData,
      });

      const result = await snapshotPolicyService.upsertSnapshotPolicy(userId, policyData);

      expect(SnapshotPolicy.findBy).toHaveBeenCalledWith('userId', userId);
      expect(SnapshotPolicy.create).toHaveBeenCalledWith({
        userId,
        ...policyData,
        selectedDays: '[]',
      });
      expect(result).toEqual({ userId, ...policyData });
    });
  });
});
