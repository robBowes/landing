const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
let jsonParser = bodyParser.json();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('//', (req, res)=>{
    console.log(req.url);
    res.render('index');
})

app.post('//',(request, response)=>{
    console.log(request.body);
    response.render('circle_of_life')
})

/*
* Return requests for public files
*/
app.get('*public*', (request, response, next)=>{
    let fileName = request.url.slice(9);
    console.log('Incoming file request: public/' + fileName);
    let options ={
        root: __dirname+'/public',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };
    // let filename = request.params.name;
    response.sendFile(fileName, options, (err)=>{
        if (err) console.log(err);
        else console.log('Sent '+fileName+' file');
    });
});

app.listen('8000');
console.log('Landing app loaded on port 8000...');
