var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname);

// Variables for url and api key
const baseURL= 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey=process.env.API_KEY

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


// POST Route
app.post('/api',async function(req,res) {
    userInput=req.body.url;
    console.log(`you entered: ${userInput}`)
    const apiURL= `${baseURL}key=${apiKey}&url=${userInput}&lang=en`
    const response = await fetch(apiURL)
    const Datadelevired= await response.json()
    console.log(Datadelevired)
    res.send(Datadelevired)
})


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


