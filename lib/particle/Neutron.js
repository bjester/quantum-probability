/**
 * Neutron
 */
(function()
{
  var global = this,
      nspace = global.Particle,
      Particle = nspace.Particle;
  
  /**
   * 
   * @type Neutron
   */
  var Neutron = nspace.Neutron = function(energy)
  {
    this.energy = energy;
  };
  
  Neutron.MASS = 1.674927351e-27; // kg
  Neutron.CHARGE = 0; // C
  Neutron.REST_ENERGY = 939565378; // eV
  
  Neutron.prototype = new Particle(Particle.SPIN_HALF);
  Neutron.prototype.mass = Neutron.mass;
  Neutron.prototype.charge = Neutron.CHARGE;
  Neutron.prototype.restEnergy = Neutron.REST_ENERGY;
  
})();
