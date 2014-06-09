var assert = require('assert'),
    math = require('mathjs')(),
    test = require('../bootstrap.js');

describe('Device.MagneticField', function()
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
      particles.push(new Particle.Electron(1000));
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
    
    it('should actually run', function()
    {
      // State in Z
      var state = getState();
      var field = new Device.MagneticField('Z', 1000, 1000);
         
      var results = getAnalyzer().evaluate(field.evaluate(state));
      assert.equal(true,
        test.withinRange(500, results[0].getParticles().length, 50));
    });
  });

});
