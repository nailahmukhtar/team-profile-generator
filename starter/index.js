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
console.log('Please enter some information about your team:');

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'manager.name',
        message: 'Team Manager Name?'
    },
    {
        type: 'input',
        name: 'manager.id',
        message: 'Team Manager Id?',
    },
    {
        type: 'input',
        name: 'manager.officeNumber',
        message: 'Team Manager office number?',
    },
    {
        type: 'input',
        name: 'manager.email',
        message: 'Team Manager Email?',
    },
    {
        type: 'list',
        name: `${choice}`,
        message: 'Would you like to add another team member?',
        choices: ['engineer', 'intern', 'No more team members to add']
    }

];

  const promptUser = () => {
    return inquirer.prompt(questions)
  };
  
  // function to initialize program
  const init = async () => {
      try {
        const answers = await promptUser();
        console.log(answers);
        const renderedAnswers = render(answers);
        // console.log("Before Await");
        // console.log(outputPath);
        await writeFileAsync(outputPath, renderedAnswers);
    
        console.log('Successfully wrote to a team.html file');
      } catch (err) {
        console.log(err);
      }
    };
  
  // function call to initialize program
  init();


