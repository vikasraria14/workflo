// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const populateData = require('./populateData')
const requestLogger = require('./middlewares/request.logger')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(requestLogger);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
