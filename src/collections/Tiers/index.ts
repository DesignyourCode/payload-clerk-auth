import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Tiers: CollectionConfig<'pages'> = {
  slug: 'tiers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      label: 'Pricing',
      type: 'collapsible',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'frequency',
          type: 'select',
          options: [
            {
              label: 'Monthly',
              value: 'monthly',
            },
            {
              label: 'Yearly',
              value: 'yearly',
            },
            {
              label: 'Lifetime',
              value: 'lifetime',
            },
          ],
        },
      ],
    },
  ],
  versions: {
    maxPerDoc: 50,
  },
}
