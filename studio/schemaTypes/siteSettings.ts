import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'cvButtonText',
      title: 'Resume Button Label',
      type: 'string',
      description: 'Label shown on the Resume button in the top bar (e.g. "Resume" or "CV")',
      initialValue: 'Resume',
    },
    {
      name: 'cvButtonUrl',
      title: 'Resume URL',
      type: 'url',
      description: 'Link for the Resume button — use a direct PDF link or Google Drive share URL',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'linkedInButtonText',
      title: 'LinkedIn Button Label',
      type: 'string',
      description: 'Label shown on the LinkedIn button in the top bar',
      initialValue: 'LinkedIn',
    },
    {
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Your LinkedIn profile URL',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'emailButtonText',
      title: 'Email Button Label',
      type: 'string',
      description: 'Label shown on the Email button in the top bar',
      initialValue: 'Email',
    },
    {
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      description: 'Your email address — mailto: is added automatically (e.g. yourname@example.com)',
      initialValue: 'siddharthkothiyal05@gmail.com',
    },
    {
      name: 'ogTitle',
      title: 'Link Preview Title',
      type: 'string',
      description: 'Headline shown when the site is shared as a link (iMessage, LinkedIn, Twitter etc.)',
    },
    {
      name: 'ogImage',
      title: 'Link Preview Image (recommended: 1200×630px)',
      type: 'image',
      description: 'Image shown in link previews. Upload at 1200×630px for best results across all platforms.',
      options: { hotspot: true },
    },
    {
      name: 'bottomBarText',
      title: 'Bottom Bar Text',
      type: 'string',
      description: 'Text shown in the bottom bar. Currently: "Vibe coded with ❤ using Claude"',
      initialValue: 'Vibe coded with ❤ using Claude',
    },
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
