module.exports = {
    construct: function(self, options) {
      self.addFilter('slug', {
        def: false,
        launder: function(value) {
          return self.apos.launder.string(value);
        },
        safeFor: 'public',
        finalize: function(callback) {
          var slug = self.get('slug');
          if (!slug) {
            return setImmediate(callback);
          }
          var req = self.get('req');
          return self.apos.docs.getManager('employee').find(req, {
            slug: slug
          }, {
            _id: 1
          }).toObject(function(err, employee) {
            if (employee) {
                self.and({ _id: employee._id });
                return callback(null);                
            } else {
                const newErr = err ? err : {error : 'employee not found'};
                return callback(newErr);
            }
          });
        }
      });
    }
  };