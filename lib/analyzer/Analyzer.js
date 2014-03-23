/**
 * Base Analyzer class 
 */
(function()
{
  var global = this,
      nspace = global.Analyzer,
      State = global.State;

  /**
   * 
   * @type Analyzer
   */
  var Analyzer = nspace.Analyzer = function(){};
  
  Analyzer.prototype = 
  {
    output: null,
    
    /**
     * 
     * @param {Number} orient
     */
    __construct: function(vector)
    {
      this.vector = vector;
    },
    
    /**
     * 
     * @param {State} state
     * @returns {State[]}
     */
    analyze: function(state) 
    {
      return [];
    }
  };
  
})();
