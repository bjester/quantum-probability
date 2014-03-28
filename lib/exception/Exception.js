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
    this.stack = null;
  };
  
  Exception.prototype = {
    name: null,
    message: null,
    stack: null,

    __construct: function(message)
    {
      this.message = message;
      this.stack = (new Error()).stack;
    },

    /**
     * @returns {String}
     */
    getErrorMessage: function()
    {
      return this.name + ': ' + this.message;
    }
  };
  
})();
