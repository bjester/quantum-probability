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
    System().setParticle(Particle.Electron);
    
    it('should produce an absolute result', function()
    {
      // State in Z
      var state = getState();
         
      var results = getAnalyzer().analyze(state);
      assert.equal(1000, results[0].getParticles().length);
    });
    
    it('should produce a 50-50 probability result', function()
    {
      // State in up Z
      var state = getState();
      state.getVector().setComponent(1,0).normalize();
      
      // Its possible for this to fail, since its base off of probabilities
      // but most of the time it should be around a 500 500 split
      var results = getAnalyzer().analyze(state);
      assert.equal(true, 
        test.withinRange(500, results[0].getParticles().length, 50));
      assert.equal(1000,
        results[0].getParticles().length + results[1].getParticles().length);
    });
  });
  
});
