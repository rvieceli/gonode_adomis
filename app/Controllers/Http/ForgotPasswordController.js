'use strict'

const crypto = require('crypto')
const moment = require('moment')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/ForgotPasswordMail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const { email } = request.all()
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      Kue.dispatch(Job.key, { user, url: request.input('redirect_url') }, { attempts: 3 })
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo não deu certo, esse email existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { password, token } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({
            error: { message: 'O token de recuperação está expirado.' }
          })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha.' } })
    }
  }
}

module.exports = ForgotPasswordController
