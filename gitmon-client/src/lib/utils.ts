import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function slugToTitle(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, match => match.toUpperCase())
}

export function titleToSlug(title: string): string {
  return encodeURIComponent(title.toLowerCase().replace(/\s/g, '-'))
}

export function replaceId(id: string): string {
  return id.replace(/^%40/, '')
}
