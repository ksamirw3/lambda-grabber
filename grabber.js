'use strict'
const Promise = require('bluebird');
const jsdom = require('jsdom');


exports.getColors = (url) => {
//    return Promise.rejected(new Error('not implemented'))// return promise with array of objects (see readme for more info)

return new Promise(function(resolve, reject) {

    jsdom.env(url, ["http://code.jquery.com/jquery.js"], function (err, window) {

        let $ = window.$;
        let result = setResult($, url);

        resolve(result);

      }
    );

})

}

let setResult = ($, url) => {
    
    let title, result;
    title = $("title").text() || '';
    result = {};

    result['url'] = url;
    
    if(title && title.indexOf("404") > -1){
        result['error'] = 'invalid page';
    }else{
        result['author'] = 'Sof Andrade';
        result['name'] = $("div.slat-header h1").text() || '';
        result['tags'] = setTags($);
        result['colors'] = setColor($);
    }
    
    return result;
}

let setColor = ($) => {
    
    let colors = [];
    
    $("li.color").each(function() {
        let color = $(this).text().trim().split("#")[1];
        colors.push(color);
    });
    
    return colors;
}

let setTags = ($) => {
    
    let tags = [];
    
    $("li.tag a").each(function() {
        tags.push($(this).text().trim());
    });
    
    return tags;
}