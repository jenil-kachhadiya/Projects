require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const connectDB = require('./config/DBconnection.js');
const PORT = 1337;

const routes = require('./routes/index.route.js')

connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes)


app.listen(PORT, () => {
  console.log(`Server is running on http:/localhost/${PORT}`);
});