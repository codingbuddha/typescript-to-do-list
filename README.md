Basic set up
--------------------------------------------------------------------
1. Install Node 
    https://nodejs.org/en/download
2. Install Typescript as a dev dependency
    npm i --save-dev typescript
3. Create tsconfig.json file
    npx tsc --init

Basic set up doesn't have support to bundle third party node modules.

Using snowpack
---------------------------------------------------------------------
npx create-snowpack-app my-app --template @snowpack/app-template-blank --use-typescript

Extensions
1. HTML CSS Support