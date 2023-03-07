const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

//Create a team array to hold the values created by user input
const team = [];

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
                break;
            default:
                renderTeam();
                break;
        }
    });
}

// function to prompt user for engineer details
const createEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Engineer Name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Engineer Id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Engineer email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Engineer github?',
        },
    //pass engineer values to a new engineer object
    ]).then(response => {
        const engineer = new Engineer(
            response.name,
            response.id,
            response.github,
            response.email
        );
        //pass that new object to the team array
        team.push(engineer);
        createAnotherTeamMember();
      
    });
}

// function to prompt user for interns details
const createIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Intern Name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Intern Id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Intern email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Intern School?',
        },
    //pass intern values to a new intern object
    ]).then(response => {
        const intern = new Intern(
            response.name,
            response.id,
            response.school,
            response.email
        );
        //pass that new object to the team array
        team.push(intern);
        createAnotherTeamMember();
      
    });
}


// function to initialize program
const init = () => {
    console.log('Please enter some information about your team:');
    createManager();
};

//function to render team when no more members need to be added
const renderTeam = () => {
    try {
    fs.writeFileSync(outputPath, render(team), 'utf-8')
    console.log("You have successfully created a team.html file!");
    } catch(err) {
        console.log("Something went wrong :(");
    }
}
  
// call function call to initialize program
init();


