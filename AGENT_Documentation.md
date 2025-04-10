# AGENT Documentation - Firebase to Google Sheets Migration

## Overview
This document details the changes made to migrate the form submission functionality from Firebase to Google Sheets. The waitlist form in the footer now submits data directly to a Google Sheet instead of Firebase Firestore.

## Changes Made

### 1. Created New Files
- **sheets-api.js**: New file to handle Google Sheets API integration
  - Contains the `submitToGoogleSheets()` function that sends form data to Google Apps Script
  - Uses the Google Apps Script Web App URL to post data

### 2. Modified Existing Files
- **script.js**: Updated form submission handler
  - Removed Firebase imports and replaced with Google Sheets API import
  - Changed form submission code to use `submitToGoogleSheets()` instead of Firebase's `addDoc()`
  - Updated error messages to reference Google Sheets instead of Firebase

- **index.html**: Removed Firebase script reference
  - Removed the `firebase-config.js` script import
  - Kept only the `script.js` import

- **firebase-config.js**: Created placeholder file
  - Added empty exports to prevent import errors in any files that still reference this file
  - Added deprecation notice in comments

### 3. Firebase Disconnection
- Removed all active Firebase connections from the site
- Form submissions now go directly to Google Sheets
- The site no longer depends on Firebase for data storage

## Google Sheets Integration Details
- **Google Sheet URL**: https://docs.google.com/spreadsheets/d/1E56MDenekuQPTkXpXgrMRcGuKhh4SX1bM7WJ4oUZ4D4/
- **Sheet Columns**:
  - Timestamp (auto-generated by Google Apps Script)
  - How many years have you been doing comedy? (experience field)
  - Mics per week (openMicsPerWeek field)
  - Weekly mic spend ($) (weeklyMicSpend field)
  - Non-mic spots per week (nonMicSpotsPerWeek field)
  - Would you like to be an affiliate? (affiliate field)
  - Email (email field)

- **Google Apps Script**: The script is deployed as a web app and handles the form submissions
  - Script receives JSON data via POST request
  - Parses the data and appends it as a new row to the sheet
  - Returns a success response

## Next Steps
1. Test the form submission to ensure data is correctly sent to Google Sheets
2. Consider adding form validation and CAPTCHA to prevent spam
3. Update any documentation that references Firebase
4. Remove Firebase-related files and dependencies that are no longer needed (firebase.json, .firebaserc, etc.)
5. Push changes to GitHub and deploy to the new domain
