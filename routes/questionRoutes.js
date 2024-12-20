const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require("../middlewares/auth");

router.post('/addQuestion', authMiddleware, questionController.addQuestion);
router.post('/toggleRevise', authMiddleware, questionController.toggleRevise);
router.post('/toggleCompleted', authMiddleware, questionController.toggleCompleted);
router.post('/saveNotes', authMiddleware, questionController.saveNotes);
router.post('/deleteQuestion', authMiddleware, questionController.deleteQuestion);
router.post('/deleteCategory', authMiddleware, questionController.deleteCategory);
router.post('/deleteSubCategory', authMiddleware, questionController.deleteSubCategory);
router.post('/deleteCategory', authMiddleware, questionController.deleteCategory);

module.exports = router;