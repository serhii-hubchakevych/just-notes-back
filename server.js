const express = require('express');
const port = process.env.PORT ||  3000;
const admin = require('./routes/admin/index');
const content = require('./routes/content/index');
const bodyParser = require("body-parser");
const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, My-Token");
    res.header("Access-Control-Allow-Methods", "PUT,DELETE,POST");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin', admin);
app.use('/just-notes-admin-panel', content);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
