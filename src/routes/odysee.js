const WS = require('ws');
const got = require('got');
const fetch = require('node-fetch');
const logger = require('./log');
const fs = require('fs');
const Alert = require('./alert')
const API = require('./api');
const process = require('process');

module.exports = function(EmailAddress, io) {
	const body = { 
		email_address: EmailAddress
	}
   	fetch(`https://www.odysee-chatter.com/api/getCredentials`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.then(res => {
		if(res.status == "Failed"){
			console.log(res.reason);
		}
		else if(res.status == "SUCCESS"){
			if(res.claim_id == "") {
				
				setTimeout(function () {
					io.emit('user', {
						error: 'Claim ID not found.'
					});
				}, 5000)
			}
			else {
				global.Api_Key = res.api_key;
				global.Claim_Id = res.claim_id;
				getStreamClaimId(Claim_Id)
			}
		}
	})

	function getStreamClaimId(Claim_Id) {
		var url = "https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + Claim_Id + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201";
		var currentClaimid = (async () => {
			try {
				const response = await got(url, { json: true, timeout: 5000, retry: 2, allowGetBody: true, responseType: 'json' });
				if (response.body.data.length === 0) {
					global.Stream_Claim_Id = claim_id.value;
					reconnect(Stream_Claim_Id);
				} else {
					global.Stream_Claim_Id = response.body.data[0].claim_id;
					reconnect(Stream_Claim_Id);
				}
			} catch (error) {
				logger.WriteError('odysee.js', 'Cannot get Stream Claim Id', `${error}`);
				if(Stream_Claim_Id == undefined) {
					Alert.ShowErrorMessage("Could not get Stream Claim Id. Either you have no internet or Odysee is down.")
				}
				else {
					reconnect(Stream_Claim_Id);
				}
			}
		})();
	}

	function reconnect(claimid) {
		logger.WriteLog(`Connecting using ${claimid}.`, `Connecting using ${claimid}.`)
		socket = new WS(`wss://comments.lbry.com/api/v2/live-chat/subscribe?subscription_id=${claimid}`);
		// Connection opened
		// Alojz helped with websockets code
		socket.addEventListener('open', function (event) {
			logger.WriteLog('Connected to Odysee WebSocket server.', 'Connected to Odysee WebSocket server.')
			//Alert.ShowMessage('Connected!', 'You are connected to Odysee Stream Chat.') - Disabling temporarily.
			const timers = require('./odysee_timers.js')(claimid, Claim_Id, Api_Key);
		});
		// Listen for messages
		socket.addEventListener('message', function (event) {
			var comment=JSON.parse(event.data);

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

			commands = require('./odysee_commands.js')(comment, claimid, Claim_Id, Api_Key);
			chat_history = require('./odysee_chat_history.js')(event)
			

            var ts = require('user-timezone');
            var timeFormat = 'h:mm:ss A';
			var time = ts.datetime(timestamp, timeFormat);

			fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/settings.json`, 'utf8', function(err,data) {
				if(err) {
					Alert.ShowErrorMessage(err)
				}
				settingsObject = JSON.parse(data);

				if(is_fiat == false && support_amount >= Number(settingsObject["support-amount"])) {
					if(settingsObject["tip-app-notification"] == "enabled") {
						logger.WriteLog(`Tip detected: ${channel_name} tipped ${support_amount} LBC!`, `Tip detected: ${channel_name} tipped ${support_amount} LBC!`)
					
						if(is_creator == true) {
							io.emit('addComment', {
								time: time,
								user: 'streamer',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'LBC',
								tip: support_amount,
								message: msg
							})
						}
						else if(is_moderator == true) {
							io.emit('addComment', {
								time: time,
								user: 'moderator',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'LBC',
								tip: support_amount,
								message: msg
							})
						}
						else {
							io.emit('addComment', {
								time: time,
								user: 'user',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'LBC',
								tip: support_amount,
								message: msg
							})
						}
					}
					if(settingsObject["tip-chat-notification"] == "enabled") {
						API.createComment(`Tip detected: ${channel_name} tipped ${support_amount} LBC!`, claimid, Claim_Id, Api_Key);
					}
				}

				else if(is_fiat == true && support_amount >= settingsObject["currency-amount"]) {
					if(settingsObject["tip-app-notification"] == "enabled") {
						logger.WriteLog(`Tip detected: ${channel_name} tipped $${support_amount} USD!`, `Tip detected: ${channel_name} tipped $${support_amount} USD!`)

						if(is_creator == true) {
							io.emit('addComment', {
								time: time,
								user: 'streamer',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'USD',
								tip: support_amount,
								message: msg
							})
						}
						else if(is_moderator == true) {
							io.emit('addComment', {
								time: time,
								user: 'moderator',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'USD',
								tip: support_amount,
								message: msg
							})
						}
						else {
							io.emit('addComment', {
								time: time,
								user: 'user',
								username: channel_name,
								channel: channel_url,
								alert: 'tip',
								tip_currency: 'USD',
								tip: support_amount,
								message: msg
							})
						}
					}
					if(settingsObject["tip-chat-notification"] == "enabled") {
						API.createComment(`Tip detected: ${channel_name} tipped $${support_amount} USD!`, claimid, Claim_Id, Api_Key);
					}
				}

				else if(is_creator == true) {
					logger.WriteLog(`Odysee Chat: Streamer ${channel_name}: ${msg}`, `Odysee Chat: Streamer ${channel_name}: ${msg}`)
					io.emit('addComment', {
						time: time,
						user: 'streamer',
						username: channel_name,
						channel: channel_url,
						message: msg
					});
				}
				else if(is_moderator == true) {
					logger.WriteLog(`Odysee Chat: Moderator ${channel_name}: ${msg}`, `Odysee Chat: Moderator ${channel_name}: ${msg}`)
					io.emit('addComment', {
						time: time,
						user: 'moderator',
						username: channel_name,
						channel: channel_url,
						message: msg
					});
				}
				else {
					logger.WriteLog(`Odysee Chat: ${channel_name}: ${msg}`, `Odysee Chat: ${channel_name}: ${msg}`)
					io.emit('addComment', {
						time: time,
						user: 'user',
						username: channel_name,
						channel: channel_url,
						message: msg
					});
				}
			})
		});

		socket.addEventListener('close', function (event) {
			logger.WriteLog('Lost connection. Will attempt to reconnect shortly...', 'Lost connection. Will attempt to reconnect shortly...');
			setTimeout(function() {
					getStreamClaimId(Claim_Id);
			}, 5000);
		});

		socket.addEventListener('error', function (event) {
			logger.WriteError('odysee.js', 'Cannot connect to Odysee', `Error: Cannot connect to Odysee.`);
      		socket.close();
		});
	}

    return module
}