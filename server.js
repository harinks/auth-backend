require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//require apis
const authAPI = require('./apis/authApi')
const emailAPI = require('./apis/emailApi')
//connect to database
const dbConnect = require('./config/dbConnect');
dbConnect();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//db model
const User = require('./models/User');

//routes
app.get('/', function(req, res){
    res.send('hello jwt');
})

//apis
app.use('/api/auth', authAPI)
app.use('/api/email', emailAPI)


//port
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on port ${port}`));