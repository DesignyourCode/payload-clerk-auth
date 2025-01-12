import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Customers: CollectionConfig<'pages'> = {
  slug: 'customers',
  access: {
    create: () => true, // Allow webhook to create customers
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['first_name', 'last_name', 'email'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'uid',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'first_name',
      type: 'text',
      required: true,
    },
    {
      name: 'last_name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'tier',
      type: 'relationship',
      relationTo: 'tiers',
      required: false,
      hasMany: false,
    },
  ],
  versions: {
    maxPerDoc: 50,
  },
}
