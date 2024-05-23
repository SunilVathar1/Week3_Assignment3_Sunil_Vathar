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
const express_1 = __importDefault(require("express"));
const Logics_1 = require("./Logics");
// import { WeatherData } from './WeatherModels';
const sevice_1 = require("./sevice");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("hello Guys "+req.body);
    const cities = req.body;
    try {
        const coordinateData = yield Promise.all(cities.map((city) => __awaiter(void 0, void 0, void 0, function* () {
            const coordinates = yield (0, Logics_1.getCoordinates)(city.city, city.country);
            return { coordinates };
        })));
        try {
            const weatherDataInfo = yield Promise.all(cities.map((city) => __awaiter(void 0, void 0, void 0, function* () {
                const coOrdinates = yield (0, Logics_1.getCoordinates)(city.city, city.country);
                const weatherData = yield (0, Logics_1.getWeatherData)(city.city, city.country, coOrdinates);
                return weatherData;
            })));
            console.log(weatherDataInfo);
            try {
                const data = yield (0, sevice_1.createInsert)(weatherDataInfo);
                if (data) {
                    return res.json(data);
                }
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            console.error('Error saving weather data:', error);
        }
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
}));
app.get("/api/weatherDashboard/:city", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.params.city;
        let cityDeatils = yield (0, sevice_1.getCityWeatherDataFromDB)(city);
        // console.log(cityDeatils);
        res.json(cityDeatils);
    }
    catch (error) {
        throw error;
    }
}));
app.get("/getAllCitiesWeatherDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cityDeatils = yield (0, sevice_1.getAllCityWeatherDataFromDB)();
        res.json(cityDeatils);
    }
    catch (error) {
        throw error;
    }
}));
app.get("/api/mailSender", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipientEmail = req.body.email;
        const getCityWeatherData = req.body.citydetails;
        const response = yield (0, sevice_1.sendWeatherEmail)(recipientEmail, getCityWeatherData);
        if (response) {
            res.json({
                message: "mail sent sucessfully"
            });
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map