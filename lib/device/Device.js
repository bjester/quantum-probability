/**
 * Base Device class
 */
(function()
{
  var global = this,
      nspace = global.Device,
      State = global.State,
      math = global.mathjs(),
      Util = global.Util,
      Exception = global.Exception;

  /**
   * 
   * @type Device
   */
  var Device = nspace.Device = function(){};

  /**
   * Sorts particles given an array of probabilities, all less than 1
   *
   * @param {Particle[]} particles
   * @param {Number[]}  probability
   * @return {Particle[][]}
   */
  Device.sortParticlesByProbability = function(particles, probability)
  {
    var sum = 0,
        result = Util.array2D(probability.length);

    probability = probability.map(function(val)
    {
      sum += val;
      return sum;
    });

    // Go through particles and decide in which spin they will go
    while (particles.length)
    {
      var rand = math.random();

      for (var j = 0; j < probability.length; j++)
      {
        if (rand < probability[j])
        {
          result[j].push(particles.pop());
          break;
        }
      }
    }

    return result;
  };

  /**
   * Joins an array of particles and bases to create State objects
   *
   * @param {Particle[][]} particles
   * @param {Vector[]}  bases
   * @return {State[]}
   */
  Device.generateStates = function(particles, bases)
  {
    if (particles.length !== bases.length)
    {
      throw new Exception.InvalidPreparation(
        'Particle array and bases array must be same length');
    }

    var states = new Array();

    while (particles.length)
    {
      // shift each off the front to maintain order
      states.push(new global.State(particles.shift(), bases.shift()));
    }

    return states;
  };

  Device.prototype =
  {
    output: null,
    
    /**
     * 
     * @param {Util.Vector} vector
     */
    __construct: function(vector)
    {
      this.vector = vector.normalize();
    },
    
    /**
     * 
     * @param {State} state
     * @returns {State[]}
     */
    evaluate: function(state)
    {
      return [];
    }
  };
  
})();
