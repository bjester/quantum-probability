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
    it('default component values should be 1', function()
    {
      var v = getVector();
      assert.equal(1, v.getComponent(0));
      assert.equal(1, v.getComponent(1));
    });
    
    it('updated', function()
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
    
    it('3-4-5 triangle, should be 5', function()
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
  
  
});
