const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const patientRoutes = require('./routes/patientRoutes');
const { connection } = require('./config/db');
const Hospital = require('./models/hospital');
const Psychiatrist = require('./models/psychiatrist');
const Patient = require('./models/patient');
const swaggerDocs=require("./helper/swagger");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(swaggerDocs);

app.use('/hospital', hospitalRoutes);
app.use('/patient', patientRoutes);

app.get('/', (req, res) => {
    res.send('Home page of this API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connection.sync({ force: true }); // force: true will drop the table if it already exists
        console.log('Database synced successfully');
        console.log(`Server is listening on port ${PORT}`);

        // Insert predefined hospital data
        const hospitals = await Hospital.bulkCreate([
            { name: 'Apollo Hospitals' },
            { name: 'Jawaharlal Nehru Medical College and Hospital' },
            { name: 'Indira Gandhi Institute of Medical Sciences (IGIMS)' },
            { name: 'AIIMS - All India Institute Of Medical Science' }
        ]);

        // Insert psychiatrists data with Indian names
        const psychiatristsData = [
            { name: 'Dr. Rajesh Kumar', hospital_id: hospitals[0].id },
            { name: 'Dr. Priya Sharma', hospital_id: hospitals[0].id },
            { name: 'Dr. Amit Verma', hospital_id: hospitals[0].id },
            { name: 'Dr. Suresh Reddy', hospital_id: hospitals[0].id },
            { name: 'Dr. Anjali Mehta', hospital_id: hospitals[0].id },

            { name: 'Dr. Nitin Singh', hospital_id: hospitals[1].id },
            { name: 'Dr. Sneha Gupta', hospital_id: hospitals[1].id },
            { name: 'Dr. Rohan Jain', hospital_id: hospitals[1].id },
            { name: 'Dr. Kavita Patel', hospital_id: hospitals[1].id },
            { name: 'Dr. Arjun Desai', hospital_id: hospitals[1].id },

            { name: 'Dr. Pooja Nair', hospital_id: hospitals[2].id },
            { name: 'Dr. Vikram Rao', hospital_id: hospitals[2].id },
            { name: 'Dr. Meera Menon', hospital_id: hospitals[2].id },
            { name: 'Dr. Abhinav Iyer', hospital_id: hospitals[2].id },
            { name: 'Dr. Shilpa Thakur', hospital_id: hospitals[2].id },

            { name: 'Dr. Kiran Joshi', hospital_id: hospitals[3].id },
            { name: 'Dr. Anil Pandey', hospital_id: hospitals[3].id },
            { name: 'Dr. Ritu Kapoor', hospital_id: hospitals[3].id },
            { name: 'Dr. Deepak Yadav', hospital_id: hospitals[3].id },
            { name: 'Dr. Sunita Ahuja', hospital_id: hospitals[3].id }
        ];

        await Psychiatrist.bulkCreate(psychiatristsData);

        // Hooks to update patient_count
        Patient.addHook('afterCreate', async (patient, options) => {
            const psychiatrist = await Psychiatrist.findByPk(patient.psychiatrist_id);
            psychiatrist.patient_count += 1;
            await psychiatrist.save();
        });

        Patient.addHook('afterDestroy', async (patient, options) => {
            const psychiatrist = await Psychiatrist.findByPk(patient.psychiatrist_id);
            psychiatrist.patient_count -= 1;
            await psychiatrist.save();
        });

    } catch (error) {
        console.error('Error syncing database:', error);
    }
});
