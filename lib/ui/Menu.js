/**
 * Menu
 */
(function()
{
  var global = this,
      nspace = global.Menu,
      Util = global.Util,
      Exception = global.Exception;
      
  /**
   * 
   * @type Menu
   */
  var Menu = nspace.Menu = function(selector)
  {
    this.resource = $(selector);
    this.items = new Array();
  };

  Menu.prototype =
  {
    resource: null,
    items: null,
    
    /**
     * 
     * @param {Object} menuItem
     * @returns {undefined}
     */
    addItem: function(menuItem)
    {
      this.resource.append(menuItem.build());
      this.items.push(menuItem);
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
