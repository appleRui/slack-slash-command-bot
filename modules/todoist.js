const {
  TodoistApi
} = require('@doist/todoist-api-typescript')
require('dotenv/config')

module.exports = new TodoistApi(process.env.TODOIST_KEY)