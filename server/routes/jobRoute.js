const router = require('express').Router();
const jobController = require('../controllers/jobController');
const requireAuth = require("../middleware/requireAuth")
router.post('/', requireAuth, jobController.createJob);
router.get('/', requireAuth, jobController.getJobs);
router.get('/:id', requireAuth, jobController.getJobById);
router.put('/:id', requireAuth, jobController.updateJob);
router.delete('/:id', requireAuth, jobController.deleteJob);
module.exports = router;