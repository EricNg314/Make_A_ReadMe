const inquirer = require("inquirer");
const fs = require("fs");

let readMeStr = "";

async function buildReadme() {
  const filename = "./result/README.md";
  const title = await buildTitle();
  const titleStr = title ? `# ${title} \n` : "";
  const descriptionStr = await buildDescription();
  const installationStr = await buildInstallation();
  const usageStr = await buildUsage();
  const contributorStr = await buildContributor();
  
  const headers = {
    "Installation": installationStr !== "",
    "Usage": usageStr !== "",
    "Contributor": contributorStr !== ""
  };
  const tableOfContentsStr = await buildTableOfContents(headers);

  readMeStr += `${titleStr}${descriptionStr}${tableOfContentsStr}${installationStr}${usageStr}${contributorStr}`;
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
  let needInstruction = false;
  await inquirer
    .prompt([
      {
        name: "header",
        type: "confirm",
        message: "Add installation instructions?",
      },
    ])
    .then((data) => {
      const { header } = data;
      
      if (header === true) {
        installationStr = `\n## Installation \n`;
      }
      needInstruction = header;
    });
  while (needInstruction === true) {
    await inquirer
      .prompt([
        {
          name: "installText",
          type: "input",
          message: "How to install: Text?",
        },
        {
          name: "installCode",
          type: "input",
          message: "How to install: Code?",
        },
        {
          name: "moreInstructions",
          type: "confirm",
          message: "Add more instructions?",
        }
      ])
      .then((data) => {
        const { installText, installCode, moreInstructions } = data;
        installationStr += ` - ${installText} \n`;
        installationStr += ' - ```\n    ' + installCode + '\n    ``` \n';

        needInstruction = moreInstructions
      });
  };

  return installationStr;
};

const buildUsage = async () => {
  let usageStr = "";
  let needInstruction = false;
  await inquirer
    .prompt([
      {
        name: "header",
        type: "confirm",
        message: "Add usage instructions?",
      },
    ])
    .then((data) => {
      const { header } = data;
      
      if (header === true) {
        usageStr = `\n## Usage \n`;
      }
      needInstruction = header;
    });
  while (needInstruction === true) {
    await inquirer
      .prompt([
        {
          name: "usageText",
          type: "input",
          message: "How to use: Text?",
        },
        {
          name: "usageCode",
          type: "input",
          message: "How to use: Code?",
        },
        {
          name: "usageImage",
          type: "input",
          message: "How to use: Image link? (leave blank if N/A)",
        },
        {
          name: "moreInstructions",
          type: "confirm",
          message: "Add more instructions?",
        }
      ])
      .then((data) => {
        const { usageText, usageCode, usageImage, moreInstructions } = data;
        usageStr += ` - ${usageText} \n`;
        usageStr += ' - ```\n    ' + usageCode + '\n    ``` \n';
        if(usageImage !== ""){
          usageStr += ` - <img src="${usageImage}" alt="${usageText}"/>\n`;
        }
        needInstruction = moreInstructions
      });
  };
  return usageStr;
};

const buildContributor = async () => {
  let contributorStr = "";
  let needContributor = false;
  await inquirer
    .prompt([
      {
        name: "header",
        type: "confirm",
        message: "Add contributors?",
      },
    ])
    .then((data) => {
      const { header } = data;
      
      if (header === true) {
        contributorStr = `\n## contributor \n`;
      }
      needContributor = header;
    });
  while (needContributor === true) {
    await inquirer
      .prompt([
        {
          name: "contributorName",
          type: "input",
          message: "Contributor: Name?",
        },
        {
          name: "contributorLink",
          type: "input",
          message: "Contributor: Link?",
        },
        {
          name: "contributorLinkText",
          type: "input",
          message: "Contributor: Link text?",
        },
        {
          name: "moreContributors",
          type: "confirm",
          message: "Add more contributors?",
        }
      ])
      .then((data) => {
        const { contributorName, contributorLink, contributorLinkText, moreContributors } = data;
        contributorStr += ` - **${contributorName}** `;
        if(contributorLinkText !== "" || contributorLink !== ""){
          contributorStr += ` - [${contributorLinkText}](${contributorLink}) \n`;
        } else {
          contributorStr += `\n`;
        }
        needContributor = moreContributors
      });
  };
  return contributorStr;
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
