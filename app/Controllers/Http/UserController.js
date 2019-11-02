'use strict'

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

const Antl = use('Antl')

class UserController {
  async store ({ request, antl }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return { ...user, message: antl.formatMessage('validation.success'), current: Antl.currentLocale() }
  }
}

module.exports = UserController
