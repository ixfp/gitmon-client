import { cn } from '@lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'

const typographyVariants = cva('text-gray-900 dark:text-gray-100', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic text-gray-600',
      ul: 'list-disc list-inside pl-4',
      ol: 'list-decimal list-inside pl-4',
      pre: 'p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto',
      code: 'bg-gray-800 text-gray-100 rounded px-2 py-1 font-mono text-sm whitespace-pre-wrap max-w-full',
      table: 'table-auto border-collapse w-full',
      tr: 'm-0 border-t p-0 even:bg-muted',
      th: 'border px-4 py-2 font-bold',
      td: 'border px-4 py-2',
      hr: 'border-t border-gray-400 my-6 opacity-50',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {}

const Typography: FC<TypographyProps> = ({ className, variant, ...props }) => {
  const Component = variant || 'p'
  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />
}

export { Typography, typographyVariants }
