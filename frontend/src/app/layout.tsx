"use client"

import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import { SnackbarProvider } from 'notistack'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SnackbarProvider maxSnack={1}>
          <ThemeProvider>{children}</ThemeProvider>
        </SnackbarProvider>

      </body>
    </html>
  )
}
