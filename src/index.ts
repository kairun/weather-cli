import config = require('config');
import { WeatherApi, UnexpectedInputError } from './weather-api';
import { UserInterface } from './user-interface';
import { Displayer } from './displayer';

const LOOP_TILL_VALID_INPUT = true;

async function main() {
  let userInterface = new UserInterface();
  let displayer = new Displayer();

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
        let weatherApi = new WeatherApi(config.get('apiKey'));
        let weatherObj = await weatherApi.getWeatherToday(cityName);

        displayer.weather(weatherObj);
      }
    } catch (err) {
      if (err instanceof UnexpectedInputError) {
        continue;
      } else {
        throw err;
      }
    }

  }
}

main();
