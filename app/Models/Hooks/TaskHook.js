'use strict'

/** @typedef {import('../Task')} Task */

/** @type {typeof import('@adonisjs/mail')} */
const Mail = use('Mail')

/** @type {typeof import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

/**
 * @param {Task} taskInstance
 */
TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
    return
  }

  const { username, email } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  await Mail.send(
    ['emails.new_task'],
    {
      username,
      title,
      hasAttachment: !!file
    },
    message => {
      message
        .to(email)
        .from('adonis@curso.com', 'Curso Adonis')
        .subject('Nova tarefa para você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
