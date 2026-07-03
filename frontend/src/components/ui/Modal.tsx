import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/helpers'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => modalRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-xl border border-white/5 glass p-6 shadow-2xl shadow-black/40 animate-fadeInUp',
          className,
        )}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-200">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
