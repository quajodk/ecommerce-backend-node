const express = require('express');
const connectDB = require('./utils/db');
const route = require('./routes/router');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/v1', route);

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`😂 Server running on ${PORT}... 🚀 in ${ENV} mode`);
});
