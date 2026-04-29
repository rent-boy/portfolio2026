import {defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'heading1',
      title: 'Heading 1',
      type: 'string',
    },
    {
      name: 'heading2',
      title: 'Heading 2',
      type: 'string',
    },
    {
      name: 'paragraph',
      title: 'Paragraph',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description: 'Internal (e.g., /work) or external link (e.g., https://example.com)',
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      name: 'showInSidePanel',
      title: 'Show in Side Panel Navigation',
      type: 'boolean',
      description: 'Display this text block in the left side navigation menu',
      initialValue: true,
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          {title: 'Quarter Width - 1 column', value: 'quarter'},
          {title: 'Half Width - 2 columns', value: 'half'},
          {title: 'Three Quarter Width - 3 columns', value: 'three-quarter'},
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heading1',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Text Block',
        subtitle,
      }
    },
  },
})

