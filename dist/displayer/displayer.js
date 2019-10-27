"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const chalk_animation_1 = require("chalk-animation");
const common_tags_1 = require("common-tags");
const DEFAULT_ANIMATION_DURATION = 4000;
class Displayer {
    async greetings(duration = DEFAULT_ANIMATION_DURATION) {
        let animation = chalk_animation_1.rainbow('Good day! Welcome to the weather app CLI!');
        await this.asyncTimer(duration);
        animation.stop();
    }
    weather(locationWeather) {
        console.log(common_tags_1.stripIndents `
      Hi, currently at ${chalk_1.default.red(locationWeather.location)},

      It is currently ${chalk_1.default.red(locationWeather.status)}

      ${chalk_1.default.yellow('Temperature')} is
      Currently: ${chalk_1.default.yellow(String(locationWeather.temperature.now))}
      min: ${chalk_1.default.yellow(String(locationWeather.temperature.min))}
      max: ${chalk_1.default.yellow(String(locationWeather.temperature.max))}

      ${chalk_1.default.cyan('Wind')} is
      speed: ${chalk_1.default.cyan(String(locationWeather.wind.speed))}
      degree: ${chalk_1.default.cyan(String(locationWeather.wind.degree))}

      And humid as much as ${chalk_1.default.blue(String(locationWeather.humidity))}!
    `);
    }
    async farewell(duration = DEFAULT_ANIMATION_DURATION) {
        let animation = chalk_animation_1.karaoke('Thank you for using the weather app CLI! Have a lovely day!');
        await this.asyncTimer(duration);
        animation.stop();
    }
    asyncTimer(duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }
}
exports.Displayer = Displayer;
//# sourceMappingURL=displayer.js.map