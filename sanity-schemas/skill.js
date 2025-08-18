export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Design', value: 'design' },
          { title: 'Tools', value: 'tools' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'level',
      title: 'Skill Level',
      type: 'number',
      description: 'Nível de 1 a 100',
      validation: Rule => Rule.required().min(1).max(100)
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Ícone da tecnologia/skill'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Ordem de exibição (menor número aparece primeiro)',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon',
      level: 'level'
    },
    prepare(selection) {
      const { title, subtitle, media, level } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • Level ${level}`,
        media: media
      };
    }
  },
  orderings: [
    {
      title: 'Custom Order',
      name: 'customOrder',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'level', direction: 'desc' }
      ]
    },
    {
      title: 'Category, Level Desc',
      name: 'categoryLevelDesc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'level', direction: 'desc' }
      ]
    },
    {
      title: 'Level Desc',
      name: 'levelDesc',
      by: [{ field: 'level', direction: 'desc' }]
    }
  ]
};