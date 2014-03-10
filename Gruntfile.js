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
          'lib/particle.js',
          'lib/electron.js',
          'lib/proton.js',
          'lib/neutron.js'
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
