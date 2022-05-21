Steps to rebuild this repo.


mkdir node-express-typescript
cd node-express-typescript/
npm init --yes

npm install express dotenv

Next, to trigger a minimal server, create a new file called index.js at the root of the project with the following code:

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});


The dotenv package is used to read environment variables from the .env file. Create it in the root of your Node.js app, then create the environment variable for PORT=8000.

To start the server, go back to the terminal and trigger the command node index.js

Transform to TS

npm i -D typescript @types/express @types/node

npx tsc --init

One option that you will have to enable is called outDir, which specifies where the output will be located after the compilation step. You can search for this option in the tsconfig.json file and uncomment it.

"compilerOptions": {
    "outDir": "./dist"

First, rename the file to index.ts. The .ts extension is a file extension that determines what TypeScript files are compiled to JavaScript files later when we build the server.

Open the index.ts file and modify it, as shown below:

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


npm install -D concurrently nodemon

After installing these dev dependencies, update the scripts in the package.json file:

{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
  }
}

The build command will compile the code in JavaScript inside a dist directory. The dev command is used to run the Node.js server in development mode.

Now, go back to the terminal window and run npm run dev to trigger the development server