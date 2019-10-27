import axios from 'axios';
import { UnexpectedInputError } from './errors';

export interface ILocationWeather {
  location: string;
  status: string;
  temperature: {
    now: number;
    min: number;
    max: number;
  };
  humidity: number;
  wind: {
    speed: number;
    degree: number;
  };
}

export class WeatherApi {
  private method: string;
  private host: string;
  private defaultPath: string;
  private defaultUrl: string;
  private key: string;

  constructor(key: string) {
    this.key = key;
    this.method = 'https';
    this.host = 'api.openweathermap.org';
    this.defaultPath = 'data/2.5';
    this.defaultUrl = `${this.method}://${this.host}/${this.defaultPath}`;
  }

  async getWeatherToday(location: string): Promise<ILocationWeather> {
    let response;
    let rawData;
    let returnVal: ILocationWeather;
    let fullUrl = this.getFullUrl('/weather', `q=${location}`);

    try {
      response = await axios.get(fullUrl);
    } catch (err) {
      let errMessage = err.response.data.message;

      if (!err.isAxiosError) {
        throw err;
      }

      if (errMessage !== 'city not found') {
        throw err;
      }

      throw new UnexpectedInputError();
    }

    rawData = response.data;

    returnVal = {
      location,
      status: rawData.weather[0].description,
      temperature: {
        now: rawData.main.temp,
        min: rawData.main.temp_min,
        max: rawData.main.temp_max
      },
      humidity: rawData.main.humidity,
      wind: {
        speed: rawData.wind.speed,
        degree: rawData.wind.deg
      }
    };

    return returnVal;
  }

  private getFullUrl(appendStr: string, queryString?: string) {
    let returnUrl = `${this.defaultUrl}${appendStr}?appid=${this.key}`;

    if (queryString) {
      returnUrl = returnUrl + `&${queryString}`;
    }

    return returnUrl;
  }
}
