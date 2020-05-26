let { filter } = require("../config/filter");

exports.docAnalyzer = function (pdname, docText) {
    let result = { productName: pdname };
    for (let value of filter.values()) {
        result[value] = 0;
    }

    let rows = docText.split("\n");
    rows.forEach(row => {
        checkKeywords(row);
    });

    console.log(result);
    return result;

    function checkKeywords(str) {
        for (let [key, value] of filter) {
            if (str.includes(key)) {
                result[value] = 1;
            }
        }
    }
}