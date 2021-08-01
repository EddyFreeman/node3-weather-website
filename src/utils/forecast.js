const request = require('request')



const forcast = (latitude, longitude, callback) => {
    const urlWeatherstack = "http://api.weatherstack.com/current?access_key=ef078688caca108a4ab2fff41eaa79d1&query=" + latitude + "," + longitude;
    console.log("URL:", urlWeatherstack)
    // request({url: urlWeatherstack, json: true}, (error, response) => {   // Non-Destructuring version
    request({url: urlWeatherstack, json: true}, (error, {body}) => {   // Destructuring version
        if (error) {
            callback("Unable to access weather service", undefined);
        } else if (body.error) {
            callback("Can't access weather information! Try again with new longitude and latitue values", undefined);
        } else {
            callback(undefined, body.current)
        }
    })

}

module.exports = forcast;