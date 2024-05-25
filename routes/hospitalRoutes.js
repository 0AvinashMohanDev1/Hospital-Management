const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

/**
 * @swagger
 * /hospital/details:
 *   post:
 *     summary: Get details of a hospital
 *     description: Retrieves details about a hospital including associated psychiatrists and patient count.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalId:
 *                 type: integer
 *                 description: ID of the hospital
 *                 example: 1
 *     responses:
 *       200:
 *         description: Hospital details retrieved successfully.
 *       404:
 *         description: Hospital not found.
 *       500:
 *         description: Error fetching hospital details.
 */
router.post('/details', hospitalController.getHospitalDetails);

module.exports = router;
