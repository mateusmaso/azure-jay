module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner:
        '// <%= pkg.name %>\n' +
        '// ------------------\n' +
        '// v<%= pkg.version %>\n' +
        '//\n' +
        '// Copyright (c) <%= grunt.template.today("yyyy") %> Mateus Maso\n' +
        '// Distributed under MIT license\n' +
        '//\n' +
        '// <%= pkg.repository.url %>\n' +
        '\n'
    },
    browserify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        options: {
          transform: [
             ["babelify", {
                presets: ['es2015']
             }]
          ]
        },
        files: {
          'dist/<%= pkg.name %>.js': ['src/**/*.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          mocha: require('mocha')
        },
        src: ['spec/index.js']
      }
    },
    mocha_phantomjs: {
      options: {
        reporter: 'spec'
      },
      all: ['spec/index.html']
    },
    clean: ['dist']
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('default', ['browserify', 'uglify', 'mochaTest', 'mocha_phantomjs']);
};
