/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const performanceMetricesController = () => import('#controllers/performance_metrices_controller')
const snapshotPolicyController = () => import('#controllers/snapshot_policies_controller')


router.get('/', async () => {
  return {
    hello: 'world',
  }
});

// Note:  we can create routing groups for each resourcs
// Note: we can make this apis only for logged in user by implementing auth middleware
router.get('/performance-metrices/iops', [performanceMetricesController, 'getIOPS']);
router.get('/performance-metrices/throughput', [performanceMetricesController, 'getThroughput']);

router.get('/snapshot-policy', [snapshotPolicyController, 'getSnapshotPolicy']);
router.put('/snapshot-policy', [snapshotPolicyController, 'upsertSnapshotPolicy']);
