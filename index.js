const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const app = express();
const stripe = require('stripe')('pk_test_51HCrBpIazuHtyn2CE7C3GDruQL1WjX0dUXVV0XlT0c1rOmHHaZOa6x3JzDlfsvIRVsr1qnAsDpNZRAaBv4ZKfd0h001FQaRjX9');
const bodyParser = require('body-parser');

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
