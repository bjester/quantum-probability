/**
 * Analyzer Chain, handles the relationships between analyzers
 */
(function()
{
  var global = this,
      nspace = global;
  
  /**
   * 
   * @type Chain
   */
  var Chain = nspace.Chain = function(analyzer)
  {
    this.analyzer = analyzer;
    this.chains = new Array();
  };
  
  Chain.prototype = 
  {
    analyzer: null,
    chains: null,
    
    /**
     * 
     * @returns {undefined}
     */
    addChain: function(chain)
    {
      this.chains.push(chain);
      return this;
    },
    
    /**
     * 
     * @param {Function} callback
     * @returns {Chain}
     */
    forEach: function(callback)
    {
      this.chains.forEach(callback);
      return this;
    },
    
    /**
     * 
     * @returns {Analyzer.Analyzer}
     */
    getAnalyzer: function()
    {
      return this.analyzer;
    }
  };
  
})();
