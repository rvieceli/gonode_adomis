'use strict'

/** @type {typeof import('@adonisjs/mail')} */
const Mail = use('Mail')

class ForgotPasswordMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ForgotPasswordMail-job'
  }

  async handle ({ user, url }) {
    const { email, token } = user

    await Mail.send(
      ['emails.forgot_password'],
      {
        email,
        token,
        link: `${url}?token=${token}`
      },
      message => {
        message
          .to(email)
          .from('adonis@curso.com')
          .subject('Recuperação de senha')
      }
    )
  }
}

module.exports = ForgotPasswordMail
