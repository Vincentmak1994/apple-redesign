import { RiGridFill } from "react-icons/ri";

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: RiGridFill, 
  fields: [
    {
      name: 'title',
      title: 'Title',
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
    }
  ],
}
