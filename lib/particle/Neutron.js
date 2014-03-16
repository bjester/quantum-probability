/**
 * Neutron
 */
(function()
{
  var global = this,
      nspace = global.Particle,
      Particle = nspace.Base;
  
  /**
   * 
   * @type Neutron
   */
  var Neutron = nspace.Neutron = function(energy)
  {
    this.energy = energy;
  };
  
  Neutron.MASS = 1.674927351 * Math.pow(10, -27); // kg
  Neutron.CHARGE = 0; // C
  Neutron.REST_ENERGY = 939565378; // eV
  
  Neutron.prototype = new Particle(Particle.SPIN_HALF);
  Neutron.prototype.mass = Neutron.mass;
  
})();
