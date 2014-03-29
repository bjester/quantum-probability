/**
 * System Class: describes the system, what particle, analyzers, etc are 
 * currently used in the system
 */
(function()
{
  var global = this,
      State = global.State,
      Particle = global.Particle,
      Exception = global.Exception,
      Util = global.Util,
      Device = global.Device;
  
  /* System single instance */
  var instance = null;
  
  /**
   * 
   * @type System
   * @param {Function.Particle} particle The class of particles the system will use
   */
  var System = this.System = function()
  {
    if (instance)
    {
      return instance;
    }
    
    return instance = new System.prototype.__construct();
  };
  
  /**
   * Resets singleton instance
   */
  System.reset = function()
  {
    instance = null;
  };
  
  System.prototype = 
  {
    particle: null,
    queue: null,
    initialStateVector: null,
    
    /**
     * 
     */
    __construct: function()
    {
      this.queue = new Array();
    },
    
    /**
     * 
     * @param {Chain} chain
     * @returns {System}
     */
    run: function(chain)
    {
      var vector = this.getInitialStateVector();
      
      if (!(vector instanceof Util.Vector))
      {
        throw new Exception.InvalidPreparation(
          'Initial state vector must be of type \'Util.Vector\'');
      }
      
      var particles = this.queue;
      this.queue = new Array();
      
      this._run(chain, new State(particles, vector));
    },
    
    /**
     * 
     * @param {Chain} chain
     * @param {State} state
     * @returns {undefined}
     */
    _run: function(chain, state)
    {
      var me = this,
          results = chain.getDevice().analyze(state);
      
      chain.map(function(nextChain, i)
      {
        var nextState = results[i];
        me._run(nextChain, nextState);
      });
    },
    
    /**
     * Instantiates a new particle
     * 
     * @returns {Particle}
     */
    newParticle: function(energy)
    {
      var particle = new this.particle();
      
      if (!(particle instanceof Particle.Particle))
      {
        throw new Exception.InvalidPreparation(
          'Particle must be of type \'Particle.Particle\'');
      }
      
      particle.setEnergy(energy);
      return particle;
    },
    
    /**
     * 
     * @returns {System}
     */
    addParticle: function(num, energy)
    {
      var add = new Array(),
          me = this;
        
      add.length = num || 1;
      add.map(function()
      {
        return me.newParticle(energy);
      });
      
      this.queue.push.call(this.queue, add);
      return this;
    },
    
    /**
     * 
     * @returns {Number} Particle.SPIN_*
     */
    getSpin: function()
    {
      return this.newParticle().getSpin();
    },
    
    /**
     * 
     * @param {Util.Vector} state
     * @returns {System}
     */
    setInitialStateVector: function(vector)
    {
      this.initialStateVector = vector;
      return this;
    },
      
    /**
     * 
     * @returns {Util.Vector}
     */
    getInitialStateVector: function()
    {
      return this.initialStateVector;
    },
    
    /**
     * 
     * @param {Particle.prototype} particle
     * @returns {System}
     */
    setParticle: function(particle)
    {
      this.particle = particle;
      return this;
    },
      
    /**
     * 
     * @returns {Particle.prototype}
     */
    getParticle: function()
    {
      return this.particle;
    }
  };
  
  System.prototype.__construct.prototype = System.prototype;
  
})();
