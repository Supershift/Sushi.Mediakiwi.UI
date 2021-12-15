// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  
  projects: [
    "./src",
    {
      root: "./src", // Shorthand for specifying only the project root location
      package: "./package.json", // Shorthand for specifying only the package.json location
      tsconfig: "./tsconfig.json", // Shorthand for specifying only the tsconfig.json location
      snippetFolder: "./.vscode/vetur/snippets", // Shorthand for specifying only the snippet folder location
      outDir: "./dist", // Shorthand for specifying only the outDir location
    }
  ]
};