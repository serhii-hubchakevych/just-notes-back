const express = require('express');
const port = process.env.PORT ||  3000;
const admin = require('./routes/admin/index');
const content = require('./routes/content/index');
const bodyParser = require("body-parser");
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   
    // Pass to next layer of middleware
    next();
});
app.use('/admin', admin);
app.use('/just-notes-admin-panel', content);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

