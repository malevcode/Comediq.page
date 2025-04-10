# ComediQ - Google Sheets Integration

This repository contains the code for the ComediQ landing page with Google Sheets integration for the waitlist form.

## Overview

The waitlist form in the footer now submits data directly to a Google Sheet instead of Firebase Firestore. This change was made to simplify the data collection process and make it easier to manage form submissions.

## Setup Instructions

### 1. Google Sheet Setup

1. Open the Google Sheet at https://docs.google.com/spreadsheets/d/1E56MDenekuQPTkXpXgrMRcGuKhh4SX1bM7WJ4oUZ4D4/
2. Make sure the sheet has the following columns:
   - Timestamp
   - How many years have you been doing comedy?
   - Mics per week
   - Weekly mic spend ($)
   - Non-mic spots per week
   - Would you like to be an affiliate?
   - Email

### 2. Google Apps Script Setup

1. Go to [script.google.com](https://script.google.com) and create a new project
2. Copy the contents of `GoogleAppsScript.js` into the script editor
3. Save the project (File > Save)
4. Deploy as a web app:
   - Click Deploy > New deployment
   - Select type: Web app
   - Set "Execute as" to "Me" (your Google account)
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
5. Copy the Web app URL provided after deployment

### 3. Update the Website Code

1. Open `sheets-api.js`
2. Replace the placeholder URL with your Google Apps Script web app URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';
   ```
3. Save the file

## Testing

After completing the setup, test the form by:

1. Opening `index.html` in a web browser
2. Filling out the waitlist form
3. Submitting the form
4. Checking the Google Sheet to verify that the data was received

## Files Modified

- `script.js`: Updated to use Google Sheets instead of Firebase
- `index.html`: Removed Firebase script reference
- `firebase-config.js`: Created placeholder file to prevent import errors
- `sheets-api.js`: New file for Google Sheets integration
- `GoogleAppsScript.js`: Google Apps Script code for the web app
- `AGENT_Documentation.md`: Documentation of all changes made

## Next Steps

1. Push changes to GitHub
2. Buy a new domain name
3. Deploy the site to the new domain
4. Remove Firebase-related files and dependencies that are no longer needed (firebase.json, .firebaserc, etc.)

## Support

If you encounter any issues with the Google Sheets integration, please check:

1. That the Google Apps Script is deployed correctly
2. That the web app URL in `sheets-api.js` is correct
3. That the Google Sheet has the correct column structure
4. That the form data is being formatted correctly in `sheets-api.js`
