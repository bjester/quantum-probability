/**
 * InvalidProperty Exception class
 */
(function()
{
  var global = this,
      nspace = global.Exception,
      Exception = nspace.Base;
      
  /**
   * @type InvalidProperty
   */
  var InvalidProperty = nspace.InvalidProperty = function(message)
  {
    this.message = message;
  };
  
  InvalidProperty.prototype = new Exception('InvalidProperty');
  
})();
