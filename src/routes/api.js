const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const logger = require('./log');

module.exports = function() {

	function connecting(data) {
		console.log(JSON.stringify(data.body))
	}

	function replacePartOfMessage(comment) {
		if(comment.includes('"')) {
			return comment.replace(/"/g, "'");
		}
		else {
			return comment;
		}
	}

	function createComment(comment) {
		try {
			const { Lbry } = require('lbry-sdk-nodejs/lib/sdk')
			function toHex(str) { // Encoding function
				let s = unescape(encodeURIComponent(str));
				let result = '';
				for (let i = 0; i < s.length; i++) {
					result += s.charCodeAt(i).toString(16).padStart(2, '0');
				}
				return result;
			}

			const fs = require('fs');
        	fs.readFile(`${process.env.LOCALAPPDATA}/Odysee Chatter Bot User Data/user.json`, 'utf8', function(err, user) {
            	if(err) {
                	swal({
                    	title: "Error",
                    	text: `Please screenshot this error and report it:\n\n${err}`,
                    	icon: "error"
                	});
            	}
            	let user_data = JSON.parse(user);

				Lbry.channel_sign({channel_id: `${user_data.channel_claim_id}`, hexdata: toHex(comment)})
				.catch((e) => {
					console.log(e)
				})
				.then(signed => {
					fetch(`https://comments.odysee.com/api/v2?m=comment.Create`, {
						method: 'post',
						headers: {
							'Content-Type': 'application/json'
						},
						body: `{
							"jsonrpc":"2.0",
							"id":1,
							"method":"comment.Create",
							"params":{
								"channel_id":"${user_data.channel_claim_id}",
								"channel_name":"${user_data.channel_claim_name}",
								"claim_id":"${user_data.stream_claim_id}",
								"comment":"${comment}",
								"signature": "${signed.signature}",
								"signing_ts": "${signed.signing_ts}"
							}
						}`
					})
				})
			})
		}
		catch(error) {
			logger.WriteError('api.js', error, `commentCreate Error: ${error}`);
		}
	}

	module.exports.createComment = createComment;
	module.exports.connecting = connecting;

	return router
}