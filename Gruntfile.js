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
    },
    // "imagemagick-convert":{
    //   dev:{
    //     args:[
    //       'images/*.jpg', '-resize', '25x25', 'scripts/*.png']
    //   }
    // },
    less: {
      development:{
        options: {
          yuicompress: true
        },
        files: {
          "theme/assets/website/style.css": "theme/stylesheets/website.less"
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

  // Default task(s).
  grunt.registerTask('update_book_json', ['copy']);
  grunt.registerTask('default', [ 'css',
                                  'update_book_json',
                                  'run:server'
                                ]);
  grunt.registerTask('serve', ['default']);
  grunt.registerTask('pdf', [
                              'update_book_json',
                              'run:pdf'
                            ]);
  grunt.registerTask('web', [
                              'css',
                              'update_book_json',
                              'run:build',
                              'image_resize',
                              'imagemin'
                            ]);
  grunt.registerTask('css', [ 'less']);

  /* Custom task to convert files */
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
  });
};
