/**
 * Quantum State
 */
(function()
{
  var global = this,
      nspace = global,
      Particle = global.Particle.Particle,
      Util = global.Util,
      math = global.mathjs(),
      System = global.System;
  
  /**
   * 
   * @type State
   */
  var State = nspace.State = function(particles, vector)
  {
    this.particles = new Array();
    this.fill(particles, vector);
  };
  
  /**
   * Spin Half Eigenvectors
   */
  State.SPIN_HALF = 
  {
    Z: [ 
      math.matrix([[1], [0]]),  
      math.matrix([[0], [1]]) 
    ],

    X: [ 
      math.matrix([[1], [1]]),  
      math.matrix([[1], [-1]]) 
    ],
    
    Y: [ 
      math.matrix([[1], [math.i]]),  
      math.matrix([[1], [math.multiply(-1, math.i)]]) 
    ]
  };
  
  State.SPIN_UP = 'up';
  State.SPIN_0 = '0';
  State.SPIN_DOWN = 'down';
  
  State.SPIN_Z = 'Z';
  State.SPIN_X = 'X';
  State.SPIN_Y = 'Y';
  
  State.SPINS = {};
  State.SPINS[Particle.SPIN_HALF] = State.SPIN_HALF;
  
  /**
   * Returns the state vector for certain spin and orientation (X,Y,Z)
   *
   * @param {String} orient State.SPIN_*
   * @param {Number[]} components
   * @returns {Util.Vector} Vector is normalized
   */
  State.getStateVector = function(orient, components)
  {
    var spin = global.System().getSpin(),
        v = new Util.Vector(State.SPINS[spin][orient]);
    v.setComponents(components);
    v.normalize();
    
    return v;
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
     * @param {Util.Vector} vector
     * @returns {State}
     */
    fill: function(particles, vector)
    {
      if (!particles || ('length' in particles && particles.length === 0))
      {
        return this;
      }
      
      this.particles = particles;
      this.vector = vector.normalize();
      
      return this;
    },
    
    /**
     * 
     * @param {Util.Vector} vector
     * @returns {State}
     */
    setVector: function(vector)
    {
      this.vector = vector;
      return this;
    },
    
    /**
     * 
     * @returns {Util.Vector}
     */
    getVector: function()
    {
      return this.vector;
    },
    
    /**
     * 
     * @returns {Particle[]}
     */
    getParticles: function()
    {
      return this.particles;
    }
  };
  
})();
