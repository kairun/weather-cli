import 'jest';
import config = require('config');
import { WeatherApi } from './weather-api';
import { UnexpectedInputError } from './errors';

describe('WeatherApi', () => {
  let weatherApi: WeatherApi;

  beforeAll(() => {
    let WeatherApi = mockWeatherApi();

    weatherApi = new WeatherApi(config.get('apiKey'));
  });

  describe('getWeatherToday', () => {
    it('should call axios.get', async () => {
      let getStub = require('axios').default.get;

      await weatherApi.getWeatherToday('strathfield');
      expect(getStub.called).toBeTruthy();

      getStub.resetHistory();
    });

    it('should throw UnexpectedInputError if unexpected input is given', async () => {
      await expect(
        weatherApi.getWeatherToday('unexpected')
      ).rejects.toThrow(UnexpectedInputError);
    });
  });

  afterAll(() => {
    jest.unmock('axios');
  });

  // @ts-ignore
  function mockWeatherApi() {
    let { WeatherApi } = require('./weather-api');

    jest.mock('axios', () => {
      let { stub } = require('sinon');
      let { UnexpectedInputError } = require('./errors');
      let getStub = stub();
      let returnVal = {
        data: {
          weather: [{description: ''}],
          main: {
            temp: '',
            temp_min: '',
            temp_max: ''
          },
          wind: {
            speed: '',
            deg: ''
          }
        },
      };

      getStub.callsFake((url: string) => {
        return new Promise((resolve, reject) => {
          if (url.match(/unexpected/g)) {
            let unexpectedInputError = new UnexpectedInputError();
            unexpectedInputError.response = returnVal;

            return reject(unexpectedInputError);
          }
          return resolve(returnVal);
        });
      });

      return {
        default: {
          'get': getStub
        }
      };
    });

    return WeatherApi;
  }
});
