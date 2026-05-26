import {defineType} from 'sanity'

export default defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  fields: [
    // TEXT — all optional, always visible
    {
      name: 'title',
      title: 'Title (shown in side nav)',
      type: 'string',
    },
    {
      name: 'paragraph',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'string', title: 'URL'}],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'showInSideNav',
      title: 'Show in Side Navigation',
      type: 'boolean',
      description: "Display this block's title in the left side nav",
      initialValue: true,
    },
    {
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    },
    {
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
    },
    // MEDIA — optional, all items appear on right side
    {
      name: 'media',
      title: 'Media',
      description: 'Add images, videos, or prototype embeds — all appear on the right side. Multiple items create a collage.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          fields: [
            {
              name: 'mediaType',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                  {title: 'Prototype Embed', value: 'prototype'},
                ],
                layout: 'radio',
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {accept: 'video/*'},
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
            {
              name: 'prototypeUrl',
              title: 'Prototype URL',
              type: 'url',
              hidden: ({parent}: any) => parent?.mediaType !== 'prototype',
            },
            {
              name: 'prototypeHeight',
              title: 'Height (px)',
              type: 'number',
              initialValue: 600,
              hidden: ({parent}: any) => parent?.mediaType !== 'prototype',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              hidden: ({parent}: any) => parent?.mediaType === 'prototype',
            },
          ],
          preview: {
            select: {mediaType: 'mediaType', image: 'image', caption: 'caption'},
            prepare({mediaType, image, caption}: any) {
              const label: Record<string, string> = {image: 'Image', video: 'Video', prototype: 'Prototype'}
              return {title: caption || label[mediaType] || 'Media', subtitle: label[mediaType], media: image}
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}: any) {
      return {title: title || 'Content Block'}
    },
  },
})
