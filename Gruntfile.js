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
    'vendor/mathjs/dist/math.map',
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
      build: 
      {
        options: 
        {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          mangle: false,
          compress: false,
          beautify: true
        },
        src: 
        [
          // Base
          'lib/Util.js',
          'lib/exception/Exception.js',
          'lib/particle/Particle.js',
          'lib/analyzer/Analyzer.js',
          
          // Dependee's
          'lib/util/Logger.js',
          'lib/util/Vector.js',
          'lib/exception/InvalidPreparation.js',
          'lib/exception/InvalidProperty.js',
          'lib/particle/Electron.js',
          'lib/particle/Neutron.js',
          'lib/particle/Proton.js',
          'lib/analyzer/SternGerlach.js',
          'lib/analyzer/MagneticField.js',
          
          // Core (final)
          'lib/State.js',
          'lib/System.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      },
      
      minify:
      {
        options: 
        {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files:
        {
          'build/<%= pkg.name %>.min.js': 'build/<%= pkg.name %>.js'
        }
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
    },
    
    // Testing
    mochaTest: 
    {
      test: 
      {
        options: 
        {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });
  
  /**
   * @param {String} file
   * @return {String}
   */
  function getScript(file)
  {
    return [
      '<script type="text/javascript" src="/js/',
      file,
      '"></script>'
    ].join('');
  }
  
  /**
   * @param {String} file
   * @return {String}
   */
  function getLink(file)
  {
    return [
      '<link type="text/css" rel="stylesheet" href="/css/',
      file,
      '" />'
    ].join('');
  }
  
  /**
   * 
   */
  grunt.registerTask('resourceInject', function()
  {
    var dependsBase = depends.map(path.basename),
        t = '\n  ';
    
    var scripts = fs.readdirSync(DEPLOY_JS)
      .filter(function(file)
      {
        return dependsBase.indexOf(file) < 0;
      })
      .concat(dependsBase)
      .filter(function(file)
      {
        return path.extname(file) === '.js';
      })
      .map(getScript).reverse();
    
    var stylesheets = fs.readdirSync(DEPLOY_CSS).map(getLink);
    var index = DEPLOY + '/index.html';
    var data = fs.readFileSync(index, {encoding: 'utf8'});
    
    data = data.replace('</head>', t + '  ' + stylesheets.join(t + '  ') + t + '</head>')
               .replace('</body>', t + '  ' + scripts.join(t + '  ') + t + '</body>');

    fs.writeFileSync(index, data);
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['uglify:build', 'uglify:minify']);
  grunt.registerTask('build', ['shell:buildDependencies']);
  grunt.registerTask('test', ['uglify:build', 'mochaTest']);
  grunt.registerTask('undeploy', ['clean']);
  grunt.registerTask('deploy', 
  [
    'clean', 
    //'shell:buildDependencies', 
    'uglify:build', 
    'uglify:minify', 
    'copy',
    'resourceInject'
  ]);
};
