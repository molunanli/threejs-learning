import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js' // 代码高亮

export default function useMarkdown() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    }
  })

  const renderMarkdown = (content) => {
    return md.render(content)
  }

  return { renderMarkdown }
}