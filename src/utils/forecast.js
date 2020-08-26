const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b15111c70d104fae0385e8e87c1543e3&query=' + latitude + ',' + longtitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error) {
            callback('Unable to find a location', undefined)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast