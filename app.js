const https = require('https');
// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

function printMessage(username, badgeCount, points, javascript) {
  const message = `${username} has ${badgeCount} total badge(s), ${points} total points and ${javascript} points currently in Javascript`;
  console.log(message);
}

function getProfile(username) {
  try {
  // Connect to the API url (https://teamtreehouse.com/username.json)
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    let body = "";
    //Read the data
    response.on('data', data => {
      body += data.toString();
    });

    response.on('end', () => {
      //Parse the data
      const profile = JSON.parse(body);
      //Print data
      printMessage(username, profile.badges.length, profile.points.total, profile.points.JavaScript);

    });
  });
  request.on('error', error => {
    console.error(`Problem with request: ${error.message}`);
  });
} catch (error) {
  console.error(error.message);
}

}

const users = process.argv.slice(2);

users.forEach(getProfile);
