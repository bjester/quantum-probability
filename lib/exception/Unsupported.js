/**
 * Unsupported Exception class
 */
(function()
{
  var global = this,
      nspace = global.Exception,
      Exception = nspace.Exception;
      
  /**
   * @type Unsupported
   */
  var Unsupported = nspace.Unsupported = function(message)
  {
    this.message = message;
  };

  Unsupported.prototype = new Exception('Unsupported');
  
})();
