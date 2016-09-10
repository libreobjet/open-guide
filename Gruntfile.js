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
      },
      svg: {
        files: [
          // Copy SVG files from root image folder to the right directory
          {expand: true, src: ['images/*.svg'], dest: 'en/', filter: 'isFile'}
        ]
      }
    },
    run:{
      server: {
        exec: 'gitbook serve'
      },
      build: {
        exec: 'gitbook build ./ ./exports/open-guide'
      },
      pdf: {
        exec: 'gitbook pdf ./ ./exports/open-guide.pdf'
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
          cwd: './exports/open-guide/en/images/',    // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],            // Actual patterns to match
          dest: './exports/open-guide/en/images/'    // Destination path prefix
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
        src: './exports/open-guide/en/images/*',
        dest: './exports/open-guide/en/images/'
      }
    },
    less: {
      development:{
        options: {
          yuicompress: true
        },
        files: {
          "theme/assets/website/style.css": "theme/stylesheets/website.less",
          "theme/assets/ebook/pdf.css": "theme/stylesheets/pdf.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-imagemagick');
  grunt.loadNpmTasks('grunt-shell');

  /*** TASKs ***/
  // Generates the book.json file with all the settings
  grunt.registerTask('update_book_json', ['copy:main']);
  // Converts Less files into CSS
  grunt.registerTask('css', [ 'less']);
  // Copy SVG images over the right subfolders
  grunt.registerTask('copy_svg', [ 'copy:svg']);
  // Calls the web server
  grunt.registerTask('serve', ['default']);
  // DEFAULT: Calls the web server
  grunt.registerTask('default', [ 'css',
                                  'update_book_json',
                                  'run:server'
                                ]);
  // Generate the books
  grunt.registerTask('pdf', [
                              'css',
                              'update_book_json',
                              'run:pdf'
                            ]);
  // Builds for publishingo on a webserver
  grunt.registerTask('web', [
                              'css',
                              'update_book_json',
                              'run:build',
                              'image_resize',
                              'imagemin'
                            ]);
  // Colorizes the images and puts them in the right folder
  grunt.registerTask('colorize', function(){
    var src = grunt.file.expand({'cwd':'images'}, '*.+(jpg|JPG|png|PNG|gif|GIF)');
    var dest = "en/images/";
    if ( !grunt.file.exists( dest ) ){
      grunt.file.mkdir( dest );
    }
    for ( var i=0; i < src.length; i++ ) {
      var el = src[i];
      var img_src = 'images/' + el;
      var img_dest = dest + el;
      var cmd = 'sh scripts/color-image.sh "' + img_src + '" "' + img_dest + '"';
      var taskName = el;
      console.log( img_src );
      grunt.config(['shell', taskName ], {
          command: cmd
      });
    }
    grunt.task.run('shell');
    grunt.task.run('copy_svg');
  });
};
