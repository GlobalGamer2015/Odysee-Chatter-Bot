module.exports = function(io) {

//function GetStreams() {
  const fetch = require('node-fetch');
  const WS = require('ws');
  const socket = io;

  fetch('https://api.live.odysee.com/v1/odysee/live/', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(api => api.json())
  .then(api => {
    const data = api.data;
    data.forEach(function(streams){
      const claimid = streams.claimId;
      fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + claimid + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(stream => stream.json())
      .then(stream => {
        if(stream.data.length >= 1) {
          // Channel information
          const channel = streams;
          const timestamp = channel.timestamps;
          const live = channel.live;
          const channel_name = channel.claimData.name;
          const channelLink = channel.claimData.channelLink;
          const canonicalUrl = channel.claimData.canonicalUrl;
          const _name = channel.claimData._name;
          const shortUrl = channel.claimData.shortUrl;
          const claimId = channel.claimId;
          //const viewCount = channel.viewCount;

          // Stream information
          const audio_duration = stream.data[0].audio_duration; // Returns as null
          const author = stream.data[0].author;
          const bid_state = stream.data[0].bid_state;
          const certificate = stream.data[0].certificate; // Returns as null
          const city = stream.data[0].city; // Returns as null
          const claim_address = stream.data[0].claim_address;
          const claim_id = stream.data[0].claim_id;
          const claim_id_list = stream.data[0].claim_id_list; // Returns as null
          const claim_reference = stream.data[0].claim_reference; // Returns as null
          const claim_type = stream.data[0].claim_type;
          const code = stream.data[0].code; // Returns as null
          const content_type = stream.data[0].content_type; // Returns as null
          const country = stream.data[0].country; // Returns as null
          const created_at = stream.data[0].created_at;
          const description = stream.data[0].description;
          const duration = stream.data[0].duration; // Returns as null
          const effective_amount = stream.data[0].effective_amount;
          const email = stream.data[0].email; // Returns as null
          const fee = stream.data[0].fee;
          const fee_address = stream.data[0].fee_address;
          const fee_currency = stream.data[0].fee_currency; // Returns as null
          const frame_height = stream.data[0].frame_height; // Returns as null
          const frame_width = stream.data[0].frame_width; // Returns as null
          const has_claim_list = stream.data[0].has_claim_list; // Returns as null
          const height = stream.data[0].height;
          const id = stream.data[0].id;
          const is_cert_processed = stream.data[0].is_cert_processed;
          const is_cert_valid = stream.data[0].is_cert_valid;
          const is_filtered = stream.data[0].is_filtered;
          const is_nsfw = stream.data[0].is_nsfw;
          const language = stream.data[0].language;
          const latitude = stream.data[0].latitude; // Returns as null
          const license = stream.data[0].license;
          const license_url = stream.data[0].license_url;
          const list_type = stream.data[0].list_type; // Returns as null
          const longitude = stream.data[0].longitude; // Returns as null
          const modified_at = stream.data[0].modified_at;
          const stream_name = stream.data[0].name;
          const os = stream.data[0].os; // Returns as null
          const preview = stream.data[0].preview;
          const publisher_id = stream.data[0].publisher_id;
          const publisher_sig = stream.data[0].publisher_sig;
          const release_time = stream.data[0].release_time;
          const sd_hash = stream.data[0].sd_hash; // Returns as null
          const source_hash = stream.data[0].source_hash; // Returns as null
          const source_media_type = stream.data[0].source_media_type; // Returns as null
          const source_name = stream.data[0].source_name; // Returns as null
          const source_size = stream.data[0].source_size; // Returns as null
          const source_url = stream.data[0].source_url; // Returns as null
          const state = stream.data[0].state; // Returns as null
          const thumbnail_url = stream.data[0].thumbnail_url;
          const title = stream.data[0].title;
          const transaction_hash_id = stream.data[0].transaction_hash_id;
          const transaction_hash_update = stream.data[0].transaction_hash_update;
          const transaction_time = stream.data[0].transaction_time;
          const type = stream.data[0].type;
          const valid_at_height = stream.data[0].valid_at_height;
          const version = stream.data[0].version;
          const vout = stream.data[0].vout;
          const vout_update = stream.data[0].vout_update;
          const website_url = stream.data[0].website_url; // Returns as null

          const stream_url = `${channelLink.replace('#', ':')}/${stream_name}`;

          const ws = new WS(`wss://sockety.odysee.com/ws/commentron?id=${claim_id}&category=${claim_id}`);
          ws.addEventListener('message', function (event) {
            try {
              const commentron = JSON.parse(event.data);
              if(commentron.type === "viewers") {
                const viewCount = commentron.data.connected;

                const data = {
                  // Channel information
                  timestamp: timestamp,
                  live: live,
                  channel_name: channel_name,
                  channelLink: channelLink,
                  canonicalUrl: canonicalUrl,
                  _name: _name,
                  shortUrl: shortUrl,
                  claimId: claimId,
                  viewCount: viewCount,

                  // Stream Information
                  audio_duration: audio_duration,
                  author: author,
                  bid_state: bid_state,
                  certificate: certificate,
                  city: city,
                  claim_address: claim_address,
                  claim_id: claim_id,
                  claim_id_list: claim_id_list,
                  claim_reference: claim_reference,
                  claim_type: claim_type,
                  code: code,
                  content_type: content_type,
                  country: country,
                  created_at: created_at,
                  description: description,
                  duration: duration,
                  effective_amount: effective_amount,
                  email: email,
                  fee: fee,
                  fee_address: fee_address,
                  fee_currency: fee_currency,
                  frame_height: frame_height,
                  frame_width: frame_width,
                  has_claim_list: has_claim_list,
                  height: height,
                  id: id,
                  is_cert_processed: is_cert_processed,
                  is_cert_valid: is_cert_valid,
                  is_filtered: is_filtered,
                  is_nsfw: is_nsfw,
                  language: language,
                  latitude: latitude,
                  license: license,
                  license_url: license_url,
                  list_type: list_type,
                  longitude: longitude,
                  modified_at: modified_at,
                  stream_name: stream_name,//.substring(0,63), // Limit amount of characters,
                  os: os,
                  preview: preview,
                  publisher_id: publisher_id,
                  publisher_sig: publisher_sig,
                  release_time: release_time,
                  sd_hash: sd_hash,
                  source_hash: source_hash,
                  source_media_type: source_media_type,
                  source_name: source_name,
                  source_size: source_size,
                  source_url: source_url,
                  state: state,
                  thumbnail_url: thumbnail_url,
                  title: title,//.substring(0,63), // Limit amount of characters
                  transaction_hash_id: transaction_hash_id,
                  transaction_hash_update: transaction_hash_update,
                  transaction_time: transaction_time,
                  type: type,
                  valid_at_height: valid_at_height,
                  version: version,
                  vout: vout,
                  vout_update: vout_update,
                  website_url: website_url,

                  // Custom
                  stream_url: stream_url
                };
                socket.emit('livestream', data);
              }
            }
            catch(err) {
              console.log(err)
            }
          });
        }
      })
    })
  })

  return module
}