const express = require('express');
const http = require('http');
const path = require('path');

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('//', (req, res)=>{
    res.render('index');
})
app.listen('8000');
