const inquirer = require("inquirer");
const fs = require("fs");

let readMeStr = "";

async function buildReadme() {
  const filename = "./result/README.md";
  const title = await buildTitle();
  const titleStr = title ? `# ${title} \n` : "";
  const descriptionStr = await buildDescription();
  const installationStr = await buildInstallation();
  const headers = {
    "Installation": installationStr !== ""
  };
  const tableOfContentsStr = await buildTableOfContents(headers);

  readMeStr += `${titleStr}${descriptionStr}${tableOfContentsStr}${installationStr}`;
  console.log(readMeStr);
  fs.writeFile(filename, readMeStr, (err) =>
    err ? console.log(err) : console.log(`Success! Please check ${filename}`)
  );
}

const buildTitle = async () => {
  let titleStr = "";
  await inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Title:",
      },
    ])
    .then((data) => {
      const { title } = data;
      titleStr = title;
    });
  return titleStr;
};

const buildDescription = async () => {
  let descriptionStr = "";
  await inquirer
    .prompt([
      {
        name: "motivation",
        type: "input",
        message: "What was your motivation?",
      },
      {
        name: "why",
        type: "input",
        message: "Why did you build this project?",
      },
      {
        name: "problem",
        type: "input",
        message: "What problem does it solve?",
      },
      {
        name: "learn",
        type: "input",
        message: "What did you learn?",
      },
    ])
    .then((data) => {
      const { motivation, why, problem, learn } = data;
      descriptionStr = `\n## Description \n`;
      descriptionStr += ` - What was your motivation? ${motivation} \n`;
      descriptionStr += ` - Why did you build this project? ${why} \n`;
      descriptionStr += ` - What problem does it solve? ${problem} \n`;
      descriptionStr += ` - What did you learn? ${learn} \n\n`;
    });
  return descriptionStr;
};

const buildInstallation = async () => {
  let installationStr = "";
  let completeInstruction = false;
  let needHeader = true;
  let needInstallation = true;
  do {
    if(needHeader === true){
      await inquirer
        .prompt([
          {
            name: "instruction",
            type: "confirm",
            message: "Add installation instructions?",
          },
        ])
        .then((data) => {
          const { instruction } = data;
          
          if (instruction === true) {
            installationStr = `\n## Installation \n`;
          }
          needInstallation = instruction;
          needHeader = false;
        });
    };
    if(needInstallation === false){
      // Ends loops if installation is not required.
      break;
    };
    await inquirer
      .prompt([
        {
          name: "installText",
          type: "input",
          message: "How to install(text)?",
        },
        {
          name: "installCode",
          type: "input",
          message: "How to install(code)?",
        },
        {
          name: "moreInstructions",
          type: "confirm",
          message: "Add more instructions?",
        }
      ])
      .then((data) => {
        console.log('data: ', data)
        const { installText, installCode, moreInstructions } = data;
        installationStr += ` - ${installText} \n`;
        installationStr += ' - ```\n    ' + installCode + '\n    ``` \n';

        completeInstruction = !moreInstructions
      });
    // completeInstruction = true;
  } while (completeInstruction === false);

  return installationStr;
};

const buildTableOfContents = async (headers) => {
  console.log("headers: ", headers);
  let tableOfContentsStr = "";
  await inquirer
  .prompt([
    {
      name: "tableOfContents",
      type: "confirm",
      message: "Add table of contents?",
    },
  ])
  .then((data) => {
    const { tableOfContents } = data;
    if (tableOfContents) {
      tableOfContentsStr = `\n## Table Of Contents \n`;
      for (const [key,value] of Object.entries(headers)){
        console.log('key: ', key)
        console.log('value: ', value)
        if(value === true){
          tableOfContentsStr += ` - [${key}](#${key.toLowerCase()}) \n`
        }
      }
    }
  })

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
