// Sample from https://developers.google.com/sheets/api/quickstart/nodejs

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
export const cellAssigns = function (cb: any) {
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
    }, (auth: any) => {
      listPlates(auth, cb)
    }
  );
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
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
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client: any, callback: any) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code: any) => {
    rl.close();
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

function listPlates(auth: any, cb: any) {
  const sheets = google.sheets({version: 'v4', auth});

  let lastCell = '';

  sheets.spreadsheets.values.get({
    spreadsheetId: '1zNG4LXOamD0EXMiWphuMlXzcaCJSP0enRBBcFTCYeeI',
    range: 'Septiembre 2018!A3:D27',
  }, (err: any, res: any) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      let deDuplicator = {};
      let finalData: any[] = [];
      rows.forEach((row: any) => {
        if(!row[3] && deDuplicator.hasOwnProperty(lastCell)){
          deDuplicator[lastCell].plate = `${deDuplicator[lastCell].plate}, ${row[1]}`
        } else if (row[3]){
          lastCell = row[3];
          deDuplicator[row[3]] = {name: row[0], plate: row[1], slot: row[3]};
          finalData.push(deDuplicator[row[3]])
        }
        return ;
      });
      cb(finalData)
    } else {
      cb([]);
    }
  });
}

