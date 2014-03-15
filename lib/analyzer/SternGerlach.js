/**
 * Stern Gerlach analyzer
 */
(function()
{
  var global = this,
      nspace = global.Analyzer,
      Analyzer = nspace.Base;
  
  /**
   * 
   * @type SternGerlach
   */
  var SternGerlach = nspace.SternGerlach = function(direction)
  {
  };
  
  SternGerlach.prototype = new Analyzer();
  
})();
