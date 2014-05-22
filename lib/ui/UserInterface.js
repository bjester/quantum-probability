/**
 * UserInterface
 */
(function()
{
  var global = this,
      $ = global['jQuery'],
      nspace = global.UI = global.Ui,
      Util = global.Util,
      Exception = global.Exception,
      Particle = global.Particle;
      
  /**
   * 
   * @type UserInterface
   */
  var UserInterface = nspace.UserInterface = function(options)
  {
    this.header = $(options.header);
    this.menu = $(options.menu);
    this.content = $(options.content);
    this.canvas = global.oCanvas.create(
    {
      canvas: this.content.find('canvas').get(0)
    });

    var me = this;
    $(global).on('hashchange', function()
    {
      me.triggerAction(global.location.hash.slice(1));
      return false;
    });
  };

  UserInterface.MENU_TEMPLATE = '#TemplateNav';

  UserInterface.prototype =
  {
    header: null,
    menu: null,
    content: null,
    canvas: null,
    
    routes: {},
    menus: {},
    
    particle: Particle.Electron,
    speed: 10,
    menuOpen: false,
    translate: 
    {
      open: [280, 0, 0],
      close: [0, 0, 0]
    },
    
    /**
     * 
     * @param {String} key
     * @param {Object} menu
     * @returns {UserInterface}
     */
    addMenu: function(key, menu)
    {
      var me = this;
      this.menus[key] = menu;
      return this.addRoute('menu/'+key, function()
      {
        me.openMenu(key);
      });
    },
    
    /**
     * 
     * @param {String} action
     * @param {Function} callback
     * @returns {UserInterface}
     */
    addRoute: function(action, callback)
    {
      if (!(action in this.routes))
      {
        this.routes[action] = $.Callbacks();
      }

      this.routes[action].add(callback);
      return this;
    },

    /**
     *
     * @param {String} name
     */
    fillMenu: function(name)
    {
      this.menu.empty().tmpl(UserInterface.MENU_TEMPLATE, this.menus[name]);
      return this;
    },
    
    /**
     * 
     * @param {String} name
     * @param {Function} callback
     * @returns {UserInterface}
     */
    openMenu: function(name, callback)
    {
      callback = (callback || Util.noop);

      if (!(name in this.menus) || this.menuOpen === null)
      {
        return this;
      }
      
      this.fillMenu(name);

      if (!this.menuOpen)
      {
        this.menuOpen = null;

        var me = this, d = $.Deferred();

        d.done(callback, function()
        {
          me.menuOpen = true;
        });

        if ($(global).width() > 1400)
        {
          d.resolve();
        }
        else
        {
          this.menu.add(this.content).add(this.header)
            .transition({translate: this.translate.open}, function()
            {
              d.resolve();
            });
        }
      }
      
      return this;
    },
    
    /**
     * 
     * @param {Function} callback
     * @returns {UserInterface}
     */
    closeMenu: function(callback)
    {
      callback = (callback || Util.noop);

      if (!this.menuOpen)
      {
        return this;
      }
      
      this.menuOpen = null;

      var me = this, d = $.Deferred();

      d.done(callback, function()
      {
        me.menuOpen = false;
      });

      if ($(global).width() > 1400)
      {
        d.resolve();
      }
      else
      {
        this.menu.add(this.content).add(this.header)
          .transition({translate: this.translate.close}, function()
          {
            d.resolve();
          });
      }

      return this;
    },

    /**
     *
     * @param {String} action
     * @param {UserInterface}
     */
    triggerAction: function(action)
    {
      if (!(action in this.routes))
      {
        return this;
      }

      this.routes[action].fire();
      return this;
    }
  };
  
})();
