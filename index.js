const express = require('express');
const { braillefy } = require('img2braille');

var app = express();

const port = process.env.PORT || 3000

const asciiOpts = { 
    dither: false,
    invert: false,
};

app.set('json spaces', 4);
app.use(express.static(`${__dirname}/`));
app.listen(port);

app.get('/image', async function(req, res) {
    let image = req.query.url || null;

    if(image === null) {
        res.json({
            'success': false,
            'text': 'invalid url'
        });
    } else {
        const result = await braillefy(image, 30, asciiOpts);
        res.json({
            'success': true,
            'text': result
        })
    }
});
