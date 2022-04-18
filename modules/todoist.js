import {
  TodoistApi
} from '@doist/todoist-api-typescript'
import 'dotenv/config'

const todoist = new TodoistApi(process.env.TODOIST_KEY)

export default todoist