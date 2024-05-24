import nodemailer from 'nodemailer';
import { error } from 'console';
import { WeatherData } from './WeatherModels';

export async function createInsert(Weather:any): Promise<any> {
    try {
      //bulk create is used to creates and inserts the values
       let weatherresult= await WeatherData.bulkCreate(Weather)
       if (weatherresult) {
        return weatherresult
       }
    } catch (error) {
        throw error
    }
}

export async function getCityWeatherDataFromDB(cityName: string): Promise<any> {
    try {
        const result = await WeatherData.findOne({ where: { city: cityName } });
        if (result) {
            return result;
        } else {
            throw new Error(`City with name ${cityName} not found`);
        }
    } catch (error) {
        console.error('Error fetching city weather data:', error);
        throw error; 
    }
}

export async function getAllCityWeatherDataFromDB() {
  let result = await WeatherData.findAll();
  if (result) {
    return result;
  } else {
    throw error;
  }
}

interface sendWeatherEmailAtributes{
  id:string,
  city:string,
  country:string,
  time:string,
  weather:  {
    temperature: string;
    wind: string;
    humidity: string;
    condition: string;
  }
  latitude:string,
  longitude:string
}


export async function sendWeatherEmail(recipientEmail: string,reqBody:sendWeatherEmailAtributes[]): Promise<any> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: "sunilvathar14@gmail.com",
        pass:   "mxnu lywz tqks ezdv",
      }
    });
    await transporter.sendMail({
     from:"sunilvathar14@gmail.com",
      to:recipientEmail,
      subject:" Weather Information ",
      html:`
      <h3>Weather Data</h3>
      <table border="1">
        <tr>
          <th>ID</th>
          <th>City</th>
          <th>Country</th>
          <th>Date</th>
          <th>Weather</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
        ${reqBody.map(data => `
          <tr>
            <td>${data.id}</td>
            <td>${data.city}</td>
            <td>${data.country}</td>
            <td>${data.time}</td>
            <td>${data.weather.condition}, ${data.weather.wind}, ${data.weather.humidity}</td>
            <td>${data.latitude}</td>
            <td>${data.longitude}</td>
          </tr>
        `).join('')}
      </table>
    `
    })
    console.log('Email sent successfully');
    return {message:"Email sent sucessfully"}

  } catch (error) {
    console.error('Error sending weather email:', error);
    throw error;
  }
}













