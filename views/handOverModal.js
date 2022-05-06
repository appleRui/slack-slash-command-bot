const template = {
  "type": "modal",
  "title": {
    "type": "plain_text",
    "text": "引き継ぎ",
    "emoji": true
  },
  "submit": {
    "type": "plain_text",
    "text": "完了",
    "emoji": true
  },
  "close": {
    "type": "plain_text",
    "text": "キャンセル",
    "emoji": true
  },
  "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "引き継ぎ内容を記載してください"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "input",
      "block_id": "ttl",
      "element": {
        "type": "plain_text_input",
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "タイトル",
        "emoji": true
      }
    },
    {
      "type": "input",
      "block_id": "subject",
      "element": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "教材箇所",
          "emoji": true
        },
        "options": [{
            "text": {
              "type": "plain_text",
              "text": "HTML",
              "emoji": true
            },
            "value": "value-0"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "CSS",
              "emoji": true
            },
            "value": "value-1"
          },
        ],
        "action_id": "static_select-action"
      },
      "label": {
        "type": "plain_text",
        "text": "詳細",
        "emoji": true
      }
    },
    {
      "type": "input",
      "block_id": "detail",
      "element": {
        "type": "plain_text_input",
        "multiline": true,
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "詳細",
        "emoji": true
      }
    },
    {
      "type": "input",
      "block_id": "improvement",
      "element": {
        "type": "plain_text_input",
        "multiline": true,
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "改善方法",
        "emoji": true
      }
    }
  ]
}

module.exports = template