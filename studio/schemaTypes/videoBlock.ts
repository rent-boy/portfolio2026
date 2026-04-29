import {defineType} from 'sanity'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
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
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'If enabled, video will autoplay and play button will be hidden',
      initialValue: false,
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
      description: 'Apply rounded corners to the video',
      initialValue: true,
    },
    {
      name: 'showBorder',
      title: 'Show Border',
      type: 'boolean',
      description: 'Add a thin 2px border around the video',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'caption',
    },
    prepare({title}) {
      return {
        title: title || 'Video Block',
      }
    },
  },
})

