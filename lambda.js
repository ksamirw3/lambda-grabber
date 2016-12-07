'use strict'
const grabber = require('./grabber')

exports.handler = (event, context, callback) => {
    let urls = event.urls
    if (typeof urls === 'string') {
        urls = [urls]
    }
    grabber.getColors(urls).then((colors) => {
        callback(null,colors)
    }).catch(callback)
}