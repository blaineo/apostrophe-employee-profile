module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Social Media',
  addFields: [
      {
        name: 'social',
        type: 'select',
        label: 'Social Media',
        choices: [
          {
            label: 'Twitter',
            value: 'twitter',
          },
          {
            label: 'Instagram',
            value: 'insta',
          },
          {
            label: 'Facebook',
            value: 'facebook'
          },
        ],
        required: true
      },
      {
        name: 'handle',
        type: 'string',
        label: 'Handle',
        required: true
      }
  ]
};