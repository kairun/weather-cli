import axios from 'axios';
import { UnexpectedInputError } from './errors';

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

  async getWeatherToday(location: string) {
    let response;
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

    return response.data;
  }

  private getFullUrl(appendStr: string, queryString?: string) {
    let returnUrl = `${this.defaultUrl}${appendStr}?appid=${this.key}`;

    if (queryString) {
      returnUrl = returnUrl + `&${queryString}`;
    }

    return returnUrl;
  }
}
