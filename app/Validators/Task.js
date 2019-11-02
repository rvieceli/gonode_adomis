'use strict'

const Base = require('./_Base')

class Task extends Base {
  get rules () {
    return {
      title: 'required',
      due_date: 'date'
    }
  }
}

module.exports = Task
