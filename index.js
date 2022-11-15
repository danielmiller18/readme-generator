// need to const fs variable here
const fs = require("fs")


// the inquirer variable
const inquirer = require("inquirer");


// markdown js file
const generateMarkdown = require("./utils/generateMarkdown");


// License function and if/else section here

function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

function validateInput(value) {
    if (value != "") {
        return true;
    }
    else {
        return "Please answer the question with some kind of input"
    }

}

const questions = [
    // Question for the title
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: validateInput
    },

    // Question for the project Description
    {
        type: "input",
        name: "Description",
        message: "Please enter a description of your project",
        validate: validateInput,
    },

    // Table of contents, andling this in the markdown.js

    // Question for Installation
    {
        type: "input",
        name: "installation",
        message: "Please write the description how to install the software, or commands for the program",
        validate: validateInput,

    },
    //Question for the Usage
    {
        type: "input",
        name: "usage",
        message: "Please write the description how to use the software, or commands for the program",
        validate: validateInput,
    },

    // Question for licenses
    {
        type: "list",
        name: "license",
        message: "Please select a license for this project",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "MPL 2.0",

        ],
        validate: validateInput,
    },

    // Question for the contibuting
    {
        type: "input",
        name: "contributing",
        message: "how can other users contribute the your project",
        validate: validateInput,

    },

    // Question for Tests
    {
        type: "input",
        name: "contributing",
        message: "Please enter any testing instruction for this project",
        validate: validateInput
    },

    // Question for github
    {
        type: "input",
        name: "userName",
        message: "What is your Github username",
        validate: validateInput,
    },


    // Question for github email address

    {
        type: "input",
        name: "userEmail",
        message: "What is your Github email address",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true

            } else {
                return "Please write a valid address"
            }

        }
    }





]

// function to make to readme here
function writeToFile(fileName, date){
    fs.writeFile(fileName, generateMarkdown(date), function(err){
        if(err){ // to check if err === true
            return console.log(err)
        }
    })

}

function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/readme.md", data);
    });
}



init();