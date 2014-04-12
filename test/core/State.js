var assert = require('assert'),
  math = require('mathjs')(),
  test = require('../bootstrap.js');

describe('State', function()
{
  describe('spin-half eigenvectors', function()
  {
    var zBasisUp = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.Z))
      .setComponents([1, 0]);
    var zBasisDown = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.Z))
      .setComponents([0, 1]);

    // These two vectors are simply the z-up and z-down in x basis
    var xBasis1 = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.X))
      .setComponents([1, 1]).normalize();
    var xBasis2 = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.X))
      .setComponents([1, -1]).normalize();

    // These two vectors are simply the z-up and z-down in y basis
    var yBasis1 = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.Y))
      .setComponents([1, 1]).normalize();
    var yBasis2 = (new Util.Vector(State.EIGEN_VECTORS.SPIN_HALF.Y))
      .setComponents([1, -1]).normalize();

    // Orthogonality
    it('should all be orthogonal', function()
    {
      assert.equal(0, Util.Vector.innerProduct(zBasisUp, zBasisDown));

      assert.equal(0, Util.Vector.innerProduct(zBasisUp, xBasis2));
      assert.equal(0, Util.Vector.innerProduct(zBasisDown, xBasis1));

      assert.equal(0, Util.Vector.innerProduct(zBasisUp, yBasis2));
      assert.equal(0, Util.Vector.innerProduct(zBasisDown, yBasis1));
    });

    // The are normalized, and parallel
    it('should be parallel', function()
    {
      assert.equal(1, Util.Vector.innerProduct(zBasisUp, zBasisUp));
      assert.equal(1, Util.Vector.innerProduct(zBasisDown, zBasisDown));

      assert.equal(1, Util.Vector.innerProduct(zBasisUp, xBasis1));
      assert.equal(1, Util.Vector.innerProduct(zBasisDown, xBasis2));

      assert.equal(1, Util.Vector.innerProduct(zBasisUp, yBasis1));
      assert.equal(1, Util.Vector.innerProduct(zBasisDown, yBasis2).im);
    });
  });

  describe('spin-one eigenvectors', function()
  {
    it('should all be orthogonal', function()
    {
    });
  });
});
