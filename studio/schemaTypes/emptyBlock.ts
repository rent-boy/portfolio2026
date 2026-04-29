import {defineType} from 'sanity'

export default defineType({
  name: 'emptyBlock',
  title: 'Empty Block',
  type: 'object',
  fields: [
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Empty Block (Square)',
      }
    },
  },
})

