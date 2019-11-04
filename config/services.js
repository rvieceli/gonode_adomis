'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  sentry: {
    dsn: Env.get('SENTRY_DSN')
  }
}
