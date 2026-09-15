export const formatEventDate = (startDate: string, endDate?: string | null): string => {
  const start = new Date(startDate)
  const startLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(start)

  if (!endDate) return startLabel

  const end = new Date(endDate)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()

  if (sameMonth) {
    const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(start)
    return `${monthLabel} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`
  }

  const endLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(end)

  return `${startLabel} – ${endLabel}`
}
