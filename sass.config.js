/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
const sass = require("node-sass");
var process = require("process");
var fs = require("fs");
var args = {};

const consoleColor = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
};

// Get the files from the requested folder
function getFiles() {
    const sourceDir = args["-r"];

    return new Promise(function (resolve, reject) {
        fs.readdir(sourceDir, (err, files) => {
            if (err) {
                reject();
            }

            console.log(files);

            const sassFiles = files.filter((r) => { return r.endsWith(".scss") || r.endsWith(".sass"); });

            console.log(sassFiles);

            const sassPaths = sassFiles.map((file) => {
                return sourceDir + "/" + file;
            });
            resolve(sassPaths);
        });
    });
}

// Run node sass on the requested file
function nodeSass(file) {
    return new Promise(function (resolve, reject) {
        try {
            const targetDir = args["-o"];
            const outputStyle = args["--output-style"];

            const fileName = file.split("/").pop();
            const outFile = targetDir + "/" + fileName.replace(".scss", ".css");

            const result = sass.renderSync({
                file,
                outFile,
                outputStyle,
            }, function (err, result) {
                if (err) { return console.log(`${consoleColor.fgRed}%s${consoleColor.reset}`, err); }
            });

            let targetFile = outFile;
            if (outputStyle === "compressed") {
                targetFile = outFile.replace(".css", ".min.css");
            }

            fs.writeFile(targetFile, result.css.toString(), (err) => {
                if (err) {
                    console.log(`${consoleColor.fgRed}%s${consoleColor.reset}`, err);
                    reject();
                }
                console.log(`${consoleColor.fgGreen}%s${consoleColor.reset}`, `File succesfully written to ${targetFile}`);
                resolve();
            });
        }
        catch (ex) {
            console.log(`${consoleColor.fgRed}%s${consoleColor.reset}`, ex);
            reject();
        }
    });
}

// Run node Sass for all requested files
function nodeSassRun() {
    getFiles().then((files) => {
        if (!files || !files.length) {
            console.log(`${consoleColor.fgYellow}%s${consoleColor.reset}`, "No files to watch");
            process.exit();
        }

        console.log(`${consoleColor.fgYellow}%s${consoleColor.reset}`, `Start run on ${new Date()}`);

        let jobs = [];
        files.forEach((file) => {
            jobs.push(nodeSass(file));
        });

        Promise.all(jobs).then(() => {
            console.log(`${consoleColor.fgGreen}%s${consoleColor.reset}`, `Jobs completed succesfully on ${new Date()}`);
            // Exit the application
            process.exit();
        }).catch(() => {
            console.log(`${consoleColor.fgRed}%s${consoleColor.reset}`, `Not all jobs completed succesfully on ${new Date()}`);
            // Exit the application with an error
            process.exit(1);
        });
    });
}

// START
function parseArgs() {
    // Parse the arguments
    const unusedArgs = 2;
    var myArgs = process.argv.slice(unusedArgs);
    for (let i = 0; i < myArgs.length; i += unusedArgs) {
        const prop = myArgs[i];
        let value = myArgs[i + 1];
        if (prop === "-w") {
            value = prop;
        }
        args[prop] = value;
    }
}

function main() {
    // parse the args provided by the command
    parseArgs();

    // RUN node-sass to the SCSS or SASS files in the provided folder
    nodeSassRun();
}

main();
