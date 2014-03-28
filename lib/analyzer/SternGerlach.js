/**
 * Stern Gerlach analyzer
 */
(function()
{
  var global = this,
      nspace = global.Analyzer,
      Analyzer = nspace.Analyzer,
      System = global.System,
      math = global.mathjs(),
      Util = global.Util;
  
  /**
   * 
   * @type SternGerlach
   */
  var SternGerlach = nspace.SternGerlach = function(direction)
  {
    this.__construct(direction);
  };
  
  SternGerlach.prototype = new Analyzer();
  
  /**
   * 
   * @param {State} state
   * @returns {State[]}
   */
  SternGerlach.prototype.analyze = function(state)
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

    var sortedParticles = Analyzer.sortParticlesByProbability(particles,
      probabilities);

    return Analyzer.generateStates(sortedParticles, bases);
  };
  
})();
