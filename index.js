const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log("hi")

const app = express();
const stripe = require('stripe')('sk_test_51HCrBpIazuHtyn2CnkySWfrMk70lU79XbuJLFg8Z1g8KC5HlvXwki8MOv5o2k4g7C0xdQmosXIZHJk1BS5LF7LFG00nTWPzboy');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// noinspection JSUnresolvedFunction
app.post('/ephemeral_keys', (req, res) => {
    // noinspection JSUnresolvedVariable
    const customerID = req.body.costomer_id;
    const apiVersion = req.body.api_version;

    stripe.ephemeralKeys.create({
        customer: customerID,
        stripe_version: apiVersion
    }).then((key) => {
        res.status(200).send(key)
    }).catch((err) => {
        console.log(err, req.body)
        res.status(500).end()
    });
});

// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1500,
//     currency: 'cad',
// });
// const clientSecret = paymentIntent.client_secret
