const express = require('express');
const projectController = require('../controllers/projectController');
const authenticateApiKey = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/', authenticateApiKey, projectController.getAllProjects);
router.post('/', authenticateApiKey, projectController.createProject);

module.exports = router;
