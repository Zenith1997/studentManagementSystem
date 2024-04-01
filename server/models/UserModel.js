const { Sequelize, DataTypes } = require('sequelize');

const UserModel = (sequelize) => {
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

module.exports = UserModel;
