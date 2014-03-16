// Gruntfile
var fs = require('fs'),
    path = require('path');
  
var DEPLOY = 'deploy';
var DEPLOY_JS = DEPLOY + '/js';
var DEPLOY_CSS = DEPLOY + '/css';

module.exports = function(grunt)
{
  var depends = 
  [
    'vendor/mathjs/dist/math.min.js',
    'vendor/dat-gui/build/dat.gui.min.js',
    'vendor/stats/build/stats.min.js'
  ];
  
  var copyDepends = [];
  
  for (var i = 0; i < depends.length; i++)
  {
    copyDepends.push(
    {
      expand: true,
      cwd: path.dirname(depends[i]) + '/',
      src: [path.basename(depends[i])],
      dest: DEPLOY_JS
    });
  }
  
  
  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
    uglify: 
    {
      options: 
      {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: 
      {
        src: 
        [
          // Base
          'lib/Util.js',
          'lib/exception/Exception.js',
          'lib/particle/Particle.js',
          'lib/analyzer/Analyzer.js',
          
          // Dependee's
          'lib/util/Logger.js',
          'lib/exception/InvalidPreparation.js',
          'lib/particle/Electron.js',
          'lib/particle/Neutron.js',
          'lib/particle/Proton.js',
          'lib/analyzer/SternGerlach.js',
          'lib/analyzer/MagneticField.js',
          
          // Core (final)
          'lib/State.js',
          'lib/System.js'
        ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    
    clean: [
      DEPLOY
    ],
    
    shell: {
      buildDependencies: 
      {
        options: 
        {
          stdout: true
        },
        command: function()
        {
          return 'cd vendor/mathjs && npm run build && cd ../../';
        }
      }
    },
    
    copy:
    {
      build:
      {
        files: 
        [
          {
            expand: true, 
            cwd: 'build/', 
            src: ['**'], 
            dest: DEPLOY_JS
          }
        ]
      },
      dependencies:
      {
        files: copyDepends
      },
      src:
      {
        files: 
        [
          {expand: true, cwd: 'src/', src: ['**'], dest: DEPLOY}
        ]
      }
    }
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('build', ['shell:buildDependencies']);
  grunt.registerTask('undeploy', ['clean']);
  grunt.registerTask('deploy', 
  [
    'clean', 
    'shell:buildDependencies', 
    'uglify', 
    'copy'
  ]);
};
