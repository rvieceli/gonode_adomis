'use strict'

const Base = require('./_Base')

class Project extends Base {
  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }
}

module.exports = Project
