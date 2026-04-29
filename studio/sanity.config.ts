import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Sid Portfolio',

  projectId: 'ysi7wnbr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Home Page (single)
            S.listItem()
              .title('Home')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            // Orderable Work Projects
            orderableDocumentListDeskItem({
              type: 'workProject',
              title: 'Work Projects',
              S,
              context,
            }),
            // Site Settings (single)
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // All other document types except workProject, homePage, and siteSettings
            ...S.documentTypeListItems().filter(
              (listItem) => !['workProject', 'homePage', 'siteSettings'].includes(listItem.getId() || '')
            ),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

