/**
 * Magnetic Field "analyzer", this isn't so much an analyzer as it is 
 * a state modifier. For purposes of programming, it is sufficient definition.
 */
(function()
{
  var global = this,
      nspace = global.Analyzer,
      Analyzer = nspace.Base;
  
  /**
   * 
   * @type MagneticField
   */
  var MagneticField = nspace.MagneticField = function(direction)
  {
  };
  
  MagneticField.prototype = new Analyzer();
  
})();
