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
                "Create File"
            ],
        },
    ]).then(val => {
        if (val.employee === "Manager") {
            managerQuestions();
        } else if (val.employee === "Engineer") {
            engineerQuestions();
        } else if (val.employee === "Intern") {
            internQuestions();
        } else if (val.employee === "Create File") {
            createHTML(outputPath, render(employees));
        };
    });
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
        let manager = new Manager(completed.name, completed.id, completed.email, completed.office);
        employees.push(manager);
        employeeQuestions();

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
        let engineer = new Engineer(completed.name, completed.id, completed.email, completed.github);
        employees.push(engineer);
        employeeQuestions();
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
        let intern = new Intern(completed.name, completed.id, completed.email, completed.school);
        employees.push(intern);
        employeeQuestions();
    });
}

// Writes to a newly generated HTML File
function createHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
    });
};

//runs functions when file is ran
employeeQuestions();

