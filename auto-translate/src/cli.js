const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const { Spinner } = require("clui");
const Inquirer = require("inquirer");
const { translateFromTo } = require("./translate");

clear();

console.log(
  chalk.yellow(figlet.textSync("AUTO-translate", { horizontalLayout: "full" }))
);

async function run() {
  try {
    const config = await ask();
    const { fromLang, toLang } = config;

    const loader = new Spinner(
      `Executing "AUTO-translate" from "${fromLang}" to "${toLang}", please wait...`
    );
    loader.start();
    await translateFromTo(fromLang, toLang);
    loader.stop();

    console.log(chalk.green(`Translation DONE !!!"`));
  } catch (error) {
    console.log(
      chalk.red(figlet.textSync("ERROR", { horizontalLayout: "full" }))
    );
    console.log(error);
  } finally {
    process.exit(0);
  }
}

run();

function ask() {
  const questions = [
    {
      name: "fromLang",
      type: "text",
      message: "Choose origin language",

      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please chose the BCP-47 language code of the origine resource. Eg: fr or en-US";
        }
      },
    },
    {
      name: "toLang",
      type: "text",
      message: "Choose destination language",

      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please chose the BCP-47 language code of the destination resource. Eg: fr or en-US";
        }
      },
    },
  ];
  return Inquirer.prompt(questions);
}
