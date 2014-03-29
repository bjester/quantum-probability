/**
 * Stern Gerlach analyzer
 */
(function()
{
  var global = this,
      nspace = global.Device,
      Device = nspace.Device,
      System = global.System,
      math = global.mathjs(),
      Util = global.Util;
  
  /**
   * 
   * @type Analyzer
   */
  var Analyzer = nspace.Analyzer = function(direction)
  {
    this.__construct(direction);
  };

  Analyzer.prototype = new Device();
  
  /**
   * 
   * @param {State} state
   * @returns {State[]}
   */
  Analyzer.prototype.evaluate = function(state)
  {
    var basis = this.vector.getBasis(),
        particles = state.getParticles(),
        probabilities = new Array(),
        bases = new Array();

    // Calculate probabilities
    for (var i = 0; i < basis.length; i++)
    {
      var basisVector = this.vector.getBasisVector(i);

      probabilities.push(math.square(
        Util.Vector.innerProduct(basisVector, state.getVector())));
      bases.push(basisVector);
    }

    var sortedParticles = Device.sortParticlesByProbability(particles,
      probabilities);

    return Device.generateStates(sortedParticles, bases);
  };
  
})();
