'use strict'

const Base = require('./_Base')

class ResetPassword extends Base {
  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = ResetPassword
