import inquirer = require('inquirer');

const INPUT_TYPE = 'input';

export interface IUserResponse {
  city: string;
}

export class UserInterface {
  async askLocation(): Promise<IUserResponse> {
    let answers = await inquirer
      .prompt([
        {
          type: INPUT_TYPE,
          name: 'city',
          message: 'Enter a city name for current weather information ("q" for quit)'
        }
      ]);

    return answers as IUserResponse;
  }
}
