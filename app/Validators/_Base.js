'use strict'

/** @type {import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

class Base {
  get validateAll () {
    return true
  }

  get messages () {
    return Antl.forLocale(this.ctx.locale).list('validation')
  }
}

module.exports = Base
