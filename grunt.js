module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      version: '0.7.0',
      banner: '/*! Oh Hell Scorekeeper - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Paul Salaets; Licensed MIT */',
      filename: 'ohhell-<%= meta.version %>'
    },
    concat: {
      mine: {
        src: [
          '<banner:meta.banner>',
          'js/model.js',
          'js/directive.js',
          'js/controller.js',
          'js/service.js',
          'js/filter.js',
          'js/app.js'
        ],
        dest: 'dist/<%= meta.filename %>.js'
      },
      vendor: {
        src: [
          'js/vendor/jquery.js',
          'js/vendor/jquery.sparkline.js',
          'js/vendor/angular.js',
          'js/vendor/lostorage.js',
          'js/vendor/vagueTime.js'
        ],
        dest: 'dist/vendor-<%= meta.filename %>.js'
      }
    },
    min: {
      mine: {
        src: ['<banner:meta.banner>', '<config:concat.mine.dest>'],
        dest: 'dist/<%= meta.filename %>.min.js'
      },
      vendor: {
        src: ['<config:concat.vendor.dest>'],
        dest: 'dist/vendor-<%= meta.filename %>.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
