# AGENT Documentation - MongoDB Integration

## Overview
This document details the changes made to migrate the form submission functionality from Firebase/Google Sheets to MongoDB. The waitlist form in the footer now submits data directly to a MongoDB Atlas database.

## Changes Made

### 1. Created New Files
- **server.js**: Node.js/Express server to handle API requests and connect to MongoDB
  - Provides a secure way to connect to MongoDB without exposing credentials
  - Includes API endpoint for form submissions
  - Handles validation and error responses

- **mongodb-api.js**: Client-side API for MongoDB integration
  - Contains the `submitToMongoDB()` function that sends form data to the server API
  - Handles response parsing and error handling

- **.env**: Environment variables file for storing sensitive information
  - Contains MongoDB connection string
  - Not committed to version control (added to .gitignore)

### 2. Modified Existing Files
- **package.json**: Updated dependencies and scripts
  - Changed type from "module" to "commonjs"
  - Added Express, MongoDB, and other required packages
  - Updated scripts to run the Node.js server

- **script.js**: Updated form submission handler
  - Replaced Google Sheets imports with MongoDB API import
  - Changed form submission code to use `submitToMongoDB()` function
  - Updated error messages to reference MongoDB

- **firebase-config.js**: Updated placeholder file
  - Updated comments to reference MongoDB instead of Google Sheets

### 3. MongoDB Integration Details
- **Database**: MongoDB Atlas
- **Collection**: waitlist
- **Document Structure**:
  ```json
  {
    "email": "user@example.com",
    "metrics": {
      "openMicsPerWeek": 3,
      "weeklyMicSpend": 15,
      "nonMicSpotsPerWeek": 1
    },
    "experience": "1-3",
    "affiliate": "yes",
    "timestamp": "2023-06-15T12:34:56.789Z"
  }
  ```

- **API Endpoint**: `/api/waitlist`
  - Accepts POST requests with JSON data
  - Validates required fields
  - Handles duplicate email errors
  - Returns appropriate status codes and messages

## Security Considerations
- MongoDB connection string is stored in environment variables, not in code
- .env file is excluded from version control via .gitignore
- Server-side validation prevents invalid data from being stored
- Unique index on email field prevents duplicate entries

## Running the Application
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. For development with auto-restart: `npm run dev`
4. Access the site at: http://localhost:3000

## Next Steps
1. Add user authentication for admin access to view submissions
2. Implement rate limiting to prevent abuse
3. Add more comprehensive form validation
4. Create an admin dashboard to view and manage submissions
5. Set up automated backups for the MongoDB database
