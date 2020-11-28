const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

//Prompt to start the gathering of information
const employeeQuestions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "what employee would you like to add?",
            name: "employee",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
            ]
        },
    ]).then(val => {
        if (val.employee === "Manager") {
            managerQuestions();
        } else if (val.employee === "Engineer") {
            engineerQuestions();
        } else if (val.employee === "Intern") {
            internQuestions();
        }
    })

};

//If manager is chosen from the first prompt, this function will run
const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Manager Name:",
            name: "name",
        },
        {
            type: "input",
            message: "Manager ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Manager Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Office number:",
            name: "office",
        },
    ]).then(function (completed) {
        let manager = new Manager(completed.name, completed.id, completed.email, completed.office)
        employees.push(manager)
    });
};

//If engineer is chosen from the first prompt, this function will run
const engineerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Engineer Name:",
            name: "name",
        },
        {
            type: "input",
            message: "Engineer ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Engineer Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Engineers GitHub Username",
            name: "github",
        },
    ]).then(function (completed) {
        let engineer = new Engineer(completed.name, completed.id, completed.email, completed.github)
        employees.push(engineer)
    });
}

//If intern is chosen from the first prompt, this function will run
const internQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Intern Name:",
            name: "name",
        },
        {
            type: "input",
            message: "Intern ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Intern Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Intern School:",
            name: "school",
        },
    ]).then(function (completed) {
        let intern = new Intern(completed.name, completed.id, completed.email, completed.school)
        employees.push(intern)
    });
}

//runs functions when file is ran
employeeQuestions();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
