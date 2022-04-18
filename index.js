import todoist from './modules/todoist.js'
import express from 'express'

const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  todoist.getLabels()
    .then((labels) => res.json(labels))
    .catch((error) => console.log(error))
})

app.post('/today', async (req, res, next) => {
  const results = await todoist.getTasks()
  res.send(results)
})

app.post('/tasks', async (req, res, next) => {
  const text = req.body.text
  const params = {
    content: text,
    label_ids: [
      2160365128
    ],
    due_string: "today"
  }
  const result = await todoist.addTask(params)
  res.send(`「${result.content}」が作成されました\n${result.url}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})