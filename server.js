console.log('Starting server...');
try {
  require('dotenv').config();
  console.log('Loaded dotenv');
} catch (error) {
  console.error('Error loading dotenv:', error);
}
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection URI
// Using environment variables for security
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let waitlistCollection;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db('comediq');
    waitlistCollection = database.collection('waitlist');

    // Create indexes if needed
    await waitlistCollection.createIndex({ email: 1 }, { unique: true });

    console.log('MongoDB setup complete');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// API endpoint to handle form submissions
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, metrics, experience, affiliate } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Create document to insert
    const document = {
      email,
      metrics: {
        openMicsPerWeek: metrics.openMicsPerWeek || 0,
        weeklyMicSpend: metrics.weeklyMicSpend || 0,
        nonMicSpotsPerWeek: metrics.nonMicSpotsPerWeek || 0
      },
      experience: experience || '',
      affiliate: affiliate || 'no',
      timestamp: new Date()
    };

    // Insert into MongoDB
    const result = await waitlistCollection.insertOne(document);

    if (result.acknowledged) {
      res.status(201).json({ success: true, message: 'Successfully joined waitlist' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to join waitlist' });
    }
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on the waitlist'
      });
    }

    console.error('Error saving to waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
});

// Start server
connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(console.error);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});
