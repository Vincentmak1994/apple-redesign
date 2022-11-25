import { RiQqFill } from "react-icons/ri";

export default {
  name: 'account',
  title: 'Account',
  type: 'document',
  icon: RiQqFill, 
  fields: [
    {
      name: 'account',
      title: 'Account',
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
