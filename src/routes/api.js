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

	function createComment(comment, stream_claimid, user_claimid, Api_Key) {
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

			fetch(`https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22${window.localStorage.getItem('ChannelClaimId')}%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201`, {
        method: 'get',
				headers: {
					'Content-Type': 'application/json'
				},
      })
      .then(res => res.json())
      .then(stream => {
				Lbry.channel_sign({channel_id: `${localStorage.getItem('ChannelClaimId')}`, hexdata: toHex(comment)}) // Your Bot Channel ID
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
								"channel_id":"${localStorage.getItem('ChannelClaimId')}",
								"channel_name":"${localStorage.getItem('ChannelClaimName')}",
								"claim_id":"${stream.data[0].claim_id}",
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