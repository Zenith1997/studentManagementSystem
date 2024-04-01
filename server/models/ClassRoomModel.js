// ClassRoomModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ClassRoom = sequelize.define('ClassRoom', {
        classroom_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        }
    });

    return ClassRoom;
};
module.exports = ClassRoomModel;