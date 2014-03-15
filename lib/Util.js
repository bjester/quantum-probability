/**
 * Util
 */
(function()
{
  var global = this,
      nspace = global.Util = {},
      Logger = nspace.Logger,
      logger = null;
  
  /**
   * 
   * @param {String|Exception.Base} msg
   * @param {String} level Optional
   * @returns {Util}
   */
  nspace.log = function(msg, level)
  {
    if (!(logger instanceof Logger))
    {
      logger = new Logger();
    }
    
    logger.log(msg, level);
    
    return this;
  };
  
  /**
   * Empty function
   */
  nspace.noop = function(){};
  
})();
