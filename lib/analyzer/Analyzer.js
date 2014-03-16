/**
 * Base Analyzer class 
 */
(function()
{
  var global = this,
      nspace = global.Analyzer = {};
  
  /**
   * 
   * @type Analyzer
   */
  var Analyzer = nspace.Base = function()
  {
    this.output = new Array();
  };
  
  Analyzer.prototype = 
  {
    output: null,
      
    /**
     * @returns {Analyzer}
     */
    setOutput: function()
    {
      this.output = (new Array()).concat(arguments);
      return this;
    }
  };
  
})();
