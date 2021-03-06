/**
 * InvalidPreparation Exception class
 */
(function()
{
  var global = this,
      nspace = global.Exception,
      Exception = nspace.Exception;
      
  /**
   * @type InvalidPreparation
   */
  var InvalidPreparation = nspace.InvalidPreparation = function(message)
  {
    this.__construct(message);
  };
  
  InvalidPreparation.prototype = new Exception('InvalidPrepartion');
  
})();
