const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const app = express();
const stripe = require('stripe')('sk_test_51HCrBpIazuHtyn2CnkySWfrMk70lU79XbuJLFg8Z1g8KC5HlvXwki8MOv5o2k4g7C0xdQmosXIZHJk1BS5LF7LFG00nTWPzboy');
const bodyParser = require('body-parser');
