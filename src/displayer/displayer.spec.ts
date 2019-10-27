import 'jest';
import * as chalkAnimation from 'chalk-animation';
import { stub, SinonStub } from 'sinon';
import { Displayer } from './displayer';

describe('Displayer', () => {
  let displayer: Displayer;
  let consoleLogStub: SinonStub;

  beforeAll(() => {
    mockConsoleLog();
    displayer = new Displayer();
  });

  describe('greetings', () => {
    it('should call run animation and stop', async () => {
      let rainbowStub = stub(chalkAnimation, 'rainbow');
      let stopStub = stub();

      rainbowStub.returns({
        stop: stopStub
      } as any);

      await displayer.greetings();

      expect(rainbowStub.called).toBeTruthy();
      expect(stopStub.called).toBeTruthy();
      rainbowStub.restore();
    });
  });

  describe('displayWeather', () => {
    it('should call console.log', () => {
      displayer.weather({
        temperature: {},
        wind: {}
      } as any);
      expect(consoleLogStub.called).toBeTruthy();

      consoleLogStub.resetHistory();
    });
  });

  describe('farewell', () => {
    it('should call console.log', async () => {
      let karaokeStub = stub(chalkAnimation, 'karaoke');
      let stopStub = stub();

      karaokeStub.returns({
        stop: stopStub
      } as any);

      await displayer.farewell();

      expect(karaokeStub.called).toBeTruthy();
      expect(stopStub.called).toBeTruthy();
    });
  });

  afterAll(() => {
    consoleLogStub.restore();
  });

  // @ts-ignore
  function mockConsoleLog() {
    consoleLogStub = stub(console, 'log');
  }
});
