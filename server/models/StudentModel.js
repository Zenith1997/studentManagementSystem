
// StudentModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Student = sequelize.define('Student', {
        registration_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        contact_number: {
            type: DataTypes.STRING(20)
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return Student;
};
module.exports = StudentModel;