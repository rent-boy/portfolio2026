import {defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {ExperienceBarInput} from '../components/ExperienceBarInput'

export default defineType({
  name: 'workProject',
  title: 'Work Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'workProject'}),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      description: 'Make this project visible on the site',
      initialValue: true,
    },
    {
      name: 'isOpen',
      title: 'Open to visitors',
      type: 'boolean',
      description: 'When off, project appears on the landing page but is not clickable and its page is inaccessible',
      initialValue: true,
    },
    {
      name: 'closedProjectUrl',
      title: 'External link (closed projects only)',
      type: 'url',
      description: 'Optional — if set, clicking the tile opens this URL instead of the project page. Leave empty to keep the tile non-clickable.',
      hidden: ({ parent }: { parent: { isOpen?: boolean } }) => parent?.isOpen !== false,
      validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'assignedBar',
      title: 'Experience Bar',
      type: 'string',
      description: 'Which experience bar this project appears under on the landing page',
      components: { input: ExperienceBarInput },
    },
    {
      name: 'hoverBgColor',
      title: 'Hover — Background Color',
      type: 'color',
      description: 'Page background color when user hovers this project tile',
    },
    {
      name: 'hoverAccentColor',
      title: 'Hover — Accent Color',
      type: 'color',
      description: 'Text/element color when user hovers this project tile (for future use)',
    },
    {
      name: 'landingImages',
      title: 'Landing Page Media',
      type: 'array',
      description: '1–10 images or videos shown as a stacked pile on the landing page work grid',
      of: [{ type: 'file', options: { accept: 'image/*,video/*' } }],
      validation: (Rule: any) => Rule.max(10),
    },
    {
      name: 'thumbnailVideo',
      title: 'Thumbnail Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coverVideo',
      title: 'Cover Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'metadata',
      title: 'Project Metadata',
      description: 'Key-value rows shown below the cover image (e.g. Role / Designer, Timeline / 2024)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        },
      ],
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [{type: 'contentBlock'}],
    },
    {
      name: 'googleDriveVideoUrl',
      title: 'Google Drive Video Embed URL',
      type: 'url',
      description: 'Optional: Add a Google Drive video embed link that will appear at the end of the project (e.g., https://drive.google.com/file/d/...)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverImage',
    },
  },
})

