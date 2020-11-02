const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
// const { exit } = require('process');
require("console.table");

init();

function init() {
  const ascii = logo({
    name: "Deep Space 9 \n Personnel Terminal",
  }).render();
  console.log(ascii);

  mainPrompt();
}

async function mainPrompt() {
  const { selection } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select an action.",
      choices: [
        {
          name: "Add an organization",
          value: "create_org",
        },
        {
          name: "Add a title",
          value: "create_title",
        },
        {
          name: "Add an employee",
          value: "create_employee",
        },
        {
          name: "View all organizations",
          value: "read_org",
        },
        {
          name: "View all titles",
          value: "read_titles",
        },
        {
          name: "View all employees",
          value: "read_employees",
        },
        {
          name: "Change an employee's title",
          value: "update_title",
        },
        {
          name: "Exit program",
          value: "exit",
        },
      ],
    },
  ]);

  switch (selection) {
    case "create_org":
      return createOrg();
    case "create_title":
      return createTitle();
    case "create_employee":
      return createEmployee();
    case "read_org":
      return readOrg();
    case "read_titles":
      return readTitles();
    case "read_employees":
      return readEmployees();
    case "update_title":
      return updateTitle();
    default:
      return endProgram();
  }
}

async function createOrg() {
  const newOrg = await db.createOrg();

  console.log("\n");
  console.table(newOrg);
}

async function createTitle() {}

async function createEmployee() {}

async function readOrg() {
  const org = await db.readOrg();

  console.log("\n");
  console.table(org);

  mainPrompt();
}

async function readTitles() {
  const titles = await db.readTitles();

  console.log("\n");
  console.table(titles);

  mainPrompt();
}

async function readEmployees() {
  const employees = await db.readEmployees();

  console.log("\n");
  console.table(employees);

  mainPrompt();
}

async function updateTitle() {}

function endProgram() {
  console.log("Thank you for using the Deep Space 9 Personnel Terminal");
  process.exit();
}

// init();
