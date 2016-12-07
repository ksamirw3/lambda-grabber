'use strict'
const assert = require('assert')
const Promise = require('bluebird')

const grabber = require('../grabber')

describe('test handler',() => {

    let expectedResults = {
        'https://dribbble.com/shots/3133085-A-simple-Contact-Page': {
            name: 'A simple Contact Page',
            tags: ['contact','faq','landing','mail','phone','ui','ux','website'],
            colors: ['FFFFFF','FBC456','707590','D7D4DB','AAC8D3','F9C9A8','EF7640']
        },
        'https://dribbble.com/shots/32425245-blah': {
            error: 'invalid page'
        },
        'https://dribbble.com/shots/3135922-Prototype': {
            name: 'Prototype',
            tags: ['browser','car','engine','futuristic','interface','modern','navigation','prototype','site','ui','ux','web'],
            colors: ['F36944','FDEAEA','F3DCDD','F3D0DB','E0AECF','E4876E','6D5367','B4BCBF']
        }
    }

    it('should grab urls', () => {
        let urls = Object.keys(expectedResults)
        return Promise.map(urls,(url) => {
          let expectedResult = expectedResults[url]
          return grabber.getColors(url).then((color) => {
            assert.equal(color.name, expectedResult.name)
            assert.deepEqual(color.colors, expectedResult.colors)
            assert.deepEqual(color.tags, expectedResult.tags)
          }).catch((err) => {
            assert.ok(expectedResult.error,'should not fail for valid url')
            assert.equal(err.message, expectedResult.error)
          })
        })
    })

  it('should return error for')
})