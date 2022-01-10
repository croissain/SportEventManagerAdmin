const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/RecordController');

router.get('/:id/edit', RecordController.editRecord);
router.post('/:id/', RecordController.updateRecord);
router.get('/', RecordController.showRecord);

module.exports = router;