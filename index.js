const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { exit, listenerCount } = require("process");
require("console.table");

function init() {
  const ascii = logo({
    name: "Deep Space 9 \n Personnel Terminal",
  }).render();

  console.log(ascii);

  mainPrompt();
}

async function mainPrompt() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select an action.",
      choices: [
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

  switch (choice) {
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
  const newOrg = await prompt(
    {
      name: "org_name",
      message: "Enter the name of the organization you'd like to add:",
    },
  );

  await db.createOrg(newOrg);

  console.log("\nNew organization added.\n");

  mainPrompt();
}

async function createTitle() {
  const orgList = await db.readOrg();

  console.table(orgList);

  const newTitle = await prompt([
    {
      name: "title",
      message: "Enter the name of the title you'd like to add:",
    },
    {
      name: "salary",
      message: "Designate a salary for this role:"
    },
    {
      name: "org_id",
      message: "Identify the organization's ID supervising this role:"
    }
  ]);

  await db.createTitle(newTitle);

  console.log("\nNew role added.\n");

  mainPrompt();
}

async function createEmployee() {
  // const orgList = db.readOrg();
  const roleList = await db.readTitles();
  const managerList = await db.readManagers();

  console.table(roleList)
  console.table(managerList)

  const newEmp = await prompt ([
    {
      name: "first_name",
      message: "First Name:",
    },
    {
      name: "last_name",
      message: "Last Name:"
    },
    {
      name: "role_id",
      message: "Identify the role ID for this employee:" 
    },
    {
      name: "manager_id",
      message: "Identify the manager's ID supervising this role:"
    }
  ]);

  await db.createEmployee(newEmp);

  console.log("\nNew employee added.\n");

  mainPrompt();
}

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

async function updateTitle() {
  const employeeList = await db.readEmpEdit();

  console.table(employeeList)


  const { employee_id } = await prompt([
    {
      name: "employee_id",
      message: "Select the employee's ID you'd like to update:",
    }
  ]);11

  const rolesList = await db.readTitles();

  console.table(rolesList);

  const { newRole_id } = await prompt([
    {
      name: "newRole_id",
      message: "Assign a new role ID to the selected employee?:"
    }
  ]);

  await db.updateTitle(employee_id, newRole_id);

  console.log("\nRole changed.\n");

  mainPrompt();


}

function endProgram() {
  console.log("Thank you for using the Deep Space 9 Personnel Terminal");
  exit();
}

init();
