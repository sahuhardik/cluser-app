import vine from '@vinejs/vine';

/**
 * Validates the request for fetching policy
 */
export const getPolicyValidator = vine.compile(
  vine.object({
    userId: vine.string(),
  })
);

/**
 * Validates the request for upserting policy
 */
export const putSnapshotPolicyValidator = vine.compile(
  vine.object({
    userId: vine.string(),
    policyName: vine.string().trim().maxLength(255),
    directory: vine.string().trim().maxLength(255).optional(),
    scheduleType: vine.string().trim().maxLength(50),
    timeZone: vine.string().trim().maxLength(100),
    snapshotTime: vine.string().trim().regex(/^\d{2}:\d{2}$/),
    days: vine.array(vine.string().trim()),
    deleteOption: vine.string(),
    snapshotLocking: vine.boolean(),
    enablePolicy: vine.boolean(),
  })
);
