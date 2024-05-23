"use strict";
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Weather extends sequelize.Model {
    }
    Weather.init({
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Weather'
    });
    return Weather;
};
