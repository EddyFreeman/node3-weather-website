const request = require('request')

const geocode = (address, callback) => {
    const urlMapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZWRkeWZyZWVtYW4iLCJhIjoiY2tyNWF3eXhiMm9nYzJ1cGxpOGhnd2NveiJ9.u2BzHyOst337Mf5dS2cQzw&limit=1";

    // request({url: urlMapbox, json: true}, (error, response) => { // Non-Destructuring version
    request({url: urlMapbox, json: true}, (error, {body}) => {  // Destructuring version
        if (error) {
            callback("Unable to access weather service", undefined);
        } else if (body.features.length === 0) { // Non-Destructuring version will be:: "response.(body.features.length === 0"
            callback("Location data cannot be found! Try another search term")
        } else {
            const data = {
                // longitude: response.body.features[0].center[0],
                // latitude: response.body.features[0].center[1],
                // location: response.body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;