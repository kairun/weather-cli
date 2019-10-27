/* eslint no-console: 0 */
import chalk from 'chalk';
import { rainbow, karaoke } from 'chalk-animation';
import { stripIndents } from 'common-tags';
import { ILocationWeather } from '../weather-api';

const DEFAULT_ANIMATION_DURATION = 4000;

export class Displayer {
  async greetings(duration: number = DEFAULT_ANIMATION_DURATION) {
    let animation = rainbow('Good day! Welcome to the weather app CLI!');

    await this.asyncTimer(duration);

    animation.stop();
  }

  weather(locationWeather: ILocationWeather) {
    console.log(stripIndents`


      Hi, currently at ${chalk.red(locationWeather.location)},

      It is currently ${chalk.red(locationWeather.status)}

      ${chalk.yellow('Temperature')} is
      Currently: ${chalk.yellow(String(locationWeather.temperature.now))}
      min: ${chalk.yellow(String(locationWeather.temperature.min))}
      max: ${chalk.yellow(String(locationWeather.temperature.max))}

      ${chalk.cyan('Wind')} is
      speed: ${chalk.cyan(String(locationWeather.wind.speed))}
      degree: ${chalk.cyan(String(locationWeather.wind.degree))}

      And humid as much as ${chalk.blue(String(locationWeather.humidity))}!


    `);
  }

  async farewell(duration: number = DEFAULT_ANIMATION_DURATION) {
    let animation = karaoke('Thank you for using the weather app CLI! Have a lovely day!');

    await this.asyncTimer(duration);

    animation.stop();
  }

  private asyncTimer(duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
}
