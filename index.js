const inquirer = require("inquirer");
const fs = require("fs");

let readMeStr = "";

async function buildReadme() {
  const filename = "./result/README.md";
  const title = await buildTitle();
  const titleStr = title ?  `# ${title} \n\n` : "";
  const descriptionStr = await buildDescription();
  let headers = {
    'title': title
  }
  const tableOfContentsStr = await buildTableOfContents("tableOfContents", title);

  // console.log(titleStr);
  readMeStr += `${titleStr}${descriptionStr}${tableOfContentsStr}`;
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
      // if (title) {
      //   titleStr = `# ${title}
      // `;
      // }
    });
  // console.log(titleStr);
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
      }
    ])
    .then((data) => {
      const { motivation, why, problem, learn } = data;
        descriptionStr = `## Description \n`
        descriptionStr += ` - What was your motivation? ${motivation} \n`
        descriptionStr += ` - Why did you build this project? ${why} \n`
        descriptionStr += ` - What problem does it solve? ${problem} \n`
        descriptionStr += ` - What did you learn? ${learn} \n\n`
    });
  return descriptionStr;
};

const buildTableOfContents = async (tableOfContents, ...variables) => {
  console.log('variables: ', variables)
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
