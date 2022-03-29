const inquirer = require("inquirer");
const fs = require("fs");

let readMeStr = "";

async function buildReadme() {
  const filename = "./assets/README.md";
  const title = await buildTitle();
  const titleStr = title ? `# ${title} \n` : "";
  const descriptionStr = await buildDescription();
  const installationStr = await buildInstallation();
  const usageStr = await buildUsage();
  const contributorStr = await buildContributor();
  const licenseStr = await buildLicense();
  const badgeStr = await buildBadge();
  
  const headers = {
    "Installation": installationStr !== "",
    "Usage": usageStr !== "",
    "Contributor": contributorStr !== "",
    "License": licenseStr !== ""
  };
  const tableOfContentsStr = await buildTableOfContents(headers);

  readMeStr += `${titleStr}${badgeStr}${descriptionStr}${tableOfContentsStr}${installationStr}${usageStr}${contributorStr}${licenseStr}`;
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
        validate: answer => {
          if(answer){
            return true;
          } else {
            console.log("Please provide a title.")
          }
        }
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
      descriptionStr += ` - What was your motivation? \n   - ${motivation} \n`;
      descriptionStr += ` - Why did you build this project? \n   - ${why} \n`;
      descriptionStr += ` - What problem does it solve? \n   - ${problem} \n`;
      descriptionStr += ` - What did you learn? \n   - ${learn} \n\n`;
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
          message: "Usage: Text?",
        },
        {
          name: "usageCode",
          type: "input",
          message: "Usage: Code?",
        },
        {
          name: "usageImage",
          type: "input",
          message: "Usage: Image link? (leave blank if N/A)",
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
        contributorStr = `\n## Contributor \n`;
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

const buildLicense = async () => {
  let licenseStr = "";
  let needLicense = false;
  await inquirer
    .prompt([
      {
        name: "header",
        type: "confirm",
        message: "Add a license?",
      },
    ])
    .then((data) => {
      const { header } = data;
      
      if (header === true) {
        licenseStr = `\n## License \n`;
      }
      needLicense = header;
    });
  if (needLicense === true) {
    await inquirer
      .prompt([
        {
          name: "licenseType",
          type: "list",
          message: "What license type?",
          choices: ['mit','apache-2.0','gpl-3.0']
        },
        {
          name: "licenseYear",
          type: "input",
          message: "Copyright: Year?",
          validate: answer => {
            if(Number.parseInt(answer) == answer){
              return true;
            } else {
              console.log("\nNeeds to be a year number.")
              return false;
            }
          }
        },
        {
          name: "licenseFullName",
          type: "input",
          message: "Copyright: Full Name?",
        }
      ])
      .then((data) => {
        const {licenseType, licenseYear, licenseFullName} = data;
        licenseStr += licenseOptions(licenseType, licenseYear, licenseFullName)
        needLicense = false
      
      });
  };
  return licenseStr;
};


const buildBadge = async () => {
  let badgeStr = "";
  await inquirer
    .prompt([
      {
        name: "badgeType",
        type: "checkbox",
        message: "What badge type?",
        choices: ['JavaScript', 'HTML', 'CSS', 'NodeJS', 'ExpressJS', 'Python', 'React', 'React Native', 'MongoDB', 'MySQL']
      },
    ])
    .then((data) => {
      const {badgeType} = data;
      if(badgeType.length > 0){
        badgeStr += badgeOptions(badgeType)
      }
    });

  return badgeStr;
};

const buildTableOfContents = async (headers) => {
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
        if(value === true){
          tableOfContentsStr += ` - [${key}](#${key.toLowerCase()}) \n`
        }
      }
    }
  })

  return tableOfContentsStr;
};

const badgeOptions = (badgeType) => {
  let badgesIcons = '';
  const badgeInfo = {
    'JavaScript': '\n <img src="https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E" alt="JavaScript Badge"/>',
    'HTML': '\n <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5 Badge"/>',
    'CSS': '\n <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3 Badge"/>',
    'NodeJS': '\n <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" alt="NodeJS Badge"/>',
    'ExpressJS': '\n <img src="https://img.shields.io/badge/Express.js-404D59?style=flat" alt="ExpressJS Badge"/>',
    'Python': '\n <img src="https://img.shields.io/badge/Python-14354C?style=flat&logo=python&logoColor=white" alt="Python Badge"/>',
    'React': '\n <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React Badge"/>',
    'React Native': '\n <img src="https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React Native Badge"/>',
    'MongoDB': '\n <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="MongoDB Badge"/>',
    'MySQL': '\n <img src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="MySQL Badge"/>'
  }

  badgesIcons += '<div align="center">'
  badgeType.map((badgeName) => {
    badgesIcons += badgeInfo[badgeName]
  })
  badgesIcons += '\n</div>\n'
  return badgesIcons;

}

const licenseOptions = (licenseName, year, fullName) => {
  const licenses = {
    'mit': `\n\nThe MIT License (MIT)\n\nCopyright (c) ${year} ${fullName}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n \n`,
    'apache-2.0': `### [Apache License](http://www.apache.org/licenses/)\n Version 2.0, January 2004\n\n A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n`,
    'gpl-3.0': `### [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) \nPermissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.`
  }
  return licenses[licenseName];
}

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
