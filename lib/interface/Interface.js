/**
 * Interface
 */
(function()
{
  var global = this,
      nspace = global.Interface,
      Util = global.Util,
      Exception = global.Exception;
      
  /**
   * 
   * @type Interface
   */
  var Interface = nspace.Interface = function(options)
  {
    this.header = $(options.header);
    this.menu = $(options.menu);
//    this.menu = new nspace.Menu(options.menu);
    this.content = $(options.content);
    this.canvas = global.oCanvas.create(
    {
      canvas: this.content.find('canvas')
    });
  };

  Interface.prototype =
  {
    header: null,
    menu: null,
    content: null,
    canvas: null,
    
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
