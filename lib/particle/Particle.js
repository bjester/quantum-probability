/**
 * Particle
 */
(function()
{
  var nspace = this.Particle = {};
  
  /**
   * 
   * @type Particle
   */
  var Particle = nspace.Base = function(spin, energy)
  {
    this.spin = spin;
    this.energy = energy;
  };
  
  Particle.SPIN_HALF = 0.5;
  Particle.SPIN_ONE = 1;
  
  Particle.prototype = {
    spin: null,
    mass: null,
    energy: null,
  
    /**
     * @returns {Number}
     */
    getMass: function() { return this.mass; },
    
    /**
     * @returns {Number} eV
     */  
    getEnergy: function() { return this.energy; },
      
    /**
     * @returns {Number}
     */
    getSpin: function() { return this.spin; }
  };
  
})();
