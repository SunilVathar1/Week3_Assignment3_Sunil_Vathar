import { DataTypes,Model } from "sequelize";
import sequelize from "./pgConfig";



export interface weatherDataAtributes {
    id: number;
    city: string;
    country: string;
    weather:  {
      temperature: string;
      wind: string;
      humidity: string;
      condition: string;
    },
    time:string
    latitude:string
    longitude:string
}

interface WeatherDataModel extends Model<weatherDataAtributes>, weatherDataAtributes {}

export const WeatherData = sequelize.define<WeatherDataModel>(
    'WeatherData',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weather: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      time:{
        type:DataTypes.STRING,
        allowNull:false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {  modelName: 'WeatherData',timestamps:false }
  );


