'use strict'

/** @typedef {import('../Task')} Task */

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

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

  Kue.dispatch(Job.key, { email, username, title, file }, { attempts: 3 })
}
