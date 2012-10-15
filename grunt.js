module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      version: '0.4.0',
      banner: '/*! Oh Hell Scorekeeper - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Paul Salaets; Licensed MIT */',
      filename: 'ohhell-<%= meta.version %>'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'js/model.js',
          'js/controller.js',
          'js/service.js',
          'js/filter.js',
          'js/app.js'
        ],
        dest: 'dist/<%= meta.filename %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= meta.filename %>.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
