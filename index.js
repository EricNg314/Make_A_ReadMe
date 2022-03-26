const inquirer = require("inquirer");
const fs = require("fs");

let readMeStr = "";

async function buildReadme() {
  const filename = "./result/README.md";
  const titleStr = await buildTitle();
  const descriptionStr = buildDescription("description");
  const tableOfContentsStr = buildTableOfContents("tableOfContents");

  console.log(titleStr);
  readMeStr += `${titleStr}${tableOfContentsStr}${descriptionStr}`;
  console.log(readMeStr);
  fs.writeFile(filename, readMeStr, (err) =>
    err ? console.log(err) : console.log(`Success! Please check ${filename}`)
  );
}


async function buildTitle () {
  console.log('individual buildTitle')
  let titleStr = '';
  await inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Title:",
      }
    ])
    .then(data => {
      console.log('individual')
      const {title} = data;
      if (title) {
        titleStr = `# ${title}
      `;
      }
    });
    console.log(titleStr)
    return titleStr;
};

const buildDescription = (description) => {
  let descriptionStr = "";
  if (description) {
    inquirer.prompt([]).then((data) => {});
    descriptionStr = `## Description
    ${description}
    
    `;
  }
  return descriptionStr;
};

const buildTableOfContents = (tableOfContents) => {
  // console.log(data)
  let tableOfContentsStr = "";
  if (tableOfContents) {
    tableOfContentsStr = `## tableOfContents
    ${tableOfContents}
    
    `;
  }
  return tableOfContentsStr;
};



buildReadme();

// inquirer
//   .prompt([
//     {
//       name: "title",
//       type: "input",
//       message: "Title:",
//     },
//     {
//       name: "description",
//       type: "input",
//       message: "Description:",
//     },
//     {
//       name: "tableOfContents",
//       type: "confirm",
//       message: "Table Of Contents:",
//     },
//     {
//       name: "installation",
//       type: "input",
//       message: "Installation:",
//     },
//     {
//       name: "usage",
//       type: "input",
//       message: "Usage:",
//     },
//     {
//       name: "license",
//       type: "input",
//       message: "License:",
//     },
//     {
//       name: "contributing",
//       type: "input",
//       message: "Contributing:",
//     },
//     {
//       name: "tests",
//       type: "input",
//       message: "Tests:",
//     },
//     {
//       name: "questions",
//       type: "input",
//       message: "Questions:",
//     },
//   ])
//   .then((data) => {
//     // const {title, description, tableOfContents, installation, usage, license, contributing, tests, questions} = data;
//   });
