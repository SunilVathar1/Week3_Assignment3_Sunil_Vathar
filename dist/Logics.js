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
exports.getWeatherData = exports.getCoordinates = void 0;
const axios_1 = __importDefault(require("axios"));
function getCoordinates(city, country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = "jyl8/qQ+yhuZbHJTVXPY9A==0LDjj5OwJpf0jl5Y";
            let response = yield axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            let responsedata = response.data;
            if (responsedata.length > 0) {
                const { latitude, longitude } = responsedata[0];
                return { latitude, longitude };
            }
            else {
                console.log("could not found the coordinates for the city and country");
            }
        }
        catch (error) {
            console.log("error in getting the coordinates", error);
            throw error;
        }
    });
}
exports.getCoordinates = getCoordinates;
const getWeatherData = (city, country, coordinates) => __awaiter(void 0, void 0, void 0, function* () {
    const rapidApiKey = "423dfd0733mshfbd9000ce064f12p186a23jsn6153aa02ae0c";
    try {
        const response = yield axios_1.default.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates.latitude},${coordinates.longitude}`, {
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        });
        let weatherapiData = response.data.current;
        return {
            city: city,
            country: country,
            weather: {
                temprature: weatherapiData.temp_c,
                wind: weatherapiData.wind_degree,
                humidity: weatherapiData.humidity,
                condition: weatherapiData.condition.text,
            },
            time: weatherapiData.last_updated,
            longitude: coordinates.latitude,
            latitude: coordinates.latitude,
        };
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
});
exports.getWeatherData = getWeatherData;
//# sourceMappingURL=Logics.js.map