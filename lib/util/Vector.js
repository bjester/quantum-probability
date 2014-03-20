/**
 * Vector
 */
(function()
{
  var global = this,
      nspace = global.Util,
      Exception = global.Exception,
      math = global.mathjs();
  
  /**
   * 
   * @type Vector
   * @param {Array} basis The basis vectors, ordered correctly, orthonormal and complete
   */
  var Vector = nspace.Vector = function(basis)
  {
    if (!basis || ('length' in basis && basis.length === 0))
    {
      throw new Exception.InvalidPreparation('Basis vector cannot be empty');
    }
    
    // Set basis and init components with same length and value of 1
    this.basis = basis;
    this.components = basis.map(function()
    {
      return 1;
    });
  };
 
  /**
   * 
   */
  Vector.prototype = 
  {
    basis: null,
    components: null,
  
    /**
     * 
     * @param {Number} index The basis vector index
     * @param {Mixed} value
     * @returns {Vector}
     */
    setComponent: function(index, value)
    {
      if (index >= this.components.length)
      {
        throw new Exception.InvalidProperty('Invalid basis index');
      }
      
      this.components[index] = value;
      
      return this;
    },
    
    /**
     * 
     * @param {Number} index The basis vector index
     * @returns {Number}
     */
    getComponent: function(index)
    {
      if (index >= this.components.length)
      {
        throw new Exception.InvalidProperty('Invalid basis index');
      }
      
      return this.components[index];
    },
    
    /**
     * 
     * @param {Array} values
     * @returns {Vector}
     */
    setComponents: function(values)
    {
      if (values.length !== this.components.length)
      {
        throw new Exception.InvalidProperty('Invalid ');
      }
      
      this.components = values;
      return this;
    },
    
    /**
     * 
     * @returns {Number[]}
     */
    getComponents: function()
    {
      return this.components;
    },
    
    /**
     * Applies a scalar to the vector components, simulates applying a scalar to 
     * vector mathematically
     * 
     * @param {Number} scalar
     * @returns {Vector}
     */
    scale: function(scalar)
    {
      this.components = this.components.map(function(component)
      {
        return math.multiply(scalar, component);
      });
      
      return this;
    },
    
    /**
     * Determines the magnitude of the vector, sqrt(x*x + y*y)
     * 
     * @returns {mathjs}
     */
    getMagnitude: function()
    {
      var magnitude = 0;
      
      for (var i = 0; i < this.components.length; i++)
      {
        var c = this.components[i];
        magnitude = math.add(magnitude, math.multiply(math.conj(c),c));
      }
      
      return math.sqrt(magnitude);
    },
    
    /**
     * Multiplies the components by a scalar to that makes the magnitude 1
     * 
     * @returns {Vector}
     */
    normalize: function()
    {
      var mag = this.getMagnitude();
      
      // Already normalized
      if (mag === 1)
      {
        return this;
      }
      
      return this.scale(math.divide(1,mag));
    }
  };
  
})();
