var assert = require('assert'),
    //expect = require('expect'),
    math = require('mathjs')(),
    test = require('../bootstrap.js');

describe('Vector', function()
{
  // Defined vector, simply has orthonormal basis
  var getVector = function() 
  {
    return new Util.Vector([math.matrix([[1],[0]]), math.matrix([[0],[1]])]);
  };
  
  describe('components', function()
  {
    it('should default component values should be 1', function()
    {
      var v = getVector();
      assert.equal(1, v.getComponent(0));
      assert.equal(1, v.getComponent(1));
    });
    
    it('should update components correctly', function()
    {
      var v = getVector();
      v.setComponents([3,4]);
      
      assert.equal(3, v.getComponent(0));
      assert.equal(4, v.getComponent(1));
    });
  });
  
  describe('getMagnitude', function()
  {
    var v = getVector();
    v.setComponents([3,4]);
    
    it('should produce 5 for 3-4-5 triangle', function()
    {
      // Normalize and check
      assert.equal(5, v.getMagnitude());
    });
  });
  
  describe('scale', function()
  {
    var v = getVector();
    
    it('should double the magnitude', function()
    {
      var mag = v.scale([3,4]).getMagnitude();
      
      // Scale and check
      v.scale(2);
      assert.equal(true, test.withinRange(mag * 2, v.getMagnitude(), 5e-15));
    });
  });
  
  describe('normalize', function()
  {
    var v = getVector();
    it('should make magnitude ~1', function()
    {
      // Not normalized yet
      assert.equal(true, test.withinRange(math.SQRT2, v.getMagnitude(), 5e-15));
      
      // Normalize and check
      v.normalize();
      assert.equal(true, test.withinRange(1, v.getMagnitude(), 5e-15));
    });
  });
  
  describe('innerProduct', function()
  { 
    it('should be the same as the square of the magnitude', function()
    {
      var v = getVector();
      v.setComponents([3,4]);

      assert.equal(v.getMagnitude() * v.getMagnitude(), 
        Util.Vector.innerProduct(v,v));
    });
    
    it('should produce an expected value', function()
    {
      var v1 = getVector(),
          v2 = getVector();
      v2.setComponents([3,4]);

      assert.equal(7, Util.Vector.innerProduct(v1,v2));
    });
    
    it('should multiply basis correctly', function()
    {
      var v1 = new Util.Vector([math.matrix([[1],[1]]), math.matrix([[1],[1]])]),
          v2 = new Util.Vector([math.matrix([[1],[1]]), math.matrix([[1],[1]])]);
      v1.setComponents([3,4]);
      v2.setComponents([3,3]);

      assert.equal(84, Util.Vector.innerProduct(v1,v2));
    });
    
    it('should produce zero for perpendiclar vectors', function()
    {
      var v1 = getVector(),
          v2 = getVector();
      v1.setComponents([3,4]);
      v2.setComponents([-4,3]);

      assert.equal(0, Util.Vector.innerProduct(v1,v2));
    });
    
    it('should handle complex numbers', function()
    {
      var v = new Util.Vector([math.matrix([[math.i],[0]]), math.matrix([[0],[math.i]])]);
      v.setComponents([3,4]);

      assert.equal(v.getMagnitude() * v.getMagnitude(), 
        Util.Vector.innerProduct(v,v));
    });
  });
  
  describe('outerProduct', function()
  { 
    it('should compute correctly', function()
    {
      var v1 = new Util.Vector([math.matrix([[1],[1]]), math.matrix([[1],[1]])]),
          v2 = new Util.Vector([math.matrix([[1],[1]]), math.matrix([[1],[1]])]);
      v1.setComponents([3,4]);
      v2.setComponents([3,3]);

      var outerProduct = Util.Vector.outerProduct(v1,v2);
      assert.equal(36, outerProduct.getComponent(0));
      assert.equal(48, outerProduct.getComponent(1));
      assert.equal(v1.getBasis(), outerProduct.getBasis());
    });
  });
  
});
