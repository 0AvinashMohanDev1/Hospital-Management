// controllers/hospitalController.js
const Hospital = require('../models/hospital');
const Psychiatrist = require('../models/psychiatrist');
const Patient = require('../models/patient');

exports.getHospitalDetails = async (req, res) => {
    const hospitalId = req.body.hospitalId;

    try {
        // Fetch hospital by ID
        const hospital = await Hospital.findByPk(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        // Fetch psychiatrists associated with the hospital
        const psychiatrists = await Psychiatrist.findAll({ where: { hospital_id: hospitalId } });

        // Get details for each psychiatrist, including patient count
        const psychiatristDetails = await Promise.all(psychiatrists.map(async psychiatrist => {
            const patientsCount = await Patient.count({ where: { psychiatrist_id: psychiatrist.id } });
            return {
                id: psychiatrist.id,
                name: psychiatrist.name,
                patients_count: patientsCount
            };
        }));

        // Calculate total patient count
        const totalPatientsCount = psychiatristDetails.reduce((acc, ps) => acc + ps.patients_count, 0);

        // Respond with the gathered information
        res.json({
            hospital_name: hospital.name,
            total_psychiatrists_count: psychiatrists.length,
            total_patients_count: totalPatientsCount,
            psychiatrists: psychiatristDetails
        });
    } catch (error) {
        console.error('Error fetching hospital details:', error);
        res.status(500).json({ message: 'Error fetching hospital details', error: error.message });
    }
};
