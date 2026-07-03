import { useState, useMemo } from 'react'

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const paginatedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  )

  return { page, setPage, totalPages, paginatedItems, pageSize }
}
