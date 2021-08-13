exports.default = async function(context) {
    const fs = require('fs');

    fs.mkdirSync('./dist/win-unpacked/data/chat_history'), function (err) {
        if(err) {
            return console.error(err)
        }
    }
    fs.mkdirSync('./dist/win-unpacked/data/commands'), function (err) {
        if(err) {
            return console.error(err)
        }
    }
}