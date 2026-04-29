import {defineType} from 'sanity'

export default defineType({
  name: 'slideshowBlock',
  title: 'Slideshow Block',
  type: 'object',
  fields: [
    {
      name: 'items',
      title: 'Media Items (Images/Videos)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          title: 'Image',
        },
        {
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically play through slides',
      initialValue: true,
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
      initialValue: 'half',
    },
    {
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional button text to display on this block',
    },
    {
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      description: 'URL for the button (internal like /work or external like https://example.com)',
    },
    {
      name: 'roundCorners',
      title: 'Round Corners',
      type: 'boolean',
      description: 'Apply rounded corners to the slideshow',
      initialValue: true,
    },
    {
      name: 'showBorder',
      title: 'Show Border',
      type: 'boolean',
      description: 'Add a thin 2px border around the slideshow',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'items.0',
    },
    prepare({title, media}) {
      return {
        title: title || 'Slideshow Block',
        subtitle: 'Media Carousel (Images/Videos)',
        media,
      }
    },
  },
})

