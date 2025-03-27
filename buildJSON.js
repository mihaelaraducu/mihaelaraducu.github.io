const cheerio = require('cheerio');
const fs = require('fs');

const $ = cheerio.load(fs.readFileSync('./dist/index.html'));


function buildJSON() {
    // pas 1 selectez  elementele dupa atribut: data-tr
    const wordsTr = [];
    $("[data-tr]").each(function () {
        const value = $(this).text()
        let key = $(this)[0].attribs['data-tr'];
        wordsTr.push({
            [key]: value
        })
    });
    $("[data-attr-tr]").each(function () {
        const value = $(this)[0].attribs['data-typed-items']
        let key = $(this)[0].attribs['data-attr-tr'];
        wordsTr.push({
            [key]: value
        })
    });
    // console.log(wordsTr);
    // Pas 2 transform in json
    const myJson = Object.assign({}, ...wordsTr)
    const json = JSON.stringify(myJson);



    // Pas 3 scriu in fiser
    fs.writeFile("./src/lang/trans.json", json, function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
}
buildJSON();