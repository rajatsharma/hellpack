import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { basename } from "path";
import { cwd } from "process";

interface Options {
  withDb: boolean;
  withExpress: boolean;
}

function getOptions(): Options {
  // Simulating parsing logic
  return {
    withDb: process.argv.includes("--with-db"),
    withExpress: process.argv.includes("--with-express"),
  };
}

const packageJsonTemplate = (name: string) => `{
 "name": "${name}",
 "version": "1.0.0",
 "description": "",
 "main": "dist/index.js",
 "scripts": {
   "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json",
   "dev": "node --import=tsx src/index.ts"
 },
 "keywords": [],
 "author": "Rajat Sharma",
 "license": "UNLICENSED",
 "dependencies": {},
 "devDependencies": {
   "@types/node": "^22.10.6",
   "prettier": "^3.4.2",
   "tsc-alias": "^1.8.10",
   "tsx": "4.19.2",
   "typescript": "^5.7.3"
 }
}`;

const tsconfigJson = `{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {},
    "target": "es2016",
    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "outDir": "./dist",
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}`;

function main() {
  const { withDb, withExpress } = getOptions();
  const directoryName = basename(cwd());

  writeFileSync("package.json", packageJsonTemplate(directoryName));
  writeFileSync("tsconfig.json", tsconfigJson);

  execSync("pnpm i -D prettier @types/node typescript tsx", {
    stdio: "inherit",
  });

  if (withDb) {
    execSync("pnpm i slonik", { stdio: "inherit" });
    execSync("db-up", { stdio: "inherit" });
  }

  if (withExpress) {
    execSync("pnpm i express", { stdio: "inherit" });
  }
}

main();
