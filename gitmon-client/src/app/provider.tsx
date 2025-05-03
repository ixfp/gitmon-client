'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@lib/queryClient'
import type * as React from 'react'
import { TooltipProvider } from '@components/ui/tooltip'
import { Toaster } from '@components/ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  )
}
