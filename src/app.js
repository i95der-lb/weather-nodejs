const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars Engine and Views Location
app.set('view enigne','hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs',{
        title: 'Weather',
        name: 'Nana'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About me",
        name: 'Nana'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Nana'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error2, {latitude, longtitude, location} = {}) => {
        if(error2) {
            return res.send({error: error2})
        }
        forecast(latitude, longtitude, (error3, {description, temperature, feelslike, humidity}) => {
            if(error3) {
                return res.send({
                    error: error3
                })
            }
            res.send({
                location,
                description,
                temperature,
                feelslike,
                humidity
            })
            })
        
    }) 
})


app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: '404 Page',
        name: 'Nana',
        error: 'Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404 Page',
        name: 'Nana',
        error: 'Page Not Found!'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})