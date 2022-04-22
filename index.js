require('dotenv/config')
const express = require('express')
const notion = require('./modules/notion.js')
const todoist = require('./modules/todoist.js')

const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello Would!!')
})

app.post('/today', (req, res) => {
  todoist.getTasks({
      filter: "today"
    })
    .then((tasks) => res.json(tasks))
    .catch((error) => console.log(error))
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

app.post('/memo', async (req, res, next) => {
  const title = !req.body.text ? 'untitle' : req.body.text
  const params = {
    parent: {
      database_id: process.env.NOTION_DATABASE_ID
    },
    properties: {
      Name: {
        title: [{
          text: {
            content: title,
          },
        }],
      },
    }
  }
  const result = await notion.pages.create(params)
  res.send({
    "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `「${result.properties.Name.title[0].text.content}」が作成されました`
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "開く",
          "emoji": true
        },
        "value": result.url,
        "url": result.url,
        "action_id": "button-action"
      }
    }]
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app