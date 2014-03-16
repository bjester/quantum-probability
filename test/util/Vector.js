var assert = require("assert"),
    mathjs = require('mathjs');

// Export mathjs, since its dependency
global.mathjs = mathjs;
require('../../build/quantum-probability.min.js');

// Create instance
var math = mathjs(),
    Util = global.Util;

function withinRange(expected, actual, range)
{
  return (math.abs(actual) + range) > expected
    && (math.abs(actual) - range) < expected;
}

describe('Vector', function()
{
  var v = new Util.Vector([math.matrix([[1],[0]]), math.matrix([[0],[1]])]);
  
  describe('normalize', function()
  {
    it('should make magnitude ~1', function()
    {
      // Not normalized yet
      assert.equal(true, withinRange(math.SQRT2, v.getMagnitude(), 5e-15));
      
      // Normalize and check
      v.normalize();
      assert.equal(true, withinRange(1, v.getMagnitude(), 5e-15));
    });
  });
});
