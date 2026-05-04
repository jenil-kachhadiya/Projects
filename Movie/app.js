require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/DBconnection');

const cookieParser = require('cookie-parser');

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Admin routes
app.use('/api', require('./routes/index.route'))
app.use('/admin', require('./routes/admin.route'));

app.listen(process.env.PORT || 1337, () => {
  console.log('Server Running on port 1337...');
});
