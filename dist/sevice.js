"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWeatherEmail = exports.getAllCityWeatherDataFromDB = exports.getCityWeatherDataFromDB = exports.createInsert = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const console_1 = require("console");
const WeatherModels_1 = require("./WeatherModels");
function createInsert(Weather) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //bulk create is used to creates and inserts the values
            let weatherresult = yield WeatherModels_1.WeatherData.bulkCreate(Weather);
            if (weatherresult) {
                return weatherresult;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createInsert = createInsert;
function getCityWeatherDataFromDB(cityName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield WeatherModels_1.WeatherData.findOne({ where: { city: cityName } });
            if (result) {
                return result;
            }
            else {
                throw new Error(`City with name ${cityName} not found`);
            }
        }
        catch (error) {
            console.error('Error fetching city weather data:', error);
            throw error;
        }
    });
}
exports.getCityWeatherDataFromDB = getCityWeatherDataFromDB;
function getAllCityWeatherDataFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield WeatherModels_1.WeatherData.findAll();
        if (result) {
            return result;
        }
        else {
            throw console_1.error;
        }
    });
}
exports.getAllCityWeatherDataFromDB = getAllCityWeatherDataFromDB;
function sendWeatherEmail(recipientEmail, reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail.com',
                secure: true,
                port: 465,
                auth: {
                    user: "sunilvathar14@gmail.com",
                    pass: "mxnu lywz tqks ezdv",
                }
            });
            yield transporter.sendMail({
                from: "sunilvathar14@gmail.com",
                to: recipientEmail,
                subject: " Weather Information ",
                html: `
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
            });
            console.log('Email sent successfully');
            return { message: "Email sent sucessfully" };
        }
        catch (error) {
            console.error('Error sending weather email:', error);
            throw error;
        }
    });
}
exports.sendWeatherEmail = sendWeatherEmail;
// <td>${data.weather.temperature}</td>
// <td>${data.weather.condition}</td>
// <td>${data.weather.wind}</td>
// <td>${data.weather.humidity}</td>
// const tableRows = cityDetails.map((detail: WeatherDataInformations) => `
// <tr>
//   <td>${detail.city}</td>
//   <td>${detail.country}</td>
//   <td>${detail.temprature}</td>
//   <td>${detail.wind}</td>
//   <td>${detail.humidity}</td>
//   <td>${detail.condition}</td>
//   <td>${detail.time}</td>
// </tr>
// `).join('');
// const emailHtml = `
// <h1>Weather Information</h1>
// <table border="1">
//   <tr>
//     <th>City</th>
//     <th>Country</th>
//     <th>Temperature</th>
//     <th>Wind</th>
//     <th>Humidity</th>
//     <th>Condition</th>
//     <th>Date</th>
//   </tr>
// </table>
// `;
// await transporter.sendMail({
// from: 'sunilvathar14@gmail.com',
// to: recipientEmail,
// subject: 'Weather Information',
// html: emailHtml,
// });
//# sourceMappingURL=sevice.js.map