const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/ScheduleController');

// router.delete('/:id', ScheduleController.scheduleDelete)
// router.put('/:id', ScheduleController.scheduleUpdate);
// router.get('/:id/edit', ScheduleController.scheduleEdit);
router.get('/generate', ScheduleController.scheduleGenerate);
router.get('/', ScheduleController.showSchedule);

module.exports = router;