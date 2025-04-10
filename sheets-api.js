/**
 * Google Sheets API integration for form submissions
 * This file handles sending form data to a Google Sheet using the Google Apps Script Web App
 */

// Google Apps Script deployed web app URL
// Note: This is a placeholder URL. You need to deploy your Google Apps Script as a web app
// and replace this URL with the one you get after deployment.
// Instructions:
// 1. Go to script.google.com and create a new project
// 2. Paste the Google Apps Script code provided
// 3. Click Deploy > New deployment
// 4. Select type: Web app
// 5. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'
// 6. Click Deploy and copy the Web app URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';

/**
 * Submit form data to Google Sheets
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - A promise that resolves when the submission is complete
 */
export async function submitToGoogleSheets(formData) {
  try {
    // Format the data according to the Google Sheet columns
    const payload = {
      yearsInComedy: formData.experience,
      micsPerWeek: formData.metrics.openMicsPerWeek,
      weeklySpend: formData.metrics.weeklyMicSpend,
      nonMicSpots: formData.metrics.nonMicSpotsPerWeek,
      affiliate: formData.affiliate === 'yes' ? 'Yes' : 'No',
      email: formData.email
    };

    // Send the data to Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // This is important for CORS issues
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // Since we're using no-cors mode, we won't get a proper response
    // We'll assume success if no error is thrown
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}
