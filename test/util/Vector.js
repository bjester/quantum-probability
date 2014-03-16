var assert = require("assert"),
    math = require('mathjs')(),
    test = require('../bootstrap.js');

describe('Vector', function()
{
  var v = new Util.Vector([math.matrix([[1],[0]]), math.matrix([[0],[1]])]);
  
  describe('normalize', function()
  {
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
