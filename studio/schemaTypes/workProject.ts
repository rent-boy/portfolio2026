import {defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

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
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'Which period filter this project appears under on the landing page',
      options: {
        list: [
          {title: '2024–26', value: '2024-26'},
          {title: '2022–24', value: '2022-24'},
          {title: '2019–22', value: '2019-22'},
          {title: '2015–19', value: '2015-19'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'textBlock'},
        {type: 'emptyBlock'},
        {type: 'slideshowBlock'},
        {type: 'lineSeparatorBlock'},
        {type: 'prototypeEmbedBlock'},
      ],
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
      media: 'featuredImage',
    },
  },
})

