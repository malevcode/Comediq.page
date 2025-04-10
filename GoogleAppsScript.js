/**
 * Google Apps Script for ComediQ Waitlist Form
 * 
 * Instructions:
 * 1. Go to script.google.com and create a new project
 * 2. Copy and paste this entire file into the script editor
 * 3. Save the project (File > Save)
 * 4. Deploy as a web app:
 *    - Click Deploy > New deployment
 *    - Select type: Web app
 *    - Set "Execute as" to "Me" (your Google account)
 *    - Set "Who has access" to "Anyone"
 *    - Click "Deploy"
 * 5. Copy the Web app URL provided after deployment
 * 6. Paste that URL into the GOOGLE_SCRIPT_URL constant in sheets-api.js
 */

/**
 * This function handles POST requests from the website form
 */
function doPost(e) {
  try {
    // Get the active spreadsheet and the first sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the form data
    sheet.appendRow([
      new Date(),                // Timestamp
      data.yearsInComedy,        // How many years have you been doing comedy?
      data.micsPerWeek,          // Mics per week
      data.weeklySpend,          // Weekly mic spend ($)
      data.nonMicSpots,          // Non-mic spots per week
      data.affiliate,            // Would you like to be an affiliate?
      data.email                 // Email
    ]);
    
    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({ result: "Success" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return an error response
    console.error("Error processing form submission: " + error);
    return ContentService.createTextOutput(
      JSON.stringify({ result: "Error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * This function is just for testing the script
 * It will create headers in the spreadsheet if they don't exist
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  
  // Check if headers exist
  var headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
  if (headers[0] !== "Timestamp") {
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "How many years have you been doing comedy?",
      "Mics per week",
      "Weekly mic spend ($)",
      "Non-mic spots per week",
      "Would you like to be an affiliate?",
      "Email"
    ]);
  }
  
  Logger.log("Sheet setup complete!");
}
