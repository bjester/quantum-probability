// Gruntfile
var fs = require('fs'),
    path = require('path');
    
require('./lib/Util.js');
var Util = global.Util;

var DEPLOY = 'deploy';
var DEPLOY_JS = DEPLOY + '/js';
var DEPLOY_CSS = DEPLOY + '/css';

module.exports = function(grunt)
{
  var src = 
  [
    // Base
    'lib/bootstrap.js',
    'lib/Constants.js',
    'lib/Util.js',
    'lib/exception/Exception.js',
    'lib/particle/Particle.js',
    'lib/device/Device.js',

    // Dependee's
    'lib/util/Logger.js',
    'lib/util/Vector.js',
    'lib/exception/InvalidPreparation.js',
    'lib/exception/InvalidProperty.js',
    'lib/particle/Electron.js',
    'lib/particle/Neutron.js',
    'lib/particle/Proton.js',
    'lib/device/Analyzer.js',
    'lib/device/MagneticField.js',

    // Core (final)
    'lib/Chain.js',
    'lib/State.js',
    'lib/System.js',
    
    // UI
    'lib/interface/device/Device.js',
    'lib/interface/Interface.js'
  ];
  
  var depends = 
  [
    'vendor/mathjs/dist/math.min.js',
    'vendor/mathjs/dist/math.map',
    'vendor/dat-gui/build/dat.gui.min.js',
    'vendor/stats/build/stats.min.js',
    'vendor/ocanvas/build/ocanvas-2.7.1.min.js',
    'vendor/transition/build/transition.min.js',
    'vendor/jquery/dist/jquery.min.js'
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
        src: src,
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
    
    clean: 
    {
      deploy: [ DEPLOY ],
      bootstrap: ['lib/bootstrap.js']
    },
    
    shell: 
    {
      init: 
      {
        options: 
        {
          stdout: true
        },
        command: function()
        {
          return [
            'git submodule init',
            'git submodule update',
            'echo "Need sudo commad to install with npm"',
            'sudo npm install',
            'cd vendor/mathjs',
            'npm install',
            'npm run build',
            'cd ../ocanvas/build',
            'node build.js',
            'cd ../../../',
          ].join(' && ');
        }
      },
      
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
      },
      font:
      {
        files: 
        [
          {src: 'vendor/fontello/css/fontello.css', dest: DEPLOY_CSS + '/fontello.css'},
          {expand: true, cwd: 'vendor/fontello/', src: ['font/**'], dest: DEPLOY}
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
   * @param {String} str
   * @return {String}
   */
  function ucfirst(str)
  {
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
  }
  
  /**
   * Generates bootstrap JSON
   */
  grunt.registerTask('bootstrapGenerate', function()
  {
    var output = {},
        bootstrapSrc = src.map(function(p)
        {
          return p.split('/').slice(1);
        });
        
    for (var i = 0; i < bootstrapSrc.length; i++)
    {
      var paths = bootstrapSrc[i],
          merge = {},
          current = merge;
      
      for (var j = 0; j < paths.length; j++)
      {
        var key = ucfirst(path.basename(paths[j], '.js'));
        
        current[key] = {};
        current = current[key];
      }
      
      Util.extend(output, merge, false, true);
    }
    
    var bootstrap = fs.readFileSync('bootstrap.js.tmpl', {encoding: 'utf8'});
    bootstrap = bootstrap.replace('%spaces%', JSON.stringify(output));
    fs.writeFileSync('lib/bootstrap.js', bootstrap);
  });
  
  /**
   * Injects resources into 
   */
  grunt.registerTask('resourceInject', function()
  {
    var dependsBase = depends.map(path.basename),
        t = '\n  ';
    
    var scripts = fs.readdirSync(DEPLOY_JS)
      .filter(function(file)
      {
        return dependsBase.indexOf(file) < 0 && /ma?in/.test(file);
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
  grunt.registerTask('default', 
    ['bootstrapGenerate', 'uglify:build', 'uglify:minify', 'clean:bootstrap']);
  grunt.registerTask('build', ['shell:buildDependencies']);
  grunt.registerTask('test', 
    ['bootstrapGenerate', 'uglify:build', 'mochaTest', 'clean:bootstrap']);
  grunt.registerTask('undeploy', ['clean']);
  grunt.registerTask('bootstrap', ['bootstrapGenerate']);
  grunt.registerTask('deploy', 
  [
    'clean', 
    //'shell:buildDependencies', 
    'bootstrapGenerate',
    'uglify:build', 
    'uglify:minify', 
    'copy',
    'resourceInject',
    'clean:bootstrap'
  ]);
};
