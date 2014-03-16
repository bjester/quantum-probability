/**
 * InvalidPreparation Exception class
 */
(function()
{
  var global = this,
      nspace = global.Exception,
      Exception = nspace.Base;
      
  /**
   * @type InvalidPreparation
   */
  var InvalidPreparation = nspace.InvalidPreparation = function(message)
  {
    this.message = message;
  };
  
  InvalidPreparation.prototype = new Exception('InvalidPrepartion');
  
})();