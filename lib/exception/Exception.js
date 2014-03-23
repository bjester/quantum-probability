/**
 * Base Exception class
 */
(function()
{
  var global = this,
      nspace = global.Exception = {};
      
  /**
   * @type Exception
   */
  var Exception = nspace.Exception = function(name, message)
  {
    this.name = name;
    this.message = message;
  };
  
  Exception.prototype = {
    name: null,
    message: null,
    
    /**
     * @returns {String}
     */
    getErrorMessage: function()
    {
      return this.name + ': ' + this.message;
    }
  };
  
})();
