const http = require('http');
const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf8');
const htmlTemplate = fs.readFileSync(`${__dirname}/page.html`, {encoding: 'utf8'});
const cardTemplate = fs.readFileSync(`${__dirname}/card.html`, 'utf8');

const products = JSON.parse(data).products;

const allCards = products.map((elem)=>{
    let newCard = cardTemplate;
    newCard = newCard.replace('__TITLE__', elem.title);
    newCard = newCard.replace('__INFO__', elem.description);
    return newCard;
});

const allCardsString = allCards.join(' ');
const page = htmlTemplate.replace('__PRODUCTS__CARDS__',allCardsString);

const server = http.createServer((req, res)=>{
    console.log(req.url);
    res.writeHead(200, {'content-type': 'text/html',})
    res.end(page);
});

server.listen(1400, ()=>{
    console.log('...............Server Started!.....................')
})
