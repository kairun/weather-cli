"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const INPUT_TYPE = 'input';
class UserInterface {
    async askLocation() {
        let answers = await inquirer
            .prompt([
            {
                type: INPUT_TYPE,
                name: 'city',
                message: 'Enter a city name for current weather information ("q" for quit)'
            }
        ]);
        return answers;
    }
}
exports.UserInterface = UserInterface;
//# sourceMappingURL=user-interface.js.map