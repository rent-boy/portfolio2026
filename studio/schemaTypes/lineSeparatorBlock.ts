import {defineType} from 'sanity'

export default defineType({
  name: 'lineSeparatorBlock',
  title: 'Line Separator',
  type: 'object',
  fields: [
    {
      name: 'spacing',
      title: 'Vertical Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
      description: 'Space above and below the line',
    },
  ],
  preview: {
    select: {
      spacing: 'spacing',
    },
    prepare({spacing}) {
      return {
        title: 'Line Separator',
        subtitle: `2px gray line, ${spacing || 'medium'} spacing`,
      }
    },
  },
})

