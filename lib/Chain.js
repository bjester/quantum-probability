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
  var Chain = nspace.Chain = function(device)
  {
    this.device = device;
    this.chains = new Array();
  };
  
  Chain.prototype = 
  {
    device: null,
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
     * @returns {Device.Device}
     */
    getDevice: function()
    {
      return this.device;
    }
  };
  
})();
