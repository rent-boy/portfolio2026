import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'cvButtonText',
      title: 'CV Button Label',
      type: 'string',
      description: 'Text shown on the bottom bar CV button (e.g. "View CV" or "Download Resume")',
      initialValue: 'View CV',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cvButtonUrl',
      title: 'CV Button URL',
      type: 'url',
      description: 'Link the CV button opens — use a direct PDF link or Google Drive share URL',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Your LinkedIn profile URL',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'linkedInButtonText',
      title: 'LinkedIn Button Label',
      type: 'string',
      description: 'Text shown on the LinkedIn button (e.g. "LinkedIn")',
      initialValue: 'LinkedIn',
    },
    {
      name: 'bottomBarText',
      title: 'Bottom Bar Text',
      type: 'text',
      rows: 4,
      description: 'Descriptive text shown below the buttons. Use line breaks to split into multiple lines.',
    },
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
