var assert = require('assert'),
    math = require('mathjs')(),
    test = require('../bootstrap.js');

describe('Device.Analyzer', function()
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
  var getState = function(orient)
  {
    orient = orient || State.EIGEN_VECTORS.SPIN_HALF.Z;
    return new State(getParticle(1000), new Util.Vector(orient));
  };
  
  /**
   * @returns {Device.Analyzer}
   */
  var getAnalyzer = function(orient)
  {
    orient = orient || State.EIGEN_VECTORS.SPIN_HALF.X;
    var v = new Util.Vector(orient);
    return new Device.Analyzer(v);
  };
  
  describe('analyze', function()
  {
    System().setParticle(Particle.Electron);
    
    it('should produce an absolute result', function()
    {
      // State in Z
      var state = getState();
         
      var results = getAnalyzer().evaluate(state);
      assert.equal(1000, results[0].getParticles().length);
    });
    
    it('should produce a 50-50 probability result', function()
    {
      // State in up Z
      var state = getState();
      state.getVector().setComponent(1,0).normalize();
      
      // Its possible for this to fail, since its base off of probabilities
      // but most of the time it should be around a 500 500 split
      var results = getAnalyzer().evaluate(state);
      assert.equal(true, 
        test.withinRange(500, results[0].getParticles().length, 50));
      assert.equal(1000,
        results[0].getParticles().length + results[1].getParticles().length);
    });

    it('should verify results from a first device', function()
    {
      // State in up Z
      var state = getState();
      state.getVector().setComponent(1,0).normalize();

      // Generate a 50-50
      var firstResult = getAnalyzer().evaluate(state);

      var upResult = getAnalyzer().evaluate(firstResult[0]);
      var downResult = getAnalyzer().evaluate(firstResult[1]);

      assert.equal(1000, upResult[0].getParticles().length
        + downResult[1].getParticles().length);
    });

    // Spin 1 type test, also makes sure that probabilities are in order
    it('should result in the correct probabilities', function()
    {
      // State in up Z
      var basis = State.EIGEN_VECTORS.SPIN_ONE.Z;
      var comps = [1, math.sqrt(3), math.sqrt(6)];

      var analyzer = new Device.Analyzer(new Util.Vector(basis));
      var state = new State(getParticle(10000), new Util.Vector(basis));
      state
        .getVector()
        .setComponents(comps)
        .normalize();

      var results = analyzer.evaluate(state), counts = [];

      for (var i = 0; i < results.length; i++)
      {
        var num = comps[i] * comps[i] * 1000,
            count = results[i].getParticles().length;

        assert.equal(true, test.withinRange(num, count, 100));
      }
    });
  });

});
