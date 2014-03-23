/**
 * Logger
 */
(function()
{
  var global = this,
      nspace = global.Util,
      Exception = global.Exception.Exception;
  
  /**
   * 
   * @type Logger
   */
  var Logger = nspace.Logger = function()
  {
    this._log = nspace.noop;
    
    if ('console' in global && 'log' in global.console)
    {
      this._log = function(level, msg)
      {
        console.log(level + ' ' + msg);
      };
    }
  };
  
  Logger.LEVEL_INFO = '[info]';
  Logger.LEVEL_ERROR = '[error]';
  Logger.LEVEL_DEBUG = '[debug]';
  
  Logger.prototype = {
    _log: null,
    
    /**
     * 
     * @param {String|Exception.Exception} msg
     * @returns {Logger}
     */
    log: function(msg, level)
    {      
      if (msg instanceof Exception)
      {
        this._log((level || Logger.LEVEL_ERROR), msg.getErrorMessage());
      }
      else
      {
        this._log((level || Logger.LEVEL_INFO), msg);
      }
      
      return this;
    }
  };
  
})();
