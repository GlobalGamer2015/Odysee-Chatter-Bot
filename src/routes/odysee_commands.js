const API = require('./api');
const fs = require('fs');
const Alert = require('./alert');
const process = require('process');

module.exports = function(comment, claimid, Claim_Id, Api_Key) {
    var msg = comment.data.comment.comment;
	var msg_id = comment.data.comment.comment_id;
	var claim_id = comment.data.comment.claim_id;
	var timestamp = comment.data.comment.timestamp;
	var signature = comment.data.comment.signature;
	var signing_ts = comment.data.comment.signing_ts;
	var channel_id = comment.data.comment.channel_id;
	var channel_name = comment.data.comment.channel_name;
	var channel_url = comment.data.comment.channel_url;
	var is_hidden = comment.data.comment.is_hidden;
	var is_pinned = comment.data.comment.is_pinned;
	var is_creator = comment.data.comment.is_creator;
	var is_moderator = comment.data.comment.is_moderator;
	var support_amount = comment.data.comment.support_amount;
    var currency = comment.data.comment.currency;
    var is_fiat = comment.data.comment.is_fiat;

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

                    if(commandInformationParsed.type == "Command") {
                        if(msg == commandInformationParsed.name && commandInformationParsed.active == true) {
                            API.createComment(commandInformationParsed.reply, claimid, Claim_Id, Api_Key);
                        }
                    }
                })
            }
            catch(e) {
                Alert.ShowErrorMessage(e)
            }
        })
    })
    fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/embedded_commands.json`, 'utf8', function(err, data) {
        if(err) {
            Alert.ShowErrorMessage(err)
        }
        embedded_commands = JSON.parse(data)
        var commands = embedded_commands.commands;
        commands.forEach(function(command) {
            try {
                if(command.name == "shoutout") {
                    if(command.enabled == true) {
                        if(is_creator == true || is_moderator == true) {
                            if(msg.startsWith("!so ")) {
                                var shoutout_user = msg.split("!so ")
                                var user = shoutout_user[1];
                            
                                command_reply = command.reply.replace("<user>", user);
                                API.createComment(command_reply, claimid, Claim_Id, Api_Key);
                            }
                        }
                    }
                }
            }
            catch(e) {
                Alert.ShowErrorMessage(e)
            }
        })
    })
}