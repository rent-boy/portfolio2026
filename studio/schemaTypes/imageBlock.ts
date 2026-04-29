import {defineType} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          {title: 'Half Width - 2 columns', value: 'half'},
          {title: 'Full Width - 4 columns', value: 'full'},
        ],
      },
      initialValue: 'full',
    },
    {
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional button text',
    },
    {
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      description: 'Internal (e.g., /about, /work/pfi) or external link (e.g., https://example.com)',
    },
    {
      name: 'roundCorners',
      title: 'Round Corners',
      type: 'boolean',
      description: 'Apply rounded corners to the image',
      initialValue: true,
    },
    {
      name: 'showBorder',
      title: 'Show Border',
      type: 'boolean',
      description: 'Add a thin 2px border around the image',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Image Block',
        media,
      }
    },
  },
})

