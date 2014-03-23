var assert = require('assert'),
    //expect = require('expect'),
    math = require('mathjs')(),
    test = require('../bootstrap.js');

describe('Analyzer.SternGerlach', function()
{
  /**
   * @param {Number} num
   * @returns {Array}
   */
  var getParticle = function(num)
  {
    var particles = new Array();
    
    for (var i = 0; i < num; i++)
    {
      particles.push(new Particle.Electron());
    }
    
    return particles;
  };
  
  /**
   * @returns {State}
   */
  var getState = function()
  {
    return new State(getParticle(1000), new Util.Vector(State.SPIN_HALF.Z));
  };
  
  /**
   * @returns {Analyzer.SternGerlach}
   */
  var getAnalyzer = function()
  {
    var v = new Util.Vector(State.SPIN_HALF.X);
    return new Analyzer.SternGerlach(v);
  };
  
  describe('analyze', function()
  {
    it('should produce the normal 50-50 results', function()
    {
      // State in Z
      var state = getState();
      System().setParticle(Particle.Electron);
         
      var results = getAnalyzer().analyze(state);
      assert.equal(1000, results[0].getParticles().length);
    });
  });
  
});
