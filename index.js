module.exports = {
    extend: 'apostrophe-pieces',
    name: 'apostrophe-employee-profile',
    label: 'Employee',

    moogBundle: {
        modules: ['apostrophe-social-widgets'],
        directory: 'lib/modules'
      },    
    addFields: [
      {
        name: 'title',
        label: 'Full Name',
        type: 'string',
        required: true,
        contextual: true
      },
      {
        name: 'slug',
        label: 'Slug',
        type: 'string',
        required: true,
        contextual: true
      },      
      {
        name: 'firstName',
        label: 'First Name',
        type: 'string',
        required: true
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'string',
        required: true
      },
      {
        name: 'job-title',
        label: 'Job Title',
        type: 'string',
        required: true
      },
      {
        name: 'email-address',
        label: 'Email Address',
        type: 'string',
        required: true
      },       
      {
        name: 'bio',
        label: 'Biography',
        type: 'singleton',
        widgetType: 'apostrophe-rich-text',
        options: {
            toolbar: [ 'Bold', 'Italic', 'Link', 'Unlink' ]
        }
      },
      {
        name: 'thumbnail',
        label: 'Thumbnail',
        type: 'singleton',
        widgetType: 'apostrophe-images',
        options: {
          limit: 1,
          minSize: [ 450, 450 ],
          aspectRatio: [ 1, 1 ]
        }
      },
      {
        name: 'social',
        label: 'Social Medium',
        type: 'area',
        options: {
          widgets: {
            'apostrophe-social': {},
          }
        }
      }

    ],
    construct: function(self, options) {
      self.beforeSave = function(req, piece, options, callback) {
        piece.title = piece.firstName + ' ' + piece.lastName;
        piece.slug = piece.firstName.toLowerCase() + '-' + piece.lastName.toLowerCase();
        return callback();
      };
    },  
    restApi: true
   
};