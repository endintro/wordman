let WordExtractor = require('word-extractor');
let mammoth = require('mammoth');


/**
 *  根据文件后缀，读取doc或docx文档中的文本
 */
exports.extractWord = async function (path) {
    let extracted, lastword = path[path.length - 1];
    switch (lastword) {
        case 'c':
            let extractor = new WordExtractor();
            let t = Date.now();
            extracted = await extractor.extract(path);
            //console.log('DOC Extract Time:'+(Date.now()-t));
            return extracted.getBody();
        case 'x':
            let x = Date.now();
            extracted = await mammoth.extractRawText({ path: path });
            //console.log('DOX Extract Time:'+(Date.now()-x));
            return extracted.value;
        default:
            throw new Error("file name error");
    }
}    