import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity-schemas';

export default defineConfig({
  name: 'portfolio-cms',
  title: 'Portfolio CMS',
  
  projectId: '0ty1qfst', // Project ID do Sanity
  dataset: 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Biography')
              .child(
                S.document()
                  .schemaType('bio')
                  .documentId('bio')
              ),
            S.divider(),
            S.listItem()
              .title('Projects')
              .child(
                S.documentTypeList('project')
                  .title('All Projects')
                  .filter('_type == "project"')
                  .defaultOrdering([{ field: 'featured', direction: 'desc' }, { field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Featured Projects')
              .child(
                S.documentTypeList('project')
                  .title('Featured Projects')
                  .filter('_type == "project" && featured == true')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Skills')
              .child(
                S.documentTypeList('skill')
                  .title('All Skills')
                  .filter('_type == "skill"')
                  .defaultOrdering([{ field: 'category', direction: 'asc' }, { field: 'level', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Contact Information')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact')
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
});