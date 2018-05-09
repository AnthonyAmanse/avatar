const express = require('express');
const minifig = require('minifig');
const svg2png = require('svg2png');
const totro = require('totro')
const app = express();

const theme = { background:"#E5F5FB", colors:["#5ebd3e", "#ffb900", "#f78200", "#e23838", "#973999", "#009cdf"]}

app.get('/new', function(req, res) {

  minifig.makeSVG(function(svg) {
    let fullname = totro.RandomName(2,5) + " " + totro.RandomName(6,8);
    let pngBuffer = svg2png.sync(new Buffer(svg),{width:300,height:300});
    res.send({name: fullname, image:pngBuffer.toString('base64')})
  }, theme);
});

app.get('/test', function(req, res) {

  minifig.makeSVG(function(svg) {
    var pngBuffer = svg2png.sync(new Buffer(svg),{width:300,height:300});

    res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': pngBuffer.length
    });
    res.end(pngBuffer);
  }, theme);
});

let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
