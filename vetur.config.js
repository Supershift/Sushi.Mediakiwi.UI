// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    projects: [
        {
            root:"./src", // Shorthand for specifying only the project root location
            outDir:"./dist", // The output directory for the generated files
            tsconfig:"./tsconfig.json", // The path to the tsconfig.json file
        }
    ]
};
