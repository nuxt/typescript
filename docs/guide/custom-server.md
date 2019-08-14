# Custom Server

You can use Nuxt and TypeScript programatically with a custom server like [Express](https://expressjs.com/) or [Koa](https://koajs.com/).
In order to do this, you need to compile your server code yourself.

Create a directory to house your server code, e.g. `server/`

## tsconfig

Add a `tsconfig.json` that fits with your project in this directory, this lets us compile code
to something that Node will understand and have more flexibility on the output. You can
also extend your root nuxt `tsconfig.json` if you like.

For example:

```json
{
  "compilerOptions": {
    "extends": "../tsconfig.json",
    "module": "commonjs",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "noEmit": false,
    "baseUrl": ".",
    "outDir": "../server-dist"
  },
  "include": ["./**/*.ts"]
}
```

We've also added an `outDir` so our code can be compiled to the root directory.

Add that to your `.gitignore`

```
server-dist
```

## Entrypoint

Create an entrypoint e.g. `server/index.ts`.
We can use a refactored version of Nuxt's Express [server example](https://nuxtjs.org/api/nuxt-render/).

```ts
import { Nuxt, Builder } from "nuxt";
import express from "express";
import config from "../nuxt.config";

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

const app = express();

// We instantiate Nuxt.js with the options
config.dev = !isProd;
const nuxt = new Nuxt(config);

// Render every route with Nuxt.js
app.use(async (req, res) => {
  // Wait until nuxt is ready before starting.
  await nuxt.ready();
  nuxt.render(req, res);
});

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build().then(listen);
} else {
  listen();
}

async function listen() {
  // Listen the server
  const hostname = "0.0.0.0";
  await app.listen(port, hostname);
  // eslint-disable-next-line no-console
  console.log(`Listening on ${hostname}:${port}`);
}
```

## Scripts

Add the compilation step to your `build` script.

```json
{
  "scripts": {
    "build": " nuxt build; tsc --project server/tsconfig.json"
  }
}
```

Update your start script

```diff
{
  "scripts": {
    "build": " nuxt build; tsc --project server/tsconfig.json",
+   "start": "cross-env NODE_ENV=production node ./server-dist/server/index.js"
  }
}
```

For development, if you have `nodemon` installed you can add a `nodemon.json` to your
root directory, which will let you run `ts-node` (install as a devDependency), while watching for file changes in your
server code.

```json
// nodemon.json

{
  "watch": ["nuxt.config.ts", "./server/index.ts"],
  "ext": "ts",
  "exec": "ts-node --project server/tsconfig.json server/index.ts"
}
```

Update your dev command:

```diff
{
  "watch": ["nuxt.config.ts", "./server/index.ts"],
  "ext": "ts",
  "exec": "ts-node --project server/tsconfig.json server/index.ts",
+ "dev": "nodemon"
}
```

Nodemon will pick up the configuration from `nodemon.json`.

##  Usage

You can now run `npm run dev` to have a development server, where Nuxt will watch for file changes.

### Building for Production

`npm run build`

### Serving for Production

`npm run start`
