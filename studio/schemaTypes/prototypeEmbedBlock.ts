import { defineType } from 'sanity'

export const prototypeEmbedBlock = defineType({
  name: 'prototypeEmbedBlock',
  title: 'Prototype Embed Block',
  type: 'object',
  fields: [
    {
      name: 'prototypeUrl',
      title: 'Prototype URL',
      type: 'url',
      description: 'URL of your hosted prototype (e.g., Vercel, Netlify, or local server)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      description: 'Height of the embed in pixels (default: 800)',
      initialValue: 800,
      validation: (Rule) => Rule.min(300).max(2000),
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      description: 'Column width (1, 2, 3, or 4 columns)',
      options: {
        list: [
          { title: '1 Column', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns (Full Width)', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '4',
    },
    {
      name: 'roundCorners',
      title: 'Round Corners',
      type: 'boolean',
      description: 'Apply rounded corners to the embed',
      initialValue: true,
    },
    {
      name: 'showBorder',
      title: 'Show Border',
      type: 'boolean',
      description: 'Add a thin 2px border around the embed',
      initialValue: false,
    },
    {
      name: 'showOpenButton',
      title: 'Show "Open in New Tab" Button',
      type: 'boolean',
      description: 'Display a button to open the prototype in a new tab',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      prototypeUrl: 'prototypeUrl',
      width: 'width',
    },
    prepare({ prototypeUrl, width }) {
      return {
        title: 'Prototype Embed',
        subtitle: `${width} column${width !== '1' ? 's' : ''} wide - ${prototypeUrl}`,
      }
    },
  },
})

