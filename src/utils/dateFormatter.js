export function formatDate(dateString, format = 'long') {
  const date = new Date(dateString)
  
  if (format === 'short') {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    })
  }
  
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}