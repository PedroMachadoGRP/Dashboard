"use client"

import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './context/useAuth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <SnackbarProvider maxSnack={1}>
            <ThemeProvider>{children}</ThemeProvider>
          </SnackbarProvider>
        </AuthProvider>


      </body>
    </html>
  )
}
