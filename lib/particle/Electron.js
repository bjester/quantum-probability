/**
 * Electron
 */
(function()
{
  var global = this,
      nspace = global.Particle,
      Particle = nspace.Base;
  
  /**
   * 
   * @type Electron
   */
  var Electron = nspace.Electron = function(energy)
  {
    this.energy = energy;
  };
  
  Electron.MASS = 9.10938291e-31; // kg
  Electron.CHARGE = -1.602176565e-19; // C
  Electron.REST_ENERGY = 510998.928; // eV
  
  Electron.prototype = new Particle(Particle.SPIN_HALF);
  Electron.prototype.mass = Electron.MASS;
  
})();
