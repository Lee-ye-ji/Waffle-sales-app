const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json())

const port = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// use middleware to serve static images
app.use(express.static('public'))

const ProductDataRaw = fs.readFileSync('./server/waffle.json', 'utf-8'); 
const productData = JSON.parse(ProductDataRaw);

app.get('/products', (req, res) => {
  res.json(productData.waffle)
})

const optionDataRaw = fs.readFileSync('./server/option.json', 'utf-8'); 
const optionData = JSON.parse(optionDataRaw);

app.get('/cream', (req, res) => {
  res.json(optionData.cream)
})
app.get('/topping', (req, res) => {
  res.json(optionData.topping)
})

let orderHistory = [];

app.post('/order', (req, res) => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  let order = {
    orderNumber,
    products: req.body.products,
    cream: req.body.cream,
    topping: req.body.topping,
    totals:  req.body.totals
  };
  orderHistory.push(order);
  res.status(201).json( orderHistory )
})

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`))
}

module.exports = app;