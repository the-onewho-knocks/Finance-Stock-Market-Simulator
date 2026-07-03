import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(date: string | Date, fmt = 'MMM dd, yyyy'): string {
  return format(typeof date === 'string' ? parseISO(date) : date, fmt)
}

export function formatDateTime(date: string | Date): string {
  return format(typeof date === 'string' ? parseISO(date) : date, 'MMM dd, yyyy HH:mm')
}

export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(typeof date === 'string' ? parseISO(date) : date, { addSuffix: true })
}
