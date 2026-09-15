import type { Block } from 'payload'

export const EventList: Block = {
  slug: 'eventList',
  interfaceName: 'EventListBlock',
  labels: {
    singular: 'Event List',
    plural: 'Event Lists',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'upcoming',
      options: [
        { label: 'Automatically show upcoming tour dates', value: 'upcoming' },
        { label: 'Choose specific events', value: 'selected' },
      ],
      admin: { layout: 'vertical' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        description: 'How many upcoming events to show.',
        condition: (_, siblingData) => siblingData?.mode === 'upcoming',
      },
    },
    {
      name: 'events',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.mode === 'selected',
      },
    },
  ],
}
