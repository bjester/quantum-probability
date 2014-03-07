/**
 * Neutron
 */
(function()
{
  var global = this,
      Particle = global.Particle;
  
  /**
   * 
   * @type Neutron
   */
  var Neutron = global.Neutron = function(){};
  
  Neutron.MASS = 1.674927351 * Math.pow(10, -27); // kg
  Neutron.CHARGE = 0; // C
  Neutron.REST_ENERGY = 939565378; // eV
  
  Neutron.prototype = new Particle(Particle.SPIN_HALF);
  
})();
