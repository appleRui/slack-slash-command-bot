require('dotenv/config')
const axios = require('axios')
const express = require('express')
const notion = require('./modules/notion.js')
const todoist = require('./modules/todoist.js')
const handOverModal = require('./views/handOverModal')

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

app.post('/modal', async (req, res, next) => {
  const {
    trigger_id
  } = req.body
  const url = 'https://slack.com/api/views.open'
  const view = handOverModal
  const header = {
    headers: {
      "Authorization": `Bearer ${process.env.SLACK_TOKEN}`,
      "Content-type": 'application/json'
    }
  }
  const params = {
    trigger_id,
    view,
  }

  try {
    await axios.post(url, params, header)
  } catch (e) {
    console.error(e.request.status)
  }
  res.status(200).send(null)
})

app.post('/send', async (req, res, next) => {
  const {
    view,
  } = JSON.parse(req.body.payload)

  const ttl = view.state.values.ttl['plain_text_input-action'].value
  const subject = view.state.values.subject['static_select-action'].selected_option.text.text
  const detail = view.state.values.detail['plain_text_input-action'].value
  const improvement = view.state.values.improvement['plain_text_input-action'].value

  const url = 'https://hooks.slack.com/services/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'
  const header = {
    headers: {
      "Content-type": 'application/json'
    }
  }
  const text = `タイトル:${ttl}\n教材内容:${subject}\n詳細：${detail}\n改善方法:${improvement}`
  const params = {
    text
  }

  try {
    const result = await axios.post(url, params, header)
    console.log(result.statusText)
  } catch (e) {
    console.error(e.request)
  }
  res.status(200).send(null)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app