/**
 * Micro templating system for the client side.
 */

(function()
{
  var $ = this['jQuery'];
  var cache = {}, tags = ['<%', '%>'];
  
  var regex = [
    new RegExp("((^|" + tags[1] + ")[^\t]*)'", 'g'),
    new RegExp("\t=(.*?)" + tags[1], 'g')
  ];
  
  /**
   * Returns the domElement from string, jQuery, or domElement
   *
   * @param {jQuery|String|DomElement} el
   */
  var getElement = function(el)
  {
    if (typeof el === 'object' && typeof el['is'] === 'function')
    {
      el = el[0];
    }
    else if (typeof el === 'string')
    {
      el = document.getElementById(el.replace(/^\#?/, ''));
    }
    else if (typeof el !== 'object')
    {
      return null;
    }
    
    return el;
  };
  
  /**
   * Returns a templating function if 
   *
   * @param {jQuery|String} el
   */
  var Template = function(el)
  {
    return new Template.fn.__construct(el);
  };
  
  Template.fn = Template.prototype = 
  {
    __tmpl: null,
    
    /**
     * Construct Template object
     *
     * @param {jQuery|String|DomElement} el
     */
    __construct: function(el)
    {
      var id = getElement(el).id;
      
      cache[id] = (cache[id] || Template.createFunction(el) 
        || function() { return ''; });
      
      this.setFunction(cache[id]);
    },
    
    /**
     * Returns templated data string
     *
     * @param {Object} data
     * @return {String}
     */
    get: function(data)
    {
      return this.getFunction()(data);
    },
    
    /**
     * Sets the raw templating function
     *
     * @param {Function} func
     */
    setFunction: function(func)
    {
      this.__tmpl = func;
    },
    
    /**
     * Returns raw templating function
     *
     * @return {Function}
     */
    getFunction: function()
    {
      return this.__tmpl;
    }
  };
  
  /**
   * Creates and returns a templating function; doesn't cache function, create
   * cfjTemplate object to automatically do that.
   *
   * @param {jQuery|String|DomElement} el jQuery element, domElement, or string id selector
   */
  Template.createFunction = function(el)
  {
    var html = $.trim(getElement(el).innerHTML);
    
    // Generate a reusable function that will serve as a template generator 
    return new Function('obj',
      'var p=[],print=function(){p.push.apply(p,arguments);};'
        
      // Introduce the data as local variables using with(){}
      + "with(obj){p.push('"

      // Convert the template into pure JavaScript
      + html
        .replace(/[\r\t\n]+/g, " ")
        .split(tags[0]).join("\t")
        .replace(regex[0], "$1\r")
        .replace(regex[1], "',$1,'")
        .split("\t").join("');")
        .split(tags[1]).join("p.push('")
        .split("\r").join("\\'")
      + "');}return p.join('');"
    );
  };
  
  /**
   * Returns boolean based on whether or not the data object is structured data
   * for using with micro templating
   *
   * @param {Object} data
   */
  Template.is = function(data)
  {
    data = data || {};
    return (data && ('template' in data) && ('data' in data));
  };
  
  /**
   * Expects data is structured for micro templating (Template.is() returns true)
   *
   * @param {Object} data
   */
  Template.build = function(data)
  {
    return Template(data.template).get(data.data);
  };
  
  Template.fn.__construct.prototype = Template.fn;
  this.cfjTemplate = Template;
  
  if (typeof $ !== 'function')
  {
    return;
  }
  
  // Extend jQuery
  $.fn.extend(
  {
    /**
     * jQuery templating function
     * 
     * Has multiple uses:
     * 1) $('#someElement').tmpl('#myTemplate', {data: 'stuff'}); 
     *   >> Returns jQuery, appends template result into '#someElement'
     *   
     * 2) $('#myTemplate').tmpl({data: 'stuff'}); 
     *   >> Returns String
     *   
     * 3) $('#myTemplate').tmpl();
     *   >> All other possibilities return Template object
     *   
     * @param {String|Object} opt
     * @param {Object} _data
     * @return {jQuery|Template|String|null} Returns null if not applicable
     */
    tmpl: function(opt, _data)
    {
      if ($.type(_data) === 'object' && $(opt).is('script'))
      {
        return $(this).append(Template(opt).get(_data));
      }
      else if ($(this).is('script'))
      {
        if ($.type(opt) === 'object')
        {
          return Template(this).get(opt);
        }
        else
        {
          return Template(this);
        }
      }
      
      return null;
    }
  });
  
})();
