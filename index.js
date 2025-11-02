const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const codePath = args[0];

if (!codePath) {
    console.error('Please provide a path to analyze.');
    process.exit(1);
}

function analyzeCode(directory) {
    if (!fs.existsSync(directory)) {
        console.error(`The specified path does not exist: ${directory}`);
        return;
    }
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error retrieving file info: ${err.message}`);
                    return;
                }
                if (stats.isDirectory()) {
                    analyzeCode(filePath);
                } else {
                    console.log(`Analyzing: ${filePath}`);
                    // Add analysis logic here
                }
            });
        });
    });
}

analyzeCode(codePath);