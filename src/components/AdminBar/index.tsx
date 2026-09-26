'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import './index.css'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  posts: {
    plural: 'Essays',
    singular: 'Essay',
  },
  books: {
    plural: 'Books',
    singular: 'Book',
  },
  events: {
    plural: 'Events',
    singular: 'Event',
  },
}

// The first path segment of each public section, and the CMS collection behind it.
const sectionCollections: Record<string, keyof typeof collectionLabels> = {
  'decoding-sylvia-plath': 'posts',
  books: 'books',
  events: 'events',
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const [preview, setPreview] = useState(false)
  const collection = sectionCollections[segments?.[1] ?? ''] ?? 'posts'
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    const authenticated = Boolean(user?.id)
    setShow(authenticated)

    if (!authenticated) {
      setPreview(false)
      return
    }

    fetch('/next/preview-status', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { isEnabled: false }))
      .then((data) => {
        const status = data as { isEnabled?: boolean }
        setPreview(Boolean(status.isEnabled))
      })
      .catch(() => setPreview(false))
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          preview={preview}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection].plural,
            singular: collectionLabels[collection].singular,
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
