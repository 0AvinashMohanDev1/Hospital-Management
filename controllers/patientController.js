// controllers/patientController.js
const imageUploader = require('../helper/cloudinary');
const ValidatePatient = require('../middleware/patientValidator');
const Patient = require('../models/patient');
const Psychiatrist = require('../models/psychiatrist');
const bcrypt = require('bcrypt');

exports.registerPatient = async (req, res) => {
    const { name, address, email, phone_number, password, psychiatrist_id } = JSON.parse(req.body.info);

    if(!ValidatePatient.address(address)){

        return res.status(500).send({error:'Address filed length should be greater than 10 !'});
    }
    if(!ValidatePatient.phone(phone_number)){
        return res.status(500).send({error:"Phone number should follow phone number with country code like [+91 xxxxxxxx01]"})
    }

    const folder='Patients';
    const photo=await imageUploader(req.file.path,folder)
    console.log({ name, address, email, phone_number, password, psychiatrist_id,path:req.file.path });
    
    if(!photo){
        res.status(500).send({error:"Image not uploded!"});
    }
    
    if (!name || !address || !email || !phone_number || !password || !photo || !psychiatrist_id) {
        return res.status(400).send("All fields are required.");
    }

    

    try {
        // Validate that the psychiatrist exists
        const psychiatrist = await Psychiatrist.findByPk(psychiatrist_id);
        if (!psychiatrist) {
            return res.status(404).json({ message: 'Psychiatrist not found' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new patient record
        const newPatient = await Patient.create({
            name,
            address,
            email,
            phone_number,
            password: hashedPassword,
            photo,
            psychiatrist_id
        });

        // Respond with success message
        res.status(201).json({ message: 'Patient registered successfully.', patient: newPatient });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ message: 'Error registering patient', error: error.message });
    }
};
