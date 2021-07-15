const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

var path = require('path');
const PORT = 4000;
dotenv.config();


mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('DATABASE CONNECTED'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));




app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routesUrls);
app.listen(PORT, () => console.log(`Server is Runing On PORT ${PORT}`));