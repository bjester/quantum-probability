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
        result = new Array();
      
    // Calculate probabilites
    for (var i = 0; i < basis.length; i++)
    {
      var basisVector = this.vector.getBasisVector(i);
       
      probabilities.push(math.square(
        Util.Vector.innerProduct(basisVector, state.getVector())));
      result.push([new Array(), basisVector]);
    }
    
    var sum = 0;
    probabilities = probabilities.sort().reverse().map(function(val)
    {
      sum += val;
      return sum;
    });
    
    // Go through particles and decide in which spin they will go
    for (var i = 0; i < particles.length; i++)
    {
      var rand = math.random();
      
      for (var j = 0; j < probabilities.length; j++)
      {
        if (rand < probabilities[j])
        {
          break;
        }
      }

      result[j][0].push(particles[i]);
    }
    
    // Map result to return an array of State objects
    return result.map(function(val)
    {
      return new State(val[0], val[1]);
    });
  };
  
})();
