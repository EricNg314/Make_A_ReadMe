const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
  {
    name: 'title',
    type: 'input',
    message: 'Title:'
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description:'
  },
  {
    name: 'tableOfContents',
    type: 'input',
    message: 'Table Of Contents:'
  },
  {
    name: 'installation',
    type: 'input',
    message: 'Installation:'
  },
  {
    name: 'usage',
    type: 'input',
    message: 'Usage:'
  },
  {
    name: 'license',
    type: 'input',
    message: 'License:'
  },
  {
    name: 'contributing',
    type: 'input',
    message: 'Contributing:'
  },
  {
    name: 'tests',
    type: 'input',
    message: 'Tests:'
  },
  {
    name: 'questions',
    type: 'input',
    message: 'Questions:'
  },
]).then(data => {
  const filename = './result/README.md';
  const {title, description, tableOfContents, installation, usage, license, contributing, tests, questions} = data;
  const titleStr = buildTitle(title);
  const readMeStr = `${titleStr}
  `
  console.log(readMeStr)
  fs.writeFile(filename, readMeStr, err =>
    err ? console.log(err) : console.log(`Success! Please check ${filename}`)
  );
});

const buildTitle = (title) => {
  let titleStr = "";
  if(title){
    titleStr = `# ${title}`
  }
  return titleStr;
}


