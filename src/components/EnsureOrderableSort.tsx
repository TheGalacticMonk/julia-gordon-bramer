'use client'

import { useListQuery } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

export default function EnsureOrderableSort() {
  const { handleSortChange, orderableFieldName, query } = useListQuery()
  const hasAppliedDefault = useRef(false)

  useEffect(() => {
    if (!hasAppliedDefault.current && orderableFieldName) {
      hasAppliedDefault.current = true
      if (query.sort !== orderableFieldName) {
        void handleSortChange?.(orderableFieldName)
      }
    }
  }, [handleSortChange, orderableFieldName, query.sort])

  return null
}
