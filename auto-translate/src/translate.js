const fs = require("fs/promises");

require("dotenv").config();
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate();

async function translateText(text, fromLang, toLang) {
  let [translations] = await translate.translate(text, {
    from: fromLang,
    to: toLang,
    model: "nmt",
  });
  return Array.isArray(translations) ? translations[0] : translations;
}

async function traverseObject(obj, fromLang, toLang) {
  if (obj && typeof obj === "object") {
    var allKeys = Object.keys(obj);
    for (var i = 0; i < allKeys.length; i++) {
      var k = allKeys[i];

      var value = obj[k];

      if (typeof value === "object") {
        await traverseObject(value, fromLang, toLang);
      } else {
        const translated = await translateText(value, fromLang, toLang);
        obj[k] = translated;
      }
    }
  }
}

async function translateFromTo(fromLang, toLang) {
  const langResource = require(`../data/${fromLang}.json`);
  await traverseObject(langResource, fromLang, toLang);

  await fs.writeFile(
    `${__dirname}/../data/${toLang}.json`,
    JSON.stringify(langResource, null, 2)
  );
}

module.exports = { translateFromTo };
