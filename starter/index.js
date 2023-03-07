const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const util = require('util');
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
//Create a team array to hold the values created by user input
const team = [];
console.log('Please enter some information about your team:');

// function to prompt user for manager details
const createManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Team Manager Name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Team Manager Id?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Team Manager office number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Team Manager Email?',
        }
    //pass manager values to a new manager object
    ]).then(response => {
        const manager = new Manager(
            response.name,
            response.id,
            response.officeNumber,
            response.email
        );
        //pass that new object to the team array
        team.push(manager);
        createAnotherTeamMember();
      
    });
}
//Once Manager created, check if other team members need to be added through user prompt
const createAnotherTeamMember = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'teamMember',
            message: 'Would you like to add another team member?',
            choices: ['Engineer', 'Intern', 'No more team members to add']
        },
    ]).then(response => {
        switch (response.teamMember) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
            default:
                renderTeam();
                break;
        }
    });
}


// {
//     type: 'input',
//     name: 'engineer.name',
//     message: 'Engineer Name?'
// },
// {
//     type: 'input',
//     name: 'engineer.id',
//     message: 'Engineer Id?',
// },
// {
//     type: 'input',
//     name: 'engineer.email',
//     message: 'Engineer email?',
// },
// {
//     type: 'input',
//     name: 'engineer.github',
//     message: 'Engineer github?',
// },


  
  // function to initialize program
  const init = () => {
        createManager();
    };

    const renderTeam = () => {
        fs.writeFileSync(outputPath, render(team), 'utf-8')
        console.log("You have successfully created a team.html file!");
    }
  
  // function call to initialize program
  init();


