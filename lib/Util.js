/**
 * nspace
 */
(function()
{
  var global = this,
      nspace = global.Util = {},
      logger = null,
      types = new Array();

  (function(types)
  {
    var standardTypes = [
      'Boolean', 
      'Number', 
      'String', 
      'Function', 
      'Array', 
      'Date', 
      'RegExp', 
      'Object'
    ];

    for (var i = 0; i < standardTypes.length; i++)
    {
      types['[object ' + standardTypes[i] + ']'] = standardTypes[i].toLowerCase();
    }
  })(types);

  /**
    * Determines the data type of a variable
    * 
    * @param {Mixed} obj
    * @return {String}
    */
  nspace.type = function(obj)
  {
    if (!nspace.isSet(obj))
    {
      var type = 'undefined';
    }
    else if (nspace.isSet(obj['__CLASS__']))
    {
      type = obj['__CLASS__'];
    }
    else
    {
      type = types[Object.prototype.toString.call(obj)];
    }

    return type;
  };

  /**
    * isset function checks if variable is unset or null
    * 
    * @param {Mixed} test
    * @return {Bool}
    */
  nspace.isSet = function(test)
  {
    try
    {
      var isSet = (
        typeof test !== "undefined" 
        && test !== undefined 
        && test !== null
      );
    }
    catch (exception)
    {
      isSet = false;
    }

    return isSet;
  };

  /**
    * Determines if variable is empty
    * 
    * @param {Mixed} test
    * @return {Bool}
    */
  nspace.isEmpty = function(test)
  {
    try
    {
      var isEmpty = (
        !nspace.isSet(test)
        || (nspace.type(test) === 'string' && test === '')
        || (nspace.type(test) === 'array' && test.length === 0)
        || (nspace.type(test) === 'boolean' && !test)
        || (nspace.type(test) === 'number' && test === 0)
      );
    }
    catch (exception)
    {
      isEmpty = true;
    }

    return isEmpty;
  };

  /**
   * Determines if variable is an array
   *
   * @param {Mixed} test
   * @return {Bool}
   */
  nspace.isArray = function(test) { return nspace.type(test) === 'array'; };

  /**
   * Determines if variable is a object
   *
   * @param {Mixed} test
   * @return {Bool}
   */
  nspace.isObject = function(test) { return nspace.type(test) === 'object'; };

  /**
   * Determines if variable is a function
   *
   * @param {Mixed} test
   * @return {Bool}
   */
  nspace.isFunction = function(test) { return nspace.type(test) === 'function'; };

  /**
   * Determines if variable is a string
   *
   * @param {Mixed} test
   * @return {Bool}
   */
  nspace.isString = function(test) { return nspace.type(test) === 'string'; };

  /**
    * Coalesces variables until a set variable is reached
    * 
    * @param {Mixed} ...args
    * @return {Mixed|null} Returns null if no set variable is passed
    */
  nspace.coalesce = function()
  {
    for (var i = 0, argLength = arguments.length; i < argLength; i++)
    {
      if (nspace.isSet(arguments[i]))
      {
        return arguments[i];
      }
    }

    return null;
  };
  
  /**
   * Logs a message or exception
   * 
   * @param {String|Exception.Exception} msg
   * @param {String} level Optional
   * @returns {nspace}
   */
  nspace.log = function(msg, level)
  {
    if (!(logger instanceof this.Logger))
    {
      logger = new this.Logger();
    }
    
    logger.log(msg, level);
    
    return this;
  };
  
  /**
   * Empty function
   */
  nspace.noop = function(){};
  
  /**
   * Copy's object properties or methods from one object to another
   * 
   * @param {Object} to Object to copy into
   * @param {Object} from Object to copy from
   * @param {Bool} overwrite Whether or not overwrite items in the object
   * @param {Bool} recurse Boolean whether not to deep copy
   * @param {Function} callback on overwrite, sent the destination object, key and value to set
   * @return {Object} The modified 'to' object
   */
  nspace.extend = function(to, from, overwrite, recurse, callback) 
  {
   if (nspace.isEmpty(from)) {return to;}

   recurse = (recurse || false);
   overwrite = (overwrite || false);
   callback = (callback || nspace._extend);

   for (var k in from)
   {
     var set = from[k];

     if (recurse && nspace.isObject(to[k]) && nspace.isObject(from[k]))
     {
       set = nspace.extend(to[k], from[k], overwrite, true);
     }

     if (overwrite || !(k in to)) {to[k] = callback(to, k, set);}
   }

   return to;
  };
  
  /**
   * The default Util.extend callback
   *
   * @param {Object} dest The destination object
   * @param {String|Int} key The key of the destination
   * @param {Mixed} val The value that will be set
   */
  nspace._extend = function(dest, key, val) { return val; };

  /**
   * Unsets value and returns it, it would be similar to Array.pop, but any index
   * and works on objects
   * 
   * @param {Object} obj
   * @param {Number|String} key
   * @returns {mixed}
   */
  nspace.unset = function(obj, key) 
  { 
   var val = obj[key]; 
   return (delete obj[key], val);
  };

  /**
   * Copies an object or objects.  Allows dynamic list of arguments to copy, props
   * are copied from right to left. Adding a overwrite param, it will reverse this
   * 
   * @param {Object} objects Dynamic list of objects to extend
   * @param {Bool} overwrite Whether or not overwrite items in the object
   * @param {Bool} recurse Boolean whether not to deep copy
   * @return {Object} The copied obj
   */
  nspace.copy = function()
  {
   var copy = {},
       args = nspace.argsToArray(arguments).reverse(), 
       length = args.length, 
       overwrite = false, 
       recurse = false,
       argsDone = false;

   for (var i = 0, arg = args[i]; i < length; i++, arg = args[i])
   {
     if (!argsDone && !nspace.isObject(arg))
     {
       recurse = overwrite;
       overwrite = arg;
       continue;
     }

     // If we got this far, stop looking for bool args
     argsDone = true;

     if (!nspace.isSet(arg)) { continue; }

     nspace.extend(copy, arg, overwrite, recurse);
   }

   return copy;
  };

  /**
   * Creates an array filled with a value, to a certain length
   *
   * @param {Mixed} fill
   * @param {Number} length
   * @return {Mixed[]}
   */
  nspace.padArray = function(fill, length)
  {
    var a = new Array();

    for (var i = 0; i < length; i++)
    {
      var val = fill;

      if ('prototype' in fill)
      {
        val = new fill();
      }

      a.push(val);
    }

    return a;
  };

  /**
   * Creates a 2D array of a certain length
   *
   * @param {Number} length
   * @return {[][]}
   */
  nspace.array2D = function(length)
  {
    var a = new Array();

    for (var i = 0; i < length; i++)
    {
      a.push([]);
    }

    return a;
  };

})();
