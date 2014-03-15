/**
 * Proton
 */
(function()
{
  var global = this,
      Particle = global.Particle;
  
  /**
   * 
   * @type Proton
   */
  var Proton = global.Proton = function(){};
  
  Proton.MASS = 1.672621777 * Math.pow(10, -27); // kg
  Proton.CHARGE = 1.602176565 * Math.pow(10, -19); // C
  Proton.REST_ENERGY = 938272046; // eV
  
  Proton.prototype = new Particle(Particle.SPIN_HALF);
  
})();
