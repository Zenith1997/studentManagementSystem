const { Sequelize, DataTypes } = require('sequelize');

const User = (sequelize) => {
    const User = Sequelize.define('User', {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING
        }
    });
    return User;
};

module.exports = User;
