import { useEffect, useRef } from 'react'
import { cn } from '../../lib/helpers'

interface DialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'default'
}

export function Dialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'default' }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => dialogRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        tabIndex={-1}
        className="glass relative z-10 w-full max-w-sm rounded-xl p-6 shadow-2xl shadow-black/40 animate-fadeInUp"
      >
        <h3 id="dialog-title" className="text-base font-semibold text-gray-200">{title}</h3>
        <p id="dialog-message" className="mt-2 text-sm text-gray-400">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer',
              variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-accent hover:bg-accent-hover',
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
