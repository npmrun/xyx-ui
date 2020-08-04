module.exports = {
  "disableEmoji": false,
  "list": [
    "测试用例",
    "添加特性",
    "修复BUG",
    "构建过程",
    "文档更新",
    "重构代码",
    "样式更新",
    "CI构建流程",
    "性能提升"
  ],
  "maxMessageLength": 64,
  "minMessageLength": 3,
  "questions": [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna"
  ],
  "scopes": [],
  "types": {
    "构建过程": {
      "description": "构建过程或者辅助工具更改",
      "emoji": "🤖",
      "value": "构建过程"
    },
    "CI构建流程": {
      "description": "CI有关的修改",
      "emoji": "🎡",
      "value": "CI构建流程"
    },
    "文档更新": {
      "description": "只修改了文档",
      "emoji": "✏️",
      "value": "文档更新"
    },
    "添加特性": {
      "description": "一些特性",
      "emoji": "🎸",
      "value": "添加特性"
    },
    "修复BUG": {
      "description": "修复一些BUG",
      "emoji": "🐛",
      "value": "修复BUG"
    },
    "性能提升": {
      "description": "提升性能的代码",
      "emoji": "⚡️",
      "value": "性能提升"
    },
    "重构代码": {
      "description": "不是修BUG跟添加特性的代码",
      "emoji": "💡",
      "value": "重构代码"
    },
    "发布版本": {
      "description": "创建一个发布版提交",
      "emoji": "🏹",
      "value": "release"
    },
    "样式更新": {
      "description": "样式方面的更新",
      "emoji": "💄",
      "value": "样式更新"
    },
    "测试用例": {
      "description": "添加缺少的一些测试用例",
      "emoji": "💍",
      "value": "测试用例"
    }
  }
};