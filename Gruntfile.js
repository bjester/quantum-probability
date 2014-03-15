// Gruntfile
var fs = require('fs');

module.exports = function(grunt)
{
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
      'deploy/'
    ],
    
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
            dest: 'deploy/js/' 
//            filter: '*.js'
          }
        ]
      },
      src:
      {
        files: 
        [
          {expand: true, cwd: 'src/', src: ['**'], dest: 'deploy/'}
        ]
      }
    }
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('undeploy', ['clean']);
  grunt.registerTask('deploy', ['clean', 'uglify', 'copy']);
};
