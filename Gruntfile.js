var path = require("path");
var jpegtran = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');
var svgo = require('imagemin-svgo');

module.exports = function(grunt) {
  var now = grunt.template.today('fullDate')
  console.log("Publication date: " +  now );
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main : {
        src: "book.json.ejs",
        dest: 'book.json',
        options: {
          process: function(content, path) {
            return grunt.template.process(content, {data: {now: now} });
          },
          now: now
        }
      }
    },
    run:{
      server: {
        exec: 'gitbook serve'
      },
      build: {
        exec: 'gitbook build ./ ./exports/open-guide'
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [
            jpegtran(),
            optipng(),
            svgo()
          ]
        },
        files: [{
          expand: true,                           // Enable dynamic expansion
          cwd: './exports/open-guide/images/',    // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],            // Actual patterns to match
          dest: './exports/open-guide/images/'    // Destination path prefix
        }]
      }
    },
    image_resize: {
      resize: {
        options: {
            width: 770,
            height: 1000, // Because without that, it just generates a 1x1px file
            //overwrite: true
        },
        src: './exports/open-guide/images/*',
        dest: './exports/open-guide/images/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-modify-json');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-image-resize');

  // Default task(s).
  grunt.registerTask('default', ['run:server']);
  grunt.registerTask('update_book_json', ['copy']);
  grunt.registerTask('build', [
                                'update_book_json',
                                'run:build',
                                'image_resize',
                                'imagemin'
                              ]);
};
