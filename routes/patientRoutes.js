const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const upload = require("../helper/multer");

/**
 * @swagger
 * /patient/register:
 *   post:
 *     summary: Register a new patient
 *     description: Register a new patient with image upload.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image to upload.
 *       - in: formData
 *         name: info
 *         type: string
 *         required: true
 *         description: JSON string containing name, address, email, phone_number, password, psychiatrist_id
 *     responses:
 *       201:
 *         description: Patient registered successfully.
 *       400:
 *         description: Bad request. Possibly some fields are missing.
 *       500:
 *         description: Server error or image not uploaded.
 */
router.post('/register', upload.single('image'), patientController.registerPatient);

module.exports = router;
