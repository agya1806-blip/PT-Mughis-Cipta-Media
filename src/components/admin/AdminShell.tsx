"use client"

import { ToastProvider } from "./Toast"

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
