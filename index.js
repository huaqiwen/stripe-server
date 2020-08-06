const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51HCrBpIazuHtyn2CnkySWfrMk70lU79XbuJLFg8Z1g8KC5HlvXwki8MOv5o2k4g7C0xdQmosXIZHJk1BS5LF7LFG00nTWPzboy');

// noinspection JSUnresolvedFunction
express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .post('/ephemeral_keys', (req, res) => {
        // noinspection JSUnresolvedVariable
        const customerID = req.body.costomer_id;
        const apiVersion = req.body.api_version;
        console.log(customerID, apiVersion)

        stripe.ephemeralKeys.create({
            customer: customerID,
            apiVersion: apiVersion
        }).then((key) => {
            res.status(200).send(key)
        }).catch((err) => {
            console.log(err, req.body)
            res.status(500).end()
        });
    })
    .get('/', (req, res) => {
        res.status(200).send('Hello world!')
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1500,
//     currency: 'cad',
// });
// const clientSecret = paymentIntent.client_secret
