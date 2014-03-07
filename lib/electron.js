/**
 * Electron
 */
(function()
{
  var global = this,
      Particle = global.Particle;
  
  /**
   * 
   * @type Electron
   */
  var Electron = global.Electron = function(){};
  
  Electron.MASS = 9.10938291 * Math.pow(10, -31); // kg
  Electron.CHARGE = -1.602176565 * Math.pow(10, -19); // C
  Electron.REST_ENERGY = 510998.928; // eV
  
  Electron.prototype = new Particle(Particle.SPIN_HALF);
  
})();
