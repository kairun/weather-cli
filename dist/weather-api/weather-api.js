"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const errors_1 = require("./errors");
const KELVIN_MODIFIER = -273.15;
class WeatherApi {
    constructor(key) {
        this.key = key;
        this.method = 'https';
        this.host = 'api.openweathermap.org';
        this.defaultPath = 'data/2.5';
        this.defaultUrl = `${this.method}://${this.host}/${this.defaultPath}`;
    }
    async getWeatherToday(location) {
        let response;
        let rawData;
        let returnVal;
        let fullUrl = this.getFullUrl('/weather', `q=${location}`);
        try {
            response = await axios_1.default.get(fullUrl);
        }
        catch (err) {
            let errMessage = err.response.data.message;
            if (!err.isAxiosError) {
                throw err;
            }
            if (errMessage !== 'city not found') {
                throw err;
            }
            throw new errors_1.UnexpectedInputError();
        }
        rawData = response.data;
        returnVal = {
            location,
            status: rawData.weather[0].description,
            temperature: {
                now: this.kelvinToCelcius(rawData.main.temp),
                min: this.kelvinToCelcius(rawData.main.temp_min),
                max: this.kelvinToCelcius(rawData.main.temp_max)
            },
            humidity: rawData.main.humidity,
            wind: {
                speed: rawData.wind.speed,
                degree: rawData.wind.deg
            }
        };
        return returnVal;
    }
    getFullUrl(appendStr, queryString) {
        let returnUrl = `${this.defaultUrl}${appendStr}?appid=${this.key}`;
        if (queryString) {
            returnUrl = returnUrl + `&${queryString}`;
        }
        return returnUrl;
    }
    kelvinToCelcius(kelvinVal) {
        return Math.floor(kelvinVal + KELVIN_MODIFIER);
    }
}
exports.WeatherApi = WeatherApi;
//# sourceMappingURL=weather-api.js.map