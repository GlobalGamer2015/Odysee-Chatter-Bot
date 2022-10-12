const fs = require('fs');
const process = require('process');

module.exports = function() {
    if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data`)) {
        fs.mkdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data`, function(err) {
            if(err) {
                Alert.ShowErrorMessage(err)
            }
            else {
                if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`)) {
                    fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`,'{}', function(err) {
                        if(err) {
                            Alert.ShowErrorMessage(err)
                        }
                    })
                }
                fs.mkdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/`, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                    else {
                        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`)) {
                            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`,'{"messages": []}', function(err) {
                                if(err) {
                                    Alert.ShowErrorMessage(err)
                                }
                            })
                        }
                    }
                })
                fs.mkdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/`, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                    else {
                        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`)) {
                            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`,'', function(err) {
                                if(err) {
                                    Alert.ShowErrorMessage(err)
                                }
                            })
                        }
                    }
                })
                fs.mkdir(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/commands/`, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                })
                if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`)) {
                    fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`,'{ "support-amount": "1", "currency-amount": "1", "tip-app-notification": "disabled", "tip-chat-notification": "disabled", "language": "english", "error-report": "disabled" }', function(err) {
                        if(err) {
                            Alert.ShowErrorMessage(err)
                        }
                    })
                }
                if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`)) {
                    fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`,'{"commands": [{ "name": "shoutout", "reply": "Go check out <user> !", "enabled": false }]}', function(err) {
                        if(err) {
                            Alert.ShowErrorMessage(err)
                        }
                    })
                }
            }
        })
    }
    else {
        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`)) {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`,'{}', function(err) {
                if(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        }
        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`)) {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`,'{"messages": []}', function(err) {
                if(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        }
        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`)) {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/log/log.txt`,'', function(err) {
                if(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        }
        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`)) {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`,'{ "support-amount": "1", "currency-amount": "1", "tip-app-notification": "disabled", "tip-chat-notification": "disabled", "language": "english", "error-report": "disabled" }', function(err) {
                if(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        }
        if(!fs.existsSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`)) {
            fs.writeFileSync(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`,'{"commands": [{ "name": "shoutout", "reply": "Go check out <user> !", "enabled": false }]}', function(err) {
                if(err) {
                    Alert.ShowErrorMessage(err)
                }
            })
        }
    }
}