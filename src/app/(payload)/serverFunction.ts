'use server'

import config from '@payload-config'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import { importMap } from './admin/importMap.js'

// Keep Payload's shared admin action at module scope so Next registers it directly in the
// server reference manifest used by the Cloudflare Worker.
export const serverFunction: ServerFunctionClient = async (args) =>
  handleServerFunctions({
    ...args,
    config,
    importMap,
  })
