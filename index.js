/**
 * @desc This is the backend for communication between
 * the mobile ends and the Stripe API.
 * @url https://stripe-server-test.herokuapp.com/.
 * @author Qiwen Hua
 */

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// This is currently a test secret that is for testing only
const SECRET_KEY = 'sk_test_51HCrBpIazuHtyn2CnkySWfrMk70lU79XbuJLFg8Z1g8KC5HlvXwki8MOv5o2k4g7C0xdQmosXIZHJk1BS5LF7LFG00nTWPzboy'

const bodyParser = require('body-parser');
const stripe = require('stripe')(SECRET_KEY);

// Prices for subscription plan charges
const subscriptionPlan = {
    "low" : 1500,
    "med" : 1800,
    "high" : 2300,
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    // Fetch ephemeral keys by `customer_id` and `api_version`
    .post('/ephemeral_keys', (req, res) => {
        console.log(req.body)
        const customerID = req.body.customer_id;
        const apiVersion = req.body.api_version;

        stripe.ephemeralKeys.create(
            { customer: customerID },
            { apiVersion: apiVersion }
        ).then((key) => {
            res.status(200).send(key)
        }).catch((err) => {
            console.log(err)
            res.status(500).end()
        });
    })

    // Attaches a payment method with StripeID to a customer of Customer ID
    .post('/attach_pm', (req, res) => {
        console.log(req.body)
        const customerID = req.body.customer_id
        const stripeID = req.body.stripe_id

        stripe.paymentMethods.attach(
            stripeID,
            { customer: customerID }
        ).then((value) => {
            res.status(200).send(value)
        }).catch(err => {
            console.log(err)
            res.status(500).end()
        })
    })

    // Create payment intent and pass a client secret back to client
    .post('/create_payment_intent', (req, res) => {
        console.log(req.body)
        const customerID = req.body.customer_id;
        const plan = req.body.plan;

        stripe.paymentIntents.create({
            description: "purchase subscription plan of: " + plan,
            customer: customerID,
            amount: subscriptionPlan[plan],
            currency: 'cad'
        }).then((intent) => {
            res.status(200).send({ "client_secret" : intent.client_secret })
        }).catch((err) => {
            console.log(err)
            res.status(500).end()
        })
    })

    // For testing purposes
    .get('/', (_req, res) => {
        res.status(200).send('Hello world!')
    })

    .listen(PORT, () => console.log(`Listening on port ${ PORT }`))
