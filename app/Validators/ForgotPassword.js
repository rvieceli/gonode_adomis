'use strict'

const Base = require('./_Base')

class ForgotPassword extends Base {
  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgotPassword
