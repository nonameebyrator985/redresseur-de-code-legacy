const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const codePath = args[0];

if (!codePath) {
    console.error('Veuillez fournir un chemin vers le code à analyser.');
    process.exit(1);
}

function analyzeCode(directory) {
    // Logique d'analyse pour le code hérité
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Erreur lors de la lecture du répertoire : ${err.message}`);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Erreur lors de la récupération des stats du fichier : ${err.message}`);
                    return;
                }
                if (stats.isDirectory()) {
                    analyzeCode(filePath);
                } else {
                    console.log(`Analyzing: ${filePath}`);
                    // Ajouter logique d'analyse ici
                }
            });
        });
    });
}

analyzeCode(codePath);