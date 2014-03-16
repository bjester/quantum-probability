/**
 * Quantum State
 */
(function()
{
  var global = this,
      nspace = global,
      Particle = global.Particle.Base,
      math = global.mathjs();
  
  /**
   * 
   * @type State
   */
  var State = nspace.State = function(particles)
  {
    this.fill(particles);
  };
  
  /**
   * Spin Half Eigenvectors
   */
  State.SPIN_HALF = 
  {
    Z_UP: math.matrix([[1], [0]]),
    Z_DOWN: math.matrix([[0], [1]]),
    
    X_UP: math.multiply(math.SQRT1_2, [[1], [1]]),
    X_DOWN: math.multiply(math.SQRT1_2, [[1], [-1]]),
    
    Y_UP: math.multiply(math.SQRT1_2, [[1], [math.i]]),
    Y_DOWN: math.multiply(math.SQRT1_2, [[1], [math.multiply(-1, math.i)]])
  };
  
  State.SPIN_UP = 'up';
  State.SPIN_0 = '0';
  State.SPIN_DOWN = 'down';
  
  State.SPIN_Z = 'z';
  State.SPIN_X = 'x';
  State.SPIN_Y = 'y';
  
  State.SPINS = {};
  State.SPINS[Particle.SPIN_HALF] = State.SPIN_HALF;
  
  /**
   * Generates subset of spin eigenvectors based on orientation
   * 
   * @param {State.SPIN_X,Y,Z} orient
   * @param {State.SPIN_HALF} spins
   * @returns {Object}
   */
  State.subset = function(orient, spins, toObject)
  {
    var regex = new RegExp('^' + orient.toUpperCase() + '_.*', 'i'),
        subset = toObject ? {} : [];
    
    for (var k in spins)
    {
      if (!regex.test(k))
      {
        continue;
      }
      
      if (toObject)
      {
        subset[k] = spins[k];
      }
      else
      {
        subset.push(spins[k]);
      }
    }
    
    return subset;
  };
  
  /**
   * Prototype of state
   */
  State.prototype = 
  {
    particles: null,
    multiplicity: null,
    orientation: null,
    vector: null,
    
    /**
     * 
     * @param {Array} particles
     * @returns {State}
     */
    fill: function(particles)
    {
      if (!particles || ('length' in particles && particles.length === 0))
      {
        return;
      }
      
      this.multiplicity = (2 * particles[0].getSpin()) + 1;
      
      var basis = State.subset(this.getOrientation(), particles[0].getSpin(), 
        false);
      this.vector = new Vector(basis);
      
      return this;
    },
     
    /**
     * 
     * @param {State.SPIN_*} orient
     * @returns {State}
     */
    setOrientation: function(orient)
    {
      this.orientation = orient;
      return this;
    },
    
    /**
     * 
     * @returns {State.SPIN_X,Y,Z}
     */
    getOrientation: function()
    {
      return this.orientation;
    }
  };
  
})();
