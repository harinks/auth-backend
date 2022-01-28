const express = require('express');
const app = express();

//routes
app.get('/', function(req, res){
    res.send('hello jwt');
})

//port
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`server is running on port ${port}`));