/**
 * Particle
 */
(function()
{
  /**
   * 
   * @type Particle
   */
  var Particle = this.Particle = function(spin, mass)
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
