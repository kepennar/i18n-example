# Translate label

Using Google Translate API

## HOWTO

### Google translate API

Generate a google translate API service account and store the json file in the project. eg `translation-service-account.json`

Create a `.env` file and configure the `GOOGLE_APPLICATION_CREDENTIALS` variable with the path of your service account file

### Install the dependencies

```sh
yarn
```

### Data

Store the file to be translated in the data folder.
E.g. for a french language resource file `data/fr.json`

### Launch the cli

```sh
yarn translate:cli
```

Respond the prompted question

For example

```sh
     _      _   _   _____    ___            _                                  _           _
    / \    | | | | |_   _|  / _ \          | |_   _ __    __ _   _ __    ___  | |   __ _  | |_    ___
   / _ \   | | | |   | |   | | | |  _____  | __| | '__|  / _` | | '_ \  / __| | |  / _` | | __|  / _ \
  / ___ \  | |_| |   | |   | |_| | |_____| | |_  | |    | (_| | | | | | \__ \ | | | (_| | | |_  |  __/
 /_/   \_\  \___/    |_|    \___/           \__| |_|     \__,_| |_| |_| |___/ |_|  \__,_|  \__|  \___|

? Choose origin language fr
? Choose destination language zh
```

You'll get a `data/zh.json` file containing translated labels from french to chinese
