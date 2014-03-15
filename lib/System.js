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
      Analyzer = global.Analyzer;
  
  /**
   * 
   * @type System
   * @param {Function.Particle} particle The class of particles the system will use
   */
  var System = this.System = function(particle)
  {
    this.particle = particle;
    this.analyzers = new Array();
    this.initialState = null;
  };
  
  System.prototype = {
    particle: null,
    analyzers: null,
    
    /**
     * 
     * @returns {undefined}
     */
    run: function()
    {
      if (!(this.initialState instanceof State))
      {
        throw new Exception.InvalidPreparation('Initial state must be of type \'State\'');
      }
    },
    
    /**
     * 
     * @param {State} state
     * @returns {System}
     */
    setInitialState: function(state)
    {
      this.initialState = state;
      return this;
    },
    
    /**
     * 
     * @param {Analyzer} analyzer
     * @returns {System}
     */
    addAnalyzer: function(analyzer)
    {
      if (!(analyzer instanceof Analyzer.Base))
      {
        throw new Exception.InvalidPreparation('Analyzer must be of type \'Analyzer.Base\'');
      }
      
      this.analyzers.push(analyzer);
      return this;
    },
    
    /**
     * Instantiates a new particle
     * 
     * @returns {Particle}
     */
    newParticle: function()
    {
      var particle = new this.particle();
      
      if (!(particle instanceof Particle.Base))
      {
        throw new Exception.InvalidPreparation('Particle must be of type \'Particle.Base\'');
      }
      
      return particle;
    }
  };
  
})();
