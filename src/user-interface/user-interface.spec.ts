import 'jest';
import { UserInterface } from './user-interface';

describe('Interface', () => {
  let userInterface: UserInterface;

  beforeAll(() => {
    let UserInterface = mockInquirer();

    userInterface = new UserInterface();
  });

  describe('askLocation', () => {
    it('should call inquirer.prompt', async () => {
      let promptStub = require('inquirer').prompt;

      await userInterface.askLocation();
      expect(promptStub.called).toBeTruthy();

      promptStub.resetHistory();
    });
  });

  // @ts-ignore
  function mockInquirer() {
    let { UserInterface } = require('./user-interface');

    jest.mock('inquirer', () => {
      let { stub } = require('sinon');

      let promptStub = stub();
      promptStub.callsFake(() => {
        return new Promise((resolve) => {
          resolve();
        });
      });

      return {
        prompt: promptStub
      };
    });

    return UserInterface;
  }

  afterAll(() => {
    jest.unmock('inquirer');
  });
});
