const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

let app = express();
const port = 3000;

app.use(cors());

// Server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalAmount = newItemPrice + cartTotal;

  res.send(totalAmount.toString());
});

// Endpoint 2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let result;

  if (isMember) {
    result =
      'the discount percentage is applied ' +
      parseFloat(cartTotal - (cartTotal * 10) / 100);
  } else {
    result = ' no discount percentage is applied ' + cartTotal;
  }

  res.send(result.toString());
});

// Endpoint 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount = (cartTotal * taxRate) / 100;

  res.send(cartAmount.toString());
});

//Endpoint 4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryDays;

  if (shippingMethod == 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod == 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send('invalid Shipping method');
  }

  res.send(deliveryDays.toString());
});

//Endpoint 5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

//Endpoint 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
