module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: {
        src: ['target']
      }
    },

    browserify: {
      options: {
        transform: [require('grunt-react').browserify]
      },
      server: {
        src: ['app/js/**/*.js'],
        dest: 'target/staging/app.js',
        options: {
          watch: true
        }
      },
      dist: {
        files: {
          'target/staging/app.js': ['app/**/*.js']
        }
      }
    },

    sass: {
      dist: {
        options: {
          loadPath: require('node-bourbon').includePaths
        },
        files: {
          'target/staging/styles.css': 'app/scss/**/*.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: '*',
          livereload: true,
          base: ['.', 'target/staging'],
          open: 'http://localhost:8000/index.html'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['app/index.html'],
        tasks: ['copy:server']
      },
      js: {
        files: ['target/staging/app.js'],
        tasks: []
      },
      sass: {
        files: ['app/scss/**/*.scss'],
        tasks: ['sass:dist']
      }
    },

    copy: {
      server: {
        files: [
          {expand: true, flatten: true, src: ['app/index.html'], dest: 'target/staging'}
        ]
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ['app/index.html'], dest: 'target/dist'}
        ]
      }
    },

    useminPrepare: {
      html: 'target/dist/index.html',
      options: {
        dest: 'target/dist',
        staging: 'target/staging',
        root: '.'
      }
    },

    usemin: {
      html: 'target/dist/index.html'
    },

    filerev: {
      js: {
        src: ['target/dist/*.js', 'target/dist/*.css']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('server', [
    'copy:server',
    'browserify:server',
    'sass:dist',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy:dist',
    'browserify:dist',
    'sass:dist',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin'
  ]);
};
