"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const chalkAnimation = require("chalk-animation");
const sinon_1 = require("sinon");
const displayer_1 = require("./displayer");
describe('Displayer', () => {
    let displayer;
    let consoleLogStub;
    beforeAll(() => {
        mockConsoleLog();
        displayer = new displayer_1.Displayer();
    });
    describe('greetings', () => {
        it('should call run animation and stop', async () => {
            let rainbowStub = sinon_1.stub(chalkAnimation, 'rainbow');
            let stopStub = sinon_1.stub();
            rainbowStub.returns({
                stop: stopStub
            });
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
            });
            expect(consoleLogStub.called).toBeTruthy();
            consoleLogStub.resetHistory();
        });
    });
    describe('farewell', () => {
        it('should call console.log', async () => {
            let karaokeStub = sinon_1.stub(chalkAnimation, 'karaoke');
            let stopStub = sinon_1.stub();
            karaokeStub.returns({
                stop: stopStub
            });
            await displayer.farewell();
            expect(karaokeStub.called).toBeTruthy();
            expect(stopStub.called).toBeTruthy();
        });
    });
    afterAll(() => {
        consoleLogStub.restore();
    });
    function mockConsoleLog() {
        consoleLogStub = sinon_1.stub(console, 'log');
    }
});
//# sourceMappingURL=displayer.spec.js.map