/**
 * Base UI Device class
 */
(function()
{
  var global = this,
      nspace = global.Ui.Device,
      math = global.mathjs(),
      Util = global.Util,
      Exception = global.Exception;

  /**
   * 
   * @type Device
   */
  var Device = nspace.Device = function(){};

  Device.prototype =
  {
    output: null,
    
    /**
     * 
     * @param {Util.Vector} vector
     */
    __construct: function(vector)
    {
      this.vector = vector.normalize();
    },
    
    /**
     * 
     * @returns {jQuery|String}
     */
    build: function()
    {
      throw new Exception.Unsupported('Method not implemented');
    }
  };
  
})();
