"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherData = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("./pgConfig"));
exports.WeatherData = pgConfig_1.default.define('WeatherData', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weather: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, { modelName: 'WeatherData', timestamps: false });
//# sourceMappingURL=WeatherModels.js.map