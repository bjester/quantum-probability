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
  var Particle = nspace.Base = function(spin, mass)
  {
    this.spin = spin;
    this.mass = mass;
  };
  
  Particle.SPIN_HALF = 0.5;
  Particle.SPIN_ONE = 1;
  
  Particle.prototype = {
    spin: null,
    mass: null
  };
  
})();
