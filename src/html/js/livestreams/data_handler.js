function timestamp(data) {
  //if(localStorage.getItem('timestamp_option') === 'true') {
    return `<div>Timestamp: ${data.timestamp}</div>`;
  //}
  //else { return return_empty_string(); }
}

function live(data) {
  //if(localStorage.getItem('live_option') === 'true') {
    return `<div>Live: ${live_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function channelLink(data) {
  //if(localStorage.getItem('channelLink_option') === 'true') {
    return `<div>Streamer: <a href='${data.channelLink}'>${data.channel_name}</a></div>`;
  //}
  //else { return return_empty_string(); }
}

function canonicalUrl(data) {
  //if(localStorage.getItem('canonicalUrl_option') === 'true') {
    return `<div>Canonical URL: <a href='${data.canonicalUrl}'>${data.canonicalUrl}</a></div>`;
  //}
  //else { return return_empty_string(); }
}

function _name(data) {
  //if(localStorage.getItem('_name_option') === 'true') {
    return `<div>_name: ${data._name}</div>`;
  //}
  //else { return return_empty_string(); }
}

function shortUrl(data) {
  //if(localStorage.getItem('shortUrl_option') === 'true') {
    return `<div>Short URL: <a href='${data.shortUrl}'>${data.shortUrl}</a></div>`;
  //}
  //else { return return_empty_string(); }
}

function claimId(data) {
  //if(localStorage.getItem('claimId_option') === 'true') {
    return `<div>ClaimId: ${data.claimId}</div>`;
  //}
  //else { return return_empty_string(); }
}

function viewCount(data) {
  //if(localStorage.getItem('viewCount_option') === 'true') {
    return `<div>Viewers: ${viewCount_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function audio_duration(data) {
  //if(localStorage.getItem('audio_duration_option') === 'true') {
    return `<div>Audio Duration: ${data.audio_duration}</div>`;
  //}
  //else { return return_empty_string(); }
}

function author(data) {
  //if(localStorage.getItem('author_option') === 'true') {
    return `<div>Author: ${data.author}</div>`;
  //}
  //else { return return_empty_string(); }
}

function bid_state(data) {
  //if(localStorage.getItem('bid_state_option') === 'true') {
    return `<div>Bid State: ${data.bid_state}</div>`;
  //}
  //else { return return_empty_string(); }
}

function certificate(data) {
  //if(localStorage.getItem('certificate_option') === 'true') {
    return `<div>Certificate: ${data.certificate}</div>`;
  //}
  //else { return return_empty_string(); }
}

function city(data) {
  //if(localStorage.getItem('city_option') === 'true') {
    return `<div>City: ${data.city}</div>`;
  //}
  //else { return return_empty_string(); }
}

function claim_address(data) {
  //if(localStorage.getItem('claim_address_option') === 'true') {
    return `<div>Claim Address: ${data.claim_address}</div>`;
  //}
  //else { return return_empty_string(); }
}

function claim_id(data) {
  //if(localStorage.getItem('claim_id_option') === 'true') {
    return `<div>Claim ID: ${data.claim_id}</div>`;
  //}
  //else { return return_empty_string(); }
}

function claim_id_list(data) {
  //if(localStorage.getItem('claim_id_list_option') === 'true') {
    return `<div>Claim ID List: ${data.claim_id_list}</div>`;
  //}
  //else { return return_empty_string(); }
}

function claim_reference(data) {
  //if(localStorage.getItem('claim_reference_option') === 'true') {
    return `<div>Claim Reference: ${data.claim_reference}</div>`;
  //}
  //else { return return_empty_string(); }
}

function claim_type(data) {
  //if(localStorage.getItem('claim_type_option') === 'true') {
    return `<div>Claim Type: ${data.claim_type}</div>`;
  //}
  //else { return return_empty_string(); }
}

function code(data) {
  //if(localStorage.getItem('code_option') === 'true') {
    return `<div>Code: ${data.code}</div>`;
  //}
  //else { return return_empty_string(); }
}

function content_type(data) {
  //if(localStorage.getItem('content_type_option') === 'true') {
    return `<div>Content Type: ${data.content_type}</div>`;
  //}
  //else { return return_empty_string(); }
}

function country(data) {
  //if(localStorage.getItem('country_option') === 'true') {
    return `<div>Country: ${data.country}</div>`;
  //}
  //else { return return_empty_string(); }
}

function created_at(data) {
  //if(localStorage.getItem('created_at_option') === 'true') {
    return `<div>Created At: ${created_at_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function description(data) {
  //if(localStorage.getItem('description_option') === 'true') {
    return `<div>Description: ${data.description}</div>`;
  //}
  //else { return return_empty_string(); }
}

function duration(data) {
  //if(localStorage.getItem('duration_option') === 'true') {
    return `<div>Duration: ${data.duration}</div>`;
  //}
  //else { return return_empty_string(); }
}

function effective_amount(data) {
  //if(localStorage.getItem('effective_amount_option') === 'true') {
    return `<div>Effective Amount: ${data.effective_amount}</div>`;
  //}
  //else { return return_empty_string(); }
}

function email(data) {
  //if(localStorage.getItem('email_option') === 'true') {
    return `<div>E-Mail: ${data.email}</div>`;
  //}
  //else { return return_empty_string(); }
}

function fee(data) {
  //if(localStorage.getItem('fee_option') === 'true') {
    return `<div>Fee: ${data.fee}</div>`;
  //}
  //else { return return_empty_string(); }
}

function fee_address(data) {
  //if(localStorage.getItem('fee_address_option') === 'true') {
    return `<div>Fee Address: ${data.fee_address}</div>`;
  //}
  //else { return return_empty_string(); }
}

function fee_currency(data) {
  //if(localStorage.getItem('fee_currency_option') === 'true') {
    return `<div>Fee Currency: ${data.fee_currency}</div>`;
  //}
  //else { return return_empty_string(); }
}

function frame_height(data) {
  //if(localStorage.getItem('frame_height_option') === 'true') {
    return `<div>Frame Height: ${data.frame_height}</div>`;
  //}
  //else { return return_empty_string(); }
}

function frame_width(data) {
  //if(localStorage.getItem('frame_width_option') === 'true') {
    return `<div>Frame Width: ${data.frame_width}</div>`;
  //}
  //else { return return_empty_string(); }
}

function has_claim_list(data) {
  //if(localStorage.getItem('has_claim_list_option') === 'true') {
    return `<div>Has Claim List: ${data.has_claim_list}</div>`;
  //}
  //else { return return_empty_string(); }
}

function height(data) {
  //if(localStorage.getItem('height_option') === 'true') {
    return `<div>Height: ${data.height}</div>`;
  //}
  //else { return return_empty_string(); }
}

function id(data) {
  //if(localStorage.getItem('id_option') === 'true') {
    return `<div>Id: ${data.id}</div>`;
  //}
  //else { return return_empty_string(); }
}

function is_cert_processed(data) {
  //if(localStorage.getItem('is_cert_processed_option') === 'true') {
    return `<div>Is Cert Processed: ${is_cert_processed_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function is_cert_valid(data) {
  //if(localStorage.getItem('is_cert_valid_option') === 'true') {
    return `<div>Is Cert Valid: ${is_cert_valid_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function is_filtered(data) {
  //if(localStorage.getItem('is_filtered_option') === 'true') {
    return `<div>Filtered: ${is_filtered_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function is_nsfw(data) {
  //if(localStorage.getItem('is_nsfw_option') === 'true') {
    return `<div>NSFW: ${is_nsfw_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function language(data) {
  //if(localStorage.getItem('language_option') === 'true') {
    return `<div>Language: ${language_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function latitude(data) {
  //if(localStorage.getItem('latitude_option') === 'true') {
    return `<div>Latitude: ${data.latitude}</div>`;
  //}
  //else { return return_empty_string(); }
}

function license(data) {
  //if(localStorage.getItem('license_option') === 'true') {
    return `<div>License: ${data.license}</div>`;
  //}
  //else { return return_empty_string(); }
}

function license_url(data) {
  //if(localStorage.getItem('license_url_option') === 'true') {
    return `<div>License URL: ${data.license_url}</div>`;
  //}
  //else { return return_empty_string(); }
}

function list_type(data) {
  //if(localStorage.getItem('list_type_option') === 'true') {
    return `<div>List Type: ${data.list_type}</div>`;
  //}
  //else { return return_empty_string(); }
}

function longitude(data) {
  //if(localStorage.getItem('longitude_option') === 'true') {
    return `<div>Longitude: ${data.longitude}</div>`;
  //}
  //else { return return_empty_string(); }
}

function modified_at(data) {
  //if(localStorage.getItem('modified_at_option') === 'true') {
    return `<div>Modified At: ${data.modified_at}</div>`;
  //}
  //else { return return_empty_string(); }
}

function stream_name(data) {
  //if(localStorage.getItem('stream_name_option') === 'true') {
    return `<div>Stream: <a href='${data.stream_url}'>${data.stream_name}</a></div>`;
  //}
  //else { return return_empty_string(); }
}

function os(data) {
  //if(localStorage.getItem('os_option') === 'true') {
    return `<div>OS: ${data.os}</div>`;
  //}
  //else { return return_empty_string(); }
}

function preview(data) {
  //if(localStorage.getItem('preview_option') === 'true') {
    return `<div>Preview: ${data.preview}</div>`;
  //}
  //else { return return_empty_string(); }
}

function publisher_id(data) {
  //if(localStorage.getItem('publisher_id_option') === 'true') {
    return `<div>Publisher ID: ${data.publisher_id}</div>`;
  //}
  //else { return return_empty_string(); }
}

function publisher_sig(data) {
  //if(localStorage.getItem('publisher_sig_option') === 'true') {
    return `<div>Publisher Signature: ${data.publisher_sig}</div>`;
  //}
  //else { return return_empty_string(); }
}

function release_time(data) {
  //if(localStorage.getItem('release_time_option') === 'true') {
    return `<div>Release Time: ${data.release_time}</div>`;
  //}
  //else { return return_empty_string(); }
}

function sd_hash(data) {
  //if(localStorage.getItem('sd_hash_option') === 'true') {
    return `<div>SD Hash: ${data.sd_hash}</div>`;
  //}
  //else { return return_empty_string(); }
}

function source_hash(data) {
  //if(localStorage.getItem('source_hash_option') === 'true') {
    return `<div>Source Hash: ${data.source_hash}</div>`;
  //}
  //else { return return_empty_string(); }
}

function source_media_type(data) {
  //if(localStorage.getItem('source_media_type_option') === 'true') {
    return `<div>Source Media Type: ${data.source_media_type}</div>`;
  //}
  //else { return return_empty_string(); }
}

function source_name(data) {
  //if(localStorage.getItem('source_name_option') === 'true') {
    return `<div>Source Name: ${data.source_name}</div>`;
  //}
  //else { return return_empty_string(); }
}

function source_size(data) {
  //if(localStorage.getItem('source_size_option') === 'true') {
    return `<div>Source Size: ${data.source_size}</div>`;
  //}
  //else { return return_empty_string(); }
}

function source_url(data) {
  //if(localStorage.getItem('source_url_option') === 'true') {
    return `<div>Source URL: ${data.source_url}</div>`;
  //}
  //else { return return_empty_string(); }
}

function state(data) {
  //if(localStorage.getItem('state_option') === 'true') {
    return `<div>State: ${data.state}</div>`;
  //}
  //else { return return_empty_string(); }
}

function thumbnail_url(data) {
  //if(localStorage.getItem('thumbnail_url_option') === 'true') {
    return `<div>Thumbnail URL: <a href='${data.thumbnail_url}'>${data.thumbnail_url}</a></div>`;
  //}
  //else { return return_empty_string(); }
}

function title(data) {
  //if(localStorage.getItem('title_option') === 'true') {
    return `<div>Title: ${data.title}</div>`;
  //}
  //else { return return_empty_string(); }
}

function transaction_hash_id(data) {
  //if(localStorage.getItem('transaction_hash_id_option') === 'true') {
    return `<div>Transaction Hash ID: ${data.transaction_hash_id}</div>`;
  //}
  //else { return return_empty_string(); }
}

function transaction_hash_update(data) {
  //if(localStorage.getItem('transaction_hash_update_option') === 'true') {
    return `<div>Transaction Hash Update: ${data.transaction_hash_update}</div>`;
  //}
  //else { return return_empty_string(); }
}

function transaction_time(data) {
  //if(localStorage.getItem('transaction_time_option') === 'true') {
    return `<div>Transaction Time: ${transaction_time_data(data)}</div>`;
  //}
  //else { return return_empty_string(); }
}

function type(data) {
  //if(localStorage.getItem('type_option') === 'true') {
    return `<div>Type: ${data.type}</div>`;
  //}
  //else { return return_empty_string(); }
}

function valid_at_height(data) {
  //if(localStorage.getItem('valid_at_height_option') === 'true') {
    return `<div>Valid At Height: ${data.valid_at_height}</div>`;
  //}
  //else { return return_empty_string(); }
}

function version(data) {
  //if(localStorage.getItem('version_option') === 'true') {
    return `<div>Version: ${data.version}</div>`;
  //}
  //else { return return_empty_string(); }
}

function vout(data) {
  //if(localStorage.getItem('vout_option') === 'true') {
    return `<div>Vout: ${data.vout}</div>`;
  //}
  //else { return return_empty_string(); }
}

function vout_update(data) {
  //if(localStorage.getItem('vout_update_option') === 'true') {
    return `<div>Vout Update: ${data.vout_update}</div>`;
  //}
  //else { return return_empty_string(); }
}

function website_url(data) {
  //if(localStorage.getItem('website_url_option') === 'true') {
    return `<div>Website URL: ${data.website_url}</div>`;
  //}
  //else { return return_empty_string(); }
}
// Internal Functions
/*

    SPACER

*/
function return_empty_string() {
  return '';
}

function transaction_time_data(data) {
  const unix_tt = data.transaction_time;
  const milliseconds = unix_tt * 1000;
  return `${Date(milliseconds)}`;
}

function is_cert_processed_data(data) {
  if(data.is_cert_processed === 0) {
    return 'False';
  }
  if(data.is_cert_processed === 1) {
    return 'True';
  }
}

function is_cert_valid_data(data) {
  if(data.is_cert_valid === 0) {
    return 'False';
  }
  if(data.is_cert_valid === 1) {
    return 'True';
  }
}

function created_at_data(data) {
  const ca_new = new Date(data.created_at.split('Z')[0]);
  return `${ca_new}`;
}

function live_data(data) {
  if(data.live === true) {
    return 'True';
  }
  else if(data.live === false) {
    return 'False';
  }
}

function viewCount_data(data) {
  if(data.viewCount === undefined) {
    return 0;
  }
  else {
    return data.viewCount-1; // Subtract 1 viewer due to the App acting as a user
  }
}

function is_nsfw_data(data) {
  if(data.is_nsfw == 0) {
    return 'False';
  }
  else if(data.is_nsfw == 1) {
    return 'True';
  }
}

function is_filtered_data(data) {
  if(data.is_filtered == 0) {
    return 'False';
  }
  else if(data.is_filtered == 1) {
    return 'True';
  }
}

function language_data(data) {
  /*
    Uses language data from https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
  */
  if(data.language == 'bo') { return 'Boro'; }
  if(data.language == 'aa') { return 'Afar'; }
  if(data.language == 'ab') { return 'Abkhazian'; }
  if(data.language == 'af') { return 'Afrikaans'; }
  if(data.language == 'ak') { return 'Akan'; }
  if(data.language == 'als') { return 'Alemannic'; }
  if(data.language == 'am') { return 'Amharic'; }
  if(data.language == 'an') { return 'Aragonese'; }
  if(data.language == 'ang') { return 'Angal'; }
  if(data.language == 'ar') { return 'Arabic'; }
  if(data.language == 'arc') { return 'Aramaic'; }
  if(data.language == 'as') { return 'Assamese'; }
  if(data.language == 'ast') { return 'Asturian'; }
  if(data.language == 'av') { return 'Avar'; }
  if(data.language == 'awa') { return 'Awadhi'; }
  if(data.language == 'ay') { return 'Aymara'; }
  if(data.language == 'az') { return 'Azerbaijani'; }
  if(data.language == 'ba') { return 'Bashkir'; }
  if(data.language == 'bar') { return 'Bavarian'; }
  if(data.language == 'bat-smg') { return 'Samogitian'; }
  if(data.language == 'bcl') { return 'Bikol'; }
  if(data.language == 'be') { return 'Belarusian'; }
  if(data.language == 'be-x-old') { return 'Belarusian (Taraškievica)'; }
  if(data.language == 'bg') { return 'Bulgarian'; }
  if(data.language == 'bh') { return 'Bihari'; }
  if(data.language == 'bi') { return 'Bislama'; }
  if(data.language == 'bm') { return 'Bambara'; }
  if(data.language == 'bn') { return 'Bengali'; }
  if(data.language == 'bo') { return 'Tibetan'; }
  if(data.language == 'bpy') { return 'Bishnupriya Manipuri'; }
  if(data.language == 'br') { return 'Breton'; }
  if(data.language == 'bs') { return 'Bosnian'; }
  if(data.language == 'bug') { return 'Buginese'; }
  if(data.language == 'bxr') { return 'Buriat (Russia)'; }
  if(data.language == 'ca') { return 'Catalan'; }
  if(data.language == 'cdo') { return 'Min Dong Chinese'; }
  if(data.language == 'ce') { return 'Chechen'; }
  if(data.language == 'ceb') { return 'Cebuano'; }
  if(data.language == 'ch') { return 'Chamorro'; }
  if(data.language == 'cho') { return 'Choctaw'; }
  if(data.language == 'chr') { return 'Cherokee'; }
  if(data.language == 'chy') { return 'Cheyenne'; }
  if(data.language == 'ckb') { return 'Kurdish (Sorani)'; }
  if(data.language == 'co') { return 'Corsican'; }
  if(data.language == 'cr') { return 'Cree'; }
  if(data.language == 'cs') { return 'Czech'; }
  if(data.language == 'csb') { return 'Kashubian'; }
  if(data.language == 'cu') { return 'Old Church Slavonic / Old Bulgarian'; }
  if(data.language == 'cv') { return 'Chuvash'; }
  if(data.language == 'cy') { return 'Welsh'; }
  if(data.language == 'da') { return 'Danish'; }
  if(data.language == 'de') { return 'German'; }
  if(data.language == 'diq') { return 'Dimli'; }
  if(data.language == 'dsb') { return 'Lower Sorbian'; }
  if(data.language == 'dv') { return 'Divehi'; }
  if(data.language == 'dz') { return 'Dzongkha'; }
  if(data.language == 'ee') { return 'Ewe'; }
  if(data.language == 'el') { return 'Greek'; }
  if(data.language == 'en') { return 'English'; }
  if(data.language == 'eo') { return 'Esperanto'; }
  if(data.language == 'es') { return 'Spanish'; }
  if(data.language == 'et') { return 'Estonian'; }
  if(data.language == 'eu') { return 'Basque'; }
  if(data.language == 'ext') { return 'Extremaduran'; }
  if(data.language == 'fa') { return 'Persian'; }
  if(data.language == 'ff') { return 'Peul'; }
  if(data.language == 'fi') { return 'Finnish'; }
  if(data.language == 'fiu-vro') { return 'Võro'; }
  if(data.language == 'fj') { return 'Fijian'; }
  if(data.language == 'fo') { return 'Faroese'; }
  if(data.language == 'fr') { return 'French'; }
  if(data.language == 'frp') { return 'Arpitan / Franco-Provençal'; }
  if(data.language == 'fur') { return 'Friulian'; }
  if(data.language == 'fy') { return 'West Frisian'; }
  if(data.language == 'ga') { return 'Irish'; }
  if(data.language == 'gan') { return 'Gan Chinese'; }
  if(data.language == 'gbm') { return 'Garhwali'; }
  if(data.language == 'gd') { return 'Scottish Gaelic'; }
  if(data.language == 'gil') { return 'Gilbertese'; }
  if(data.language == 'gl') { return 'Galician'; }
  if(data.language == 'gn') { return 'Guarani'; }
  if(data.language == 'got') { return 'Gothic'; }
  if(data.language == 'gu') { return 'Gujarati'; }
  if(data.language == 'gv') { return 'Manx'; }
  if(data.language == 'ha') { return 'Hausa'; }
  if(data.language == 'hak') { return 'Hakka Chinese'; }
  if(data.language == 'haw') { return 'Hawaiian'; }
  if(data.language == 'he') { return 'Hebrew'; }
  if(data.language == 'hi') { return 'Hindi'; }
  if(data.language == 'ho') { return 'Hiri Motu'; }
  if(data.language == 'hr') { return 'Croatian'; }
  if(data.language == 'ht') { return 'Haitian'; }
  if(data.language == 'hu') { return 'Hungarian'; }
  if(data.language == 'hy') { return 'Armenian'; }
  if(data.language == 'hz') { return 'Herero'; }
  if(data.language == 'ia') { return 'Interlingua'; }
  if(data.language == 'id') { return 'Indonesian'; }
  if(data.language == 'ie') { return 'Interlingue'; }
  if(data.language == 'ig') { return 'Igbo'; }
  if(data.language == 'ii') { return 'Sichuan Yi'; }
  if(data.language == 'ik') { return 'Inupiak'; }
  if(data.language == 'inh') { return 'Ingush'; }
  if(data.language == 'io') { return 'Ido'; }
  if(data.language == 'is') { return 'Icelandic'; }
  if(data.language == 'it') { return 'Italian'; }
  if(data.language == 'iu') { return 'Inuktitut'; }
  if(data.language == 'ja') { return 'Japanese'; }
  if(data.language == 'jbo') { return 'Lojban'; }
  if(data.language == 'jv') { return 'Javanese'; }
  if(data.language == 'ka') { return 'Georgian'; }
  if(data.language == 'kg') { return 'Kongo'; }
  if(data.language == 'ki') { return 'Kikuyu'; }
  if(data.language == 'kj') { return 'Kuanyama'; }
  if(data.language == 'kk') { return 'Kazakh'; }
  if(data.language == 'kl') { return 'Greenlandic'; }
  if(data.language == 'km') { return 'Cambodian'; }
  if(data.language == 'kn') { return 'Kannada'; }
  if(data.language == 'khw') { return 'Khowar'; }
  if(data.language == 'ko') { return 'Korean'; }
  if(data.language == 'kr') { return 'Kanuri'; }
  if(data.language == 'ks') { return 'Kashmiri'; }
  if(data.language == 'ksh') { return 'Ripuarian'; }
  if(data.language == 'ku') { return 'Kurdish (Kurmanji)'; }
  if(data.language == 'kv') { return 'Komi'; }
  if(data.language == 'kw') { return 'Cornish'; }
  if(data.language == 'ky') { return 'Kirghiz'; }
  if(data.language == 'la') { return 'Latin'; }
  if(data.language == 'lad') { return 'Ladino / Judeo-Spanish'; }
  if(data.language == 'lan') { return 'Lango'; }
  if(data.language == 'lb') { return 'Luxembourgish'; }
  if(data.language == 'lg') { return 'Ganda'; }
  if(data.language == 'li') { return 'Limburgian'; }
  if(data.language == 'lij') { return 'Ligurian'; }
  if(data.language == 'lmo') { return 'Lombard'; }
  if(data.language == 'ln') { return 'Lingala'; }
  if(data.language == 'lo') { return 'Laotian'; }
  if(data.language == 'lzz') { return 'Laz'; }
  if(data.language == 'lt') { return 'Lithuanian'; }
  if(data.language == 'lv') { return 'Latvian'; }
  if(data.language == 'map-bms') { return 'Banyumasan'; }
  if(data.language == 'mg') { return 'Malagasy'; }
  if(data.language == 'man') { return 'Mandarin'; }
  if(data.language == 'mh') { return 'Marshallese'; }
  if(data.language == 'mi') { return 'Maori'; }
  if(data.language == 'min') { return 'Minangkabau'; }
  if(data.language == 'mk') { return 'Macedonian'; }
  if(data.language == 'ml') { return 'Malayalam'; }
  if(data.language == 'mn') { return 'Mongolian'; }
  if(data.language == 'mo') { return 'Moldovan'; }
  if(data.language == 'mr') { return 'Marathi'; }
  if(data.language == 'mrh') { return 'Mara'; }
  if(data.language == 'ms') { return 'Malay'; }
  if(data.language == 'mt') { return 'Maltese'; }
  if(data.language == 'mus') { return 'Creek / Muskogee'; }
  if(data.language == 'mwl') { return 'Mirandese'; }
  if(data.language == 'my') { return 'Burmese'; }
  if(data.language == 'na') { return 'Nauruan'; }
  if(data.language == 'nah') { return 'Nahuatl'; }
  if(data.language == 'nap') { return 'Neapolitan'; }
  if(data.language == 'nd') { return 'North Ndebele'; }
  if(data.language == 'nds') { return 'Low German / Low Saxon'; }
  if(data.language == 'nds-nl') { return 'Dutch Low Saxon'; }
  if(data.language == 'ne') { return 'Nepali'; }
  if(data.language == 'new') { return 'Newar'; }
  if(data.language == 'ng') { return 'Ndonga'; }
  if(data.language == 'nl') { return 'Dutch'; }
  if(data.language == 'nn') { return 'Norwegian Nynorsk'; }
  if(data.language == 'no') { return 'Norwegian'; }
  if(data.language == 'nr') { return 'South Ndebele'; }
  if(data.language == 'nso') { return 'Northern Sotho'; }
  if(data.language == 'nrm') { return 'Norman'; }
  if(data.language == 'nv') { return 'Navajo'; }
  if(data.language == 'ny') { return 'Chichewa'; }
  if(data.language == 'oc') { return 'Occitan'; }
  if(data.language == 'oj') { return 'Ojibwa'; }
  if(data.language == 'om') { return 'Oromo'; }
  if(data.language == 'or') { return 'Oriya'; }
  if(data.language == 'os') { return 'Ossetian / Ossetic'; }
  if(data.language == 'pa') { return 'Panjabi / Punjabi'; }
  if(data.language == 'pag') { return 'Pangasinan'; }
  if(data.language == 'pam') { return 'Kapampangan'; }
  if(data.language == 'pap') { return 'Papiamentu'; }
  if(data.language == 'pdc') { return 'Pennsylvania German'; }
  if(data.language == 'pi') { return 'Pali'; }
  if(data.language == 'pih') { return 'Norfolk'; }
  if(data.language == 'pl') { return 'Polish'; }
  if(data.language == 'pms') { return 'Piedmontese'; }
  if(data.language == 'ps') { return 'Pashto'; }
  if(data.language == 'pt') { return 'Portuguese'; }
  if(data.language == 'qu') { return 'Quechua'; }
  if(data.language == 'rm') { return 'Raeto Romance'; }
  if(data.language == 'rmy') { return 'Romani'; }
  if(data.language == 'rn') { return 'Kirundi'; }
  if(data.language == 'ro') { return 'Romanian'; }
  if(data.language == 'roa-rup') { return 'Aromanian'; }
  if(data.language == 'ru') { return 'Russian'; }
  if(data.language == 'rw') { return 'Rwandi'; }
  if(data.language == 'sa') { return 'Sanskrit'; }
  if(data.language == 'sc') { return 'Sardinian'; }
  if(data.language == 'scn') { return 'Sicilian'; }
  if(data.language == 'sco') { return 'Scots'; }
  if(data.language == 'sd') { return 'Sindhi'; }
  if(data.language == 'se') { return 'Northern Sami'; }
  if(data.language == 'sg') { return 'Sango'; }
  if(data.language == 'sh') { return 'Serbo-Croatian'; }
  if(data.language == 'si') { return 'Sinhalese'; }
  if(data.language == 'simple') { return 'Simple English'; }
  if(data.language == 'sk') { return 'Slovak'; }
  if(data.language == 'sl') { return 'Slovenian'; }
  if(data.language == 'sm') { return 'Samoan'; }
  if(data.language == 'sn') { return 'Shona'; }
  if(data.language == 'so') { return 'Somalia'; }
  if(data.language == 'sq') { return 'Albanian'; }
  if(data.language == 'sr') { return 'Serbian'; }
  if(data.language == 'ss') { return 'Swati'; }
  if(data.language == 'st') { return 'Southern Sotho'; }
  if(data.language == 'su') { return 'Sundanese'; }
  if(data.language == 'sv') { return 'Swedish'; }
  if(data.language == 'sw') { return 'Swahili'; }
  if(data.language == 'ta') { return 'Tamil'; }
  if(data.language == 'te') { return 'Telugu'; }
  if(data.language == 'tet') { return 'Tetum'; }
  if(data.language == 'tg') { return 'Tajik'; }
  if(data.language == 'th') { return 'Thai'; }
  if(data.language == 'ti') { return 'Tigrinya'; }
  if(data.language == 'tk') { return 'Turkmen'; }
  if(data.language == 'tl') { return 'Tagalog'; }
  if(data.language == 'tlh') { return 'Klingon'; }
  if(data.language == 'tn') { return 'Tswana'; }
  if(data.language == 'to') { return 'Tonga'; }
  if(data.language == 'tpi') { return 'Tok Pisin'; }
  if(data.language == 'tr') { return 'Turkish'; }
  if(data.language == 'ts') { return 'Tsonga'; }
  if(data.language == 'tt') { return 'Tatar'; }
  if(data.language == 'tum') { return 'Tumbuka'; }
  if(data.language == 'tw') { return 'Twi'; }
  if(data.language == 'ty') { return 'Tahitian'; }
  if(data.language == 'udm') { return 'Udmurt'; }
  if(data.language == 'ug') { return 'Uyghur'; }
  if(data.language == 'uk') { return 'Ukrainian'; }
  if(data.language == 'ur') { return 'Urdu'; }
  if(data.language == 'uz') { return 'Uzbek'; }
  if(data.language == 'uz_AF') { return 'Uzbeki Afghanistan'; }
  if(data.language == 've') { return 'Venda'; }
  if(data.language == 'vi') { return 'Vietnamese'; }
  if(data.language == 'vec') { return 'Venetian'; }
  if(data.language == 'vls') { return 'West Flemish'; }
  if(data.language == 'vo') { return 'Volapük'; }
  if(data.language == 'wa') { return 'Walloon'; }
  if(data.language == 'war') { return 'Waray / Samar-Leyte Visayan'; }
  if(data.language == 'wo') { return 'Wolof'; }
  if(data.language == 'xal') { return 'Kalmyk'; }
  if(data.language == 'xh') { return 'Xhosa'; }
  if(data.language == 'xmf') { return 'Megrelian'; }
  if(data.language == 'yi') { return 'Yiddish'; }
  if(data.language == 'yo') { return 'Yoruba'; }
  if(data.language == 'za') { return 'Zhuang'; }
  if(data.language == 'zh') { return 'Chinese'; }
  if(data.language == 'zh-classical') { return 'Classical Chinese'; }
  if(data.language == 'zh-min-nan') { return 'Minnan'; }
  if(data.language == 'zh-yue') { return 'Cantonese'; }
  if(data.language == 'zu') { return 'Zulu'; }
  if(data.language == 'closed-zh-tw') { return 'Traditional Chinese'; }
  if(data.language == 'nb') { return 'Norwegian Bokmål'; }
  if(data.language == 'zh-tw') { return 'Traditional Chinese'; }
  if(data.language == 'tokipona') { return 'Tokipona'; }
  if(data.language == null) { return 'Null'; }
  else { return data.language; }
}
