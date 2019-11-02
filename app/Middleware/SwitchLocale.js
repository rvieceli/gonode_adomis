'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SwitchLocale {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, antl, locale }, next) {
    antl.switchLocale(locale)

    // call next to advance the request
    await next()
  }
}

module.exports = SwitchLocale
