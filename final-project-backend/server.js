const express = require('express');
const app = express();
const mogoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
var path = require('path')
const PORT = 4000;
dotenv.config();

mogoose.connect(process.env.DATABASE_ACCESS, () => console.log('DATABASE CONNECTED'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routesUrls);
app.listen(PORT, () => console.log(`Server is Runing On PORT ${PORT}`));