import {defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Profile picture shown next to the work filter tabs on the landing page',
      options: { hotspot: true },
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 5,
      description: 'Bio paragraph displayed next to the profile image on the landing page',
    },
    {
      name: 'cursorMedia',
      title: 'Cursor Media (landing hover effect)',
      type: 'array',
      description: 'Images/videos that cycle as the cursor moves over the hero. Drag rows to set the playback order.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Image or Video',
              type: 'file',
              options: { accept: 'image/*,video/*' },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt text (optional)',
              type: 'string',
            },
            {
              name: 'chipLabel',
              title: 'Chip label',
              type: 'string',
              description: 'Text shown on the status chip when this media is active (e.g. "✤ Scroll down ✤")',
            },
          ],
          preview: {
            select: { title: 'alt' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Media item' }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
