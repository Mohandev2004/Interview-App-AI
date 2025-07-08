const express = require('express');
const { createSession, getSessionById, getMySessions, deleteSessions } = require('../controllers/sessionController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createSession);
router.get('/my-session', protect, getMySessions);
router.get('/:id', protect, getSessionById);
router.delete('/:id', protect, deleteSessions);

module.exports = router;