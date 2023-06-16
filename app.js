require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./server/config/db')
const flash = require('connect-flash');

const session = require('express-session')

const app = express()
const port = 5000 || process.env.PORT

// connect to database
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
)
  
// Flash Messages
app.use(flash())


// template engine
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// routes
app.use('/', require('./server/routes/customer'))

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404')
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})