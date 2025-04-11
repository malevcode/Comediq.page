# ComediQ - MongoDB Integration

This repository contains the code for the ComediQ landing page with MongoDB integration for the waitlist form.

## Overview

The waitlist form in the footer now submits data directly to a MongoDB Atlas database instead of Firebase Firestore. This change was made to provide a more robust and scalable solution for data collection.

## Setup Instructions

### 1. Environment Setup

1. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
2. Replace `your_mongodb_connection_string` with your actual MongoDB connection string

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

For production:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### 4. Access the Website

Open your browser and navigate to:
```
http://localhost:3000
```

## Testing

After completing the setup, test the form by:

1. Starting the server with `npm start`
2. Opening `http://localhost:3000` in a web browser
3. Filling out the waitlist form
4. Submitting the form
5. Checking the MongoDB database to verify that the data was received

You can view the data in MongoDB Atlas by:
1. Logging into your MongoDB Atlas account
2. Navigating to the Cluster > Collections
3. Selecting the `comediq` database and `waitlist` collection

## Files Modified

- `server.js`: New Express server for MongoDB integration
- `mongodb-api.js`: Client-side API for MongoDB integration
- `.env`: Environment variables for MongoDB connection
- `package.json`: Updated dependencies and scripts
- `script.js`: Updated to use MongoDB instead of Google Sheets
- `index.html`: Removed Firebase script reference
- `firebase-config.js`: Updated placeholder file
- `AGENT_Documentation_MongoDB.md`: Documentation of all changes made

## Next Steps

1. Push changes to GitHub
2. Buy a new domain name
3. Deploy the site to the new domain
4. Set up a production MongoDB database
5. Implement user authentication for admin access
6. Create an admin dashboard to view and manage submissions
7. Remove Firebase-related files and dependencies that are no longer needed (firebase.json, .firebaserc, etc.)

## Support

If you encounter any issues with the MongoDB integration, please check:

1. That the MongoDB connection string in `.env` is correct
2. That the server is running properly
3. That the API endpoint in `mongodb-api.js` is correct
4. That the form data is being formatted correctly
5. Check the server logs for any error messages
