const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('//', (req, res)=>{
    console.log(req.url);
    res.render('index');
})


app.get('//bootstrap.css', (request, response)=>{
    console.log('css loads');
    let options ={
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };
    // let filename = request.params.name;
    response.sendFile('/views/css/bootstrap.css', options, (err)=>{
        if (err) console.log(err);
        else console.log('Sent bootstrap.css file');
    });
});
/*
* Return requests for client side code
*/
app.get('//code.js', (request, response, next)=>{
    let options ={
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };
    // let filename = request.params.name;
    response.sendFile('code.js', options, (err)=>{
        if (err) console.log(err);
        else console.log('Sent code.js file');
    });
});

app.listen('8000');
console.log('Landing app loaded on port 8000...');
