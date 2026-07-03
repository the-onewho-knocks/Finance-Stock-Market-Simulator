import { useState, useRef, useCallback, type ReactNode } from 'react'
import { cn } from '../../lib/helpers'

interface SplitPanelProps {
  left: ReactNode
  right: ReactNode
  defaultLeftWidth?: number
  minLeftWidth?: number
  minRightWidth?: number
  className?: string
}

export function SplitPanel({ left, right, defaultLeftWidth = 50, minLeftWidth = 30, minRightWidth = 30, className }: SplitPanelProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setLeftWidth(Math.max(minLeftWidth, Math.min(100 - minRightWidth, pct)))
    }

    const handleMouseUp = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [minLeftWidth, minRightWidth])

  return (
    <div ref={containerRef} className={cn('flex overflow-hidden', className)}>
      <div style={{ width: `${leftWidth}%` }} className="shrink-0 overflow-auto">
        {left}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-1 shrink-0 cursor-col-resize bg-[#1f1f1f] hover:bg-accent transition-colors relative z-10"
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
      </div>
      <div style={{ width: `${100 - leftWidth}%` }} className="flex-1 overflow-auto">
        {right}
      </div>
    </div>
  )
}
