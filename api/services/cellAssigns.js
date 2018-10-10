// Sample from https://developers.google.com/sheets/api/quickstart/nodejs

const {google} = require('googleapis');

// Load client secrets from a local file.
module.exports = () => {
  return new Promise((resolve, reject) => {
    authorize({
      "installed": {
        "client_id": "751545510732-p2ndth02m7v6d1i86ebku306d6t4bm5h.apps.googleusercontent.com",
        "project_id": "my-project-1535998697382",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://www.googleapis.com/oauth2/v3/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "LLjFTS0f6fbMf-N6lWr2hjPE",
        "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
      }
    }, (auth) => {
      listPlates(auth, (err, data = []) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  });
};


function formatPlate (plate) {
  return plate.replace(/\s+|\-/g, '').toUpperCase();
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize (credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials({
    "access_token": "ya29.GlsNBn6pGV64aGMyn7NmLj4_lndBQMz7nxIhEnKIZtznR_2DB0W6VgdSX4a6ZFEP6d-4A1bU563Q6jOtfIp14poMirXF7v_Nhyqv4Kyi7ziObNTWA0oSVOraKfJo",
    "refresh_token": "1/Mtr2gX4_LNHsjJHhXp74_KVR3inte_fyGu1Q-OePuZIoIc4Ip_MwmjRR4X3vPBoh",
    "scope": "https://www.googleapis.com/auth/spreadsheets.readonly",
    "token_type": "Bearer",
    "expiry_date": 1536002552043
  });
  callback(oAuth2Client);
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

async function listPlates (auth, cb) {
  const sheets = google.sheets({version: 'v4', auth});

  let lastCell = '';

  const spreadsheet = await Config.findOne({key:'Spreed Sheet Assignment'});

  if(!spreadsheet) {
    return cb ('No "Spreed Sheet Assignment" config set.')
  }

  sheets.spreadsheets.values.get(spreadsheet.value, (err, res) => {
    if (err) return cb('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      const deDuplicator = {};
      const finalData = [];
      rows.forEach((row) => {
        if (!row[3] && deDuplicator.hasOwnProperty(lastCell)) {
          const cellAssign = deDuplicator[lastCell];
          cellAssign.plates.push(formatPlate(row[1]));
          cellAssign.models.push(row[2]);
        } else if (row[3]) {
          lastCell = row[3];
          deDuplicator[row[3]] = {
            plates: [formatPlate(row[1])],
            models: [row[2]],
            name: row[0].trim(),
            slot: row[3].trim()
          };
          finalData.push(deDuplicator[row[3]])
        }
      });
      return cb(null, finalData);
    } else {
      return cb(null, []);
    }
  });
}
