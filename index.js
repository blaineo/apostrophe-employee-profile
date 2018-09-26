var _ = require('lodash');

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
      type: 'boolean',
      name: 'founder',
      label: 'Founder'
    },
    {
      type: 'boolean',
      name: 'partner',
      label: 'Partner'
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
    },
    {
      type: 'select',
      name: 'env',
      label: 'Environment',
      choices: [
        {
          label: 'Staging',
          value: 'staging'           
        },
        {
          label: 'Production',
          value: 'prod'
        }          
      ]
    }    
  ],
  construct: function(self, options) {
    self.beforeSave = function(req, piece, options, callback) {
      piece.title = piece.firstName + ' ' + piece.lastName;
      piece.slug = piece.firstName.toLowerCase().replace(/[^a-zA-Z ]/g, "") + '-' + piece.lastName.toLowerCase().replace(/[^a-zA-Z ]/g, "");

      return callback();
    };
  
  }, 
  beforeConstruct: function(self, options) {
    options.arrangeFields = _.merge([
      { name: 'basic', label: 'Basics', fields: ['title', 'published', 'env'] },
      { name: 'meta', label: 'Meta', fields: ['tags'] }
    ], options.arrangeFields || []); 
    
    options.addFilters = [
      {
        name: 'env',
        choices: [
          {
            value: 'staging',
            label: 'Staging'
          },
          {
            value: 'prod',
            label: 'Production'
          },
          {
            value: null,
            label: 'Both'
          }
        ],
        def: null
      }
    ].concat(options.addFilters || []);    
  },   
  restApi: {
    maxPerPage: 100,
    name: 'employees',
    enabled: true,
    safeFilters: [ 'slug', 'env' ]
  } 
};