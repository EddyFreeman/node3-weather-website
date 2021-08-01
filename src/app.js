const path = require('path')
const express = require('express')
const hbs = require('hbs') // THis is necessary for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


// Paths for express
const publicDirectoryPath = path.join(__dirname, "../public") // static assets
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Johnson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Els Pauwels'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Lorem ipsum cavum kukos',
        title: 'Help',
        name: 'Alex Freeman'
    })
})

app.get('/weather', (req, res) => {
   const address = req.query.address
    if (!address) {
      return  res.send({
           error: "You must provide an address"
       })
   }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecaseData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                temperature: forecaseData.temperature,
                weather_descriptions: forecaseData.weather_descriptions[0],
                location: location,
                address: address
            })
        })
    })
})

app.get('/help/*', (rq, res) => {
    res.render("404", {
        pageNotFoundErrorMessage: "Help article not found",
        title: '404',
        name: 'Alex Freeman'
    })
})

app.get('*', (rq, res) => {
    res.render("404", {
        pageNotFoundErrorMessage: "Page not found",
        title: '404',
        name: 'Alex Freeman'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})









