const fs = require('fs');
const Alert = require('./alert')
const process = require('process');

module.exports = function(event) {
    var data = JSON.parse(event.data)

    var comment = data.data.comment.comment;
    var comment_id = data.data.comment.comment_id;
    var claim_id = data.data.comment.claim_id;
    var timestamp = data.data.comment.timestamp;
    var signature = data.data.comment.signature;
    var signing_ts = data.data.comment.signing_ts;
    var channel_id = data.data.comment.channel_id;
    var channel_name = data.data.comment.channel_name;
    var channel_url = data.data.comment.channel_url;
    var currency = data.data.comment.currency;
    var support_amount = data.data.comment.support_amount;
    var is_creator = data.data.comment.is_creator;
    var is_moderator = data.data.comment.is_moderator;
    var is_hidden = data.data.comment.is_hidden;
    var is_pinned = data.data.comment.is_pinned;
    var is_fiat = data.data.comment.is_fiat;

    if(channel_name == "@Odysee-Chatter-Bot") {

    }
    else {
        fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, 'utf8', function(err,data) {
            if(err) {
                Alert.ShowErrorMessage(err)
            }
            chatObject = JSON.parse(data);
        
            if(is_creator == true) {
                chatObject.messages.push(
                    {
                        "comment": `${comment}`,
                        "comment_id": `${comment_id}`,
                        "claim_id": `${claim_id}`,
                        "timestamp": `${timestamp}`,
                        "signature": `${signature}`,
                        "signature_ts": `${signing_ts}`,
                        "channel_id": `${channel_id}`,
                        "channel_name": `${channel_name}`,
                        "channel_url": `${channel_url}`,
                        "currency": `${currency}`,
                        "support_amount": support_amount,
                        "is_creator": is_creator,
                        "is_hidden": is_hidden,
                        "is_pinned": is_pinned,
                        "is_fiat": is_fiat
                    }
                );

                json = JSON.stringify(chatObject, null, 4)

                fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, json, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                })
            }
            else if(is_moderator == true) {
                chatObject.messages.push(
                    {
                        "comment": `${comment}`,
                        "comment_id": `${comment_id}`,
                        "claim_id": `${claim_id}`,
                        "timestamp": `${timestamp}`,
                        "signature": `${signature}`,
                        "signature_ts": `${signing_ts}`,
                        "channel_id": `${channel_id}`,
                        "channel_name": `${channel_name}`,
                        "channel_url": `${channel_url}`,
                        "currency": `${currency}`,
                        "support_amount": support_amount,
                        "is_moderator": is_moderator,
                        "is_hidden": is_hidden,
                        "is_pinned": is_pinned,
                        "is_fiat": is_fiat
                    }
                );

                json = JSON.stringify(chatObject, null, 4)

                fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, json, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                })
            }
            else {
                chatObject.messages.push(
                    {
                        "comment": `${comment}`,
                        "comment_id": `${comment_id}`,
                        "claim_id": `${claim_id}`,
                        "timestamp": `${timestamp}`,
                        "signature": `${signature}`,
                        "signature_ts": `${signing_ts}`,
                        "channel_id": `${channel_id}`,
                        "channel_name": `${channel_name}`,
                        "channel_url": `${channel_url}`,
                        "currency": `${currency}`,
                        "support_amount": support_amount,
                        "is_hidden": is_hidden,
                        "is_pinned": is_pinned,
                        "is_fiat": is_fiat
                    }
                );

                json = JSON.stringify(chatObject, null, 4)

                fs.writeFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/chat_history/chat.json`, json, function(err) {
                    if(err) {
                        Alert.ShowErrorMessage(err)
                    }
                })
            }
        })
    }
}