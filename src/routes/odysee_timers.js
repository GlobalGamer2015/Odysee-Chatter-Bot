const API = require('./api');
const fs = require('fs');
const minute = 60000;
const Alert = require('./alert')
const process = require('process');

module.exports = function(claimid, ChannelClaimId) {
    setInterval(function() {
        fs.readdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands`, function(err, commands) {
            if(err) {
                Alert.ShowErrorMessage(err)
            }
            commands.forEach(command => {
                try {
                    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/${command}`, 'utf8', function(err, commandInformation) {
                        if(err) {
                            Alert.ShowErrorMessage(err)
                        }
                        const commandInformationParsed = JSON.parse(commandInformation);

                        if(commandInformationParsed.type == "Timer" && commandInformationParsed.timer_running == false) {
                            if(commandInformationParsed.active == true) {
                                fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${commandInformationParsed.name}.json`, 'utf8', function(err, commandInformation2) {
                                    if(err) {
                                        Alert.ShowErrorMessage(err)
                                    }
                                    const commandInformationParsed2 = JSON.parse(commandInformation2);
                                    commandInformationParsed2.timer_running = true;
                                    const jsonString = JSON.stringify(commandInformationParsed2)
                                    fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${commandInformationParsed.name}.json`, jsonString);
                                })
                        
                                setTimeout(function() {
                                    try {
                                        API.createComment(commandInformationParsed.reply);
                                        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${commandInformationParsed.name}.json`, 'utf8', function(err, commandInformation2) {
                                            if(err) {
                                                Alert.ShowErrorMessage(err)
                                            }
                                            const commandInformationParsed2 = JSON.parse(commandInformation2);
                                            commandInformationParsed2.timer_running = false;
                                            const jsonString = JSON.stringify(commandInformationParsed2)
                                            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/Command_${commandInformationParsed.name}.json`, jsonString);
                                        })
                                    }
                                    catch(e) {
                                        Alert.ShowErrorMessage(e)
                                    }
                                }, commandInformationParsed.timer*minute)
                            }
                        }
                    })
                }
                catch(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        })
    },10000)
}