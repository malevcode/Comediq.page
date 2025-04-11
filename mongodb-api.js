/**
 * MongoDB API client for form submissions
 * This file handles sending form data to the MongoDB API
 */

// API endpoint URL
const API_URL = '/api/waitlist';

/**
 * Submit form data to MongoDB
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - A promise that resolves when the submission is complete
 */
export async function submitToMongoDB(formData) {
  try {
    // Send the data to the API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    // Parse the response
    const result = await response.json();
    
    // Check if the submission was successful
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit form');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting to MongoDB:', error);
    throw error;
  }
}
