var mathjs = require('mathjs'),
    math = mathjs();

// Export mathjs, since its dependency
global.mathjs = mathjs;
global.jQuery = null;
require('../build/quantum-probability.js');

module.exports = 
{
  /**
   * 
   */
  withinRange: function(expected, actual, range)
  {
    return (math.abs(actual) + range) > expected
      && (math.abs(actual) - range) < expected;
  }
};
