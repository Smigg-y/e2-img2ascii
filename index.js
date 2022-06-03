const express = require('express');
const { braillefy } = require('img2braille');

var app = express();

const port = process.env.PORT || 3000

app.set('json spaces', 4);
app.use(express.static(`${__dirname}/`));
app.listen(port);

app.get('/image', async function(req, res) {
    let image = req.query.url || null;
    let width = req.query.width || 30;
    let doDither = req.query.dither || false;
    let doInvert = req.query.invert || false;
    
    if(image === null) {
        res.json({
            'success': false,
            'text': 'invalid url'
        });
    } else {
        let opts = {
            dither: doDither,
            invert: doInvert
        };
        
        const result = await braillefy(image, width, opts);
        res.json({
            'success': true,
            'text': result
        })
    }
});
