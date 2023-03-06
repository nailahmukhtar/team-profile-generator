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

const writeFileAsync = util.promisify(fs.writeFile);

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
      
    });

}

// {
//     type: 'list',
//     name: 'teamMember',
//     message: 'Would you like to add another team member?',
//     choices: ['Engineer', 'Intern', 'No more team members to add']
// },

// if (response.teamMember === 'Engineer') {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'engineer.name',
//             message: 'Engineer Name?'
//         },
//         {
//             type: 'input',
//             name: 'engineer.id',
//             message: 'Engineer Id?',
//         },
//         {
//             type: 'input',
//             name: 'engineer.email',
//             message: 'Engineer email?',
//         },
//         {
//             type: 'input',
//             name: 'engineer.github',
//             message: 'Engineer github?',
//         },
        
//     ])

// }


  
  // function to initialize program
  const init = async () => {
      try {
        const answers = await createManager();

        console.log(answers);
        const renderedAnswers = render(team);
        await writeFileAsync(outputPath, renderedAnswers);
    
        console.log('Successfully wrote to a team.html file');
      } catch (err) {
        console.log(err);
      }
    };
  
  // function call to initialize program
  init();


