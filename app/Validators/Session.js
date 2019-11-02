'use strict'

const Base = require('./_Base')

class Session extends Base {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
