import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

const quotes = [
    "I think, therefore I am. - René Descartes", 
    "The only thing we have to fear is fear itself. - Franklin D. Roosevelt", 
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Life is trying things to see if they work. - Ray Bradbury",
    "I never look back, darling. It distracts from the now. - Edna Mode, The Incredibles"
    ];

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

function getQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)];
}

server.get("/", getRoot);

server.get("/tmp/poem", (req, res) => {
    res.send('I eat my peas with honey <br> I\'ve done it all my life <br> It makes the peas taste funny <br> But it keeps them on the knife!');
})

server.get("/tmp/quote", (req, res) => {
    res.send(getQuote());
})

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
