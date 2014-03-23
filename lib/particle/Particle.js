/**
 * Particle
 */
(function()
{
  var nspace = this.Particle;
  
  /**
   * 
   * @type Particle
   */
  var Particle = nspace.Particle = function(spin, energy)
  {
    this.spin = spin;
    this.energy = energy;
  };
  
  Particle.SPIN_HALF = 0.5;
  Particle.SPIN_ONE = 1;
  
  Particle.prototype = {
    spin: null,
    mass: null,
    restEnergy: null,
    charge: null,
    energy: null,
    
    /**
     *
     * @param {Number} energy
     * @return {Particle}
     */
    setEnergy: function(energy)
    {
      this.energy = energy;
      return this;
    },
      
    /**
     * @returns {Number}
     */
    getMass: function() { return this.mass; },

    /**
     * @returns {Number} eV
     */
    getRestEnergy: function() { return this.restEnergy; },

    /**
     * @returns {Number} eV
     */
    getCharge: function() { return this.charge; },

    /**
     * @returns {Number}
     */
    getSpin: function() { return this.spin; }
  };
  
})();
