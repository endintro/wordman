let fs = require("fs");
let path = require("path");
let wordExtractor = require("./util/wordExtractor");
let { docAnalyzer } = require("./util/docAnalyzer");
let { exportFile } = require("./util/exportFile");

const options = {
    fileDir: "./data",
    exportFilename: "results.csv",
    isGBK: false,
};

wordman(options);

async function wordman(options) {
    const files = fs.readdirSync(options.fileDir);
    const fileContent = [];

    for (let fileName of files) {
        let extname = path.extname(fileName);
        if (extname === '.doc' || extname === '.docx') {
            let fullPath = options.fileDir + '/' + fileName;
            try {
                const docText = await wordExtractor.extractWord(fullPath);
                const row = docAnalyzer(fileName.split(extname)[0], docText);
                fileContent.push(row);
            } catch (err) {
                console.log(err);
            }
        }
    }

    exportFile(options, fileContent);
}
