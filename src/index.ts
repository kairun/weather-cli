import commander = require('commander');
import config = require('config');
import { WeatherApi, UnexpectedInputError } from './weather-api';
import { UserInterface } from './user-interface';
import { Displayer } from './displayer';

const LOOP_TILL_VALID_INPUT = true;

async function main() {
  let program = new commander.Command();
  let userInterface = new UserInterface();
  let displayer = new Displayer();

  program
    .version('1.0.0');

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
