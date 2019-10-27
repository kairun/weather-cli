#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const weather_api_1 = require("./weather-api");
const user_interface_1 = require("./user-interface");
const displayer_1 = require("./displayer");
const LOOP_TILL_VALID_INPUT = true;
async function main() {
    let config;
    let userInterface = new user_interface_1.UserInterface();
    let displayer = new displayer_1.Displayer();
    let configDirOrig = process.env.NODE_CONFIG_DIR;
    process.env.NODE_CONFIG_DIR = path.resolve(path.join(__dirname, '../config'));
    config = require('config');
    process.env.NODE_CONFIG_DIR = configDirOrig;
    await displayer.greetings();
    while (LOOP_TILL_VALID_INPUT) {
        try {
            let answers = await userInterface.askLocation();
            let cityName = answers.city;
            if (cityName === 'q') {
                displayer.farewell();
                break;
            }
            if (cityName) {
                let weatherApi = new weather_api_1.WeatherApi(config.get('apiKey'));
                let weatherObj = await weatherApi.getWeatherToday(cityName);
                displayer.weather(weatherObj);
            }
        }
        catch (err) {
            if (err instanceof weather_api_1.UnexpectedInputError) {
                continue;
            }
            else {
                throw err;
            }
        }
    }
}
main();
//# sourceMappingURL=index.js.map