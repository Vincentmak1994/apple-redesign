import { RiUserFill } from "react-icons/ri";

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  icon: RiUserFill, 
  fields: [
    {
      name: 'name',
      title: 'Name',
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
