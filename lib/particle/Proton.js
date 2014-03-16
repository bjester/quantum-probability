/**
 * Proton
 */
(function()
{
  var global = this,
      nspace = global.Particle,
      Particle = nspace.Base;
  
  /**
   * 
   * @type Proton
   */
  var Proton = nspace.Proton = function(energy)
  {
    this.energy = energy;
  };
  
  Proton.MASS = 1.672621777 * Math.pow(10, -27); // kg
  Proton.CHARGE = 1.602176565 * Math.pow(10, -19); // C
  Proton.REST_ENERGY = 938272046; // eV
  
  Proton.prototype = new Particle(Particle.SPIN_HALF);
  Proton.prototype.mass = Proton.MASS;
  
})();
