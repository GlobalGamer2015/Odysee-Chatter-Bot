const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const logger = require('./log');

module.exports = function() {

	function createComment(comment, stream_claimid, user_claimid, Api_Key) {
		try {
			const body = { 
				comment: comment,
				stream_claim_id: stream_claimid,
				user_claim_id: user_claimid,
				api_key: Api_Key
			}
	
		   	fetch(`https://www.odysee-chatter.com/api/createComment`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body)
			})
			.then(res => res.json())
			.then(resJson => {
				//console.log(resJson)
			})
		}
		catch(error) {
			logger.WriteError('api.js', error, `createComment Error: ${error}`);
		}
	}

	module.exports.createComment = createComment;

	return router
}