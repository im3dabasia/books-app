const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const bookRoutes = require('./routes/bookRoutes.cjs');


require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes


app.use('/api/books', bookRoutes)

// Set the port
const port = process.env.PORT || 8004;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
