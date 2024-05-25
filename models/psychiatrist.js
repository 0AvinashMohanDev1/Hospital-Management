const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');
const Patient = require('./patient');

const Psychiatrist = connection.define('Psychiatrist', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    patient_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    hospital_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Hospitals',
            key: 'id'
        }
    }
});

// Define association
Psychiatrist.hasMany(Patient, { foreignKey: 'psychiatrist_id', onDelete: 'CASCADE' });
Patient.belongsTo(Psychiatrist, { foreignKey: 'psychiatrist_id' });

module.exports = Psychiatrist;
