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
   * Computes the inner product of two vectors, <v1|v2>
   * 
   * @returns {mathjs} Scalar
   */
  Vector.innerProduct = function(v1, v2)
  {
    var basis1 = v1.getBasis(),
        basis2 = v2.getBasis();
    
    // Must have same basis lengths
    if (basis1.length !== basis2.length)
    {
      throw new Exception.InvalidPreparation('Basis must be same length');
    }

    var comp1 = v1.getComponents(),
        comp2 = v2.getComponents();

    var product = 0;
    
    // Essentially a foil operation, but this will support greater than two terms
    for (var i = 0; i < basis1.length; i++)
    {
      for (var j = 0; j < basis2.length; j++)
      {
        var comp = math.multiply(math.conj(comp1[i]), comp2[j]);
        var basis = math.multiply(math.conj(math.transpose(basis1[i])), basis2[j]);

        product = math.add(product, math.multiply(comp, basis));
      }
    }
    
    return product.get([0,0]);
  };
  
  /**
   * Computes the outer product of two vectors, 
   * (|v1x><v1x| + |v1y><v1y|)(|v2x> + |v2y>) 
   * 
   * @returns {undefined}
   */
  Vector.outerProduct = function(v1, v2)
  {
    var basis1 = v1.getBasis(),
        basis2 = v2.getBasis();
    
    // Must have same basis lengths
    if (basis1.length !== basis2.length)
    {
      throw new Exception.InvalidPreparation('Basis must be same length');
    }
    
    var comp1 = v1.getComponents(),
        comp2 = v2.getComponents();
      
    var product = new Vector(basis1);
    
    // Essentially a foil operation, but this will support greater than two terms
    for (var i = 0; i < basis1.length; i++)
    {
      var productComp = 0;
      
      for (var j = 0; j < basis2.length; j++)
      {
        var comp = math.multiply(math.conj(comp1[i]), comp2[j]);
        var basis = math.multiply(math.conj(math.transpose(basis1[i])), basis2[j]);
        
        productComp = math.add(productComp, math.multiply(comp, basis));
      }
      
      product.setComponent(i, productComp.get([0,0]));
    }
    
    return product;
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
        throw new Exception.InvalidProperty('Invalid');
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
     * 
     * @returns {mathjs}
     */
    getBasis: function()
    {
      return this.basis;
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
      var magSq = Vector.innerProduct(this, this);
      
      // Already normalized
      if (magSq === 1)
      {
        return this;
      }
      
      return this.scale(math.divide(1,math.sqrt(magSq)));
    },
    
    /**
     * 
     * @returns {Vector}
     */
    clone: function()
    {
      var v = new Vector(this.getBasis());
      v.setComponents(this.getComponents());
      return v;
    },
    
    /**
     * Returns a new vector that is just one basis dir, by index of the basis
     * set
     * 
     * @param {Number} index
     * @returns {Vector}
     */
    getBasisVector: function(index)
    {
      var v = this.clone();
      
      // Set all other component values to zero other than the index
      v.setComponents(this.components.map(function(val, i)
      {
        return (i === index)
          ? val
          : 0;
      }));
      
      return v.normalize();
    }
  };
  
})();
