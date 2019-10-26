import 'jest';
import { SinonStub } from 'sinon';
import { WeatherApi } from './weather-api';
import { UnexpectedInputError } from './errors';

describe('WeatherApi', () => {
  let weatherApi: WeatherApi;
  let getStub: SinonStub;

  beforeAll(() => {
    let WeatherApi = mockJest();

    weatherApi = new WeatherApi('4c18248c48f4a6f471cad850bd29285c');
    getStub = require('axios').default.get;
  });

  describe('getWeatherToday', () => {
    it('should call axios.get', async () => {
      await weatherApi.getWeatherToday('strathfield');

      expect(getStub.called).toBeTruthy();
      getStub.resetHistory();
    });

    it.only('should throw UnexpectedInputError if unexpected input is given', async () => {
      await expect(
        weatherApi.getWeatherToday('unexpected')
      ).rejects.toThrow(UnexpectedInputError);
    });
  });

  afterAll(() => {
    jest.unmock('axios');
  });

  // @ts-ignore
  function mockJest() {
    let { WeatherApi } = require('./weather-api');

    jest.mock('axios', () => {
      let { stub } = require('sinon');
      let { UnexpectedInputError } = require('./errors');
      let getStub = stub();

      getStub.callsFake((url: string) => {
        return new Promise((resolve, reject) => {
          if (url.match(/unexpected/g)) {
            let unexpectedInputError = new UnexpectedInputError();
            unexpectedInputError.response = {
              data: {}
            };

            return reject(unexpectedInputError);
          }
          return resolve({});
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
