let iconv = require('iconv-lite');
let fs = require("fs");
let { filter } = require("../config/filter");

exports.exportFile = function (options, fileContent) {

    const filePath = options.fileDir + '/' + options.exportFilename;

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    const header = getCsvHeader();
    fs.writeFileSync(filePath, iconvEncode(header, options.isGBK));

    for (let obj of fileContent) {
        const arr = Object.values(obj);
        const row = arr.join(",") + "\n";
        fs.appendFileSync(filePath, iconvEncode(row, options.isGBK));
    }
}

function getCsvHeader() {
    let s = new Set();
    for (let value of filter.values()) {
        s.add(value);
    }
    return "产品名称," + [...s].join(",") + '\n';
}

function iconvEncode(data, isGBK) {
    if (isGBK) {
        return iconv.encode(data, 'GBK');
    }
    return data;
}