import {multiply, divide, add, conj, sqrt, transpose} from "mathjs";

/**
 * @template Accumulator
 * @param {Vector} vectorA
 * @param {Vector} vectorB
 * @param {Function<Accumulator>} callback
 * @param {Accumulator} initialAccumulatorValue
 * @return {Accumulator}
 */
export function foil(vectorA, vectorB, callback, initialAccumulatorValue = 0) {
  const basisA = vectorA.getBasis(),
    basisB = vectorB.getBasis();

  // Must have same basis lengths
  if (basisA.length !== basisB.length)
  {
    throw new Exception.InvalidPreparation('Basis must be same length');
  }

  let accumulator = initialAccumulatorValue;

  // Essentially a foil operation, but this will support greater than two terms
  basisA.forEach((basisAi, i) => {
    const componentAi = vectorA.getComponent(i);
    const product = basisB.reduce((product, basisBj, j) => {
      const componentBj = vectorB.getComponent(j);
      return add(product, multiply(
        multiply(conj(componentAi), componentBj),
        multiply(conj(transpose(basisAi)), basisBj)
      ))
    }, 0);

    accumulator = callback(accumulator, product, i);
  });

  return accumulator;
}

/**
 * Computes the inner product of two vectors, <v1|v2>
 *
 * @returns {Number}
 */
export function innerProduct(vectorA, vectorB)
{
  return foil(vectorA, vectorB, add).get([0,0]);
}

/**
 * Computes the outer product of two vectors,
 * (|v1x><v1x| + |v1y><v1y|)(|v2x> + |v2y>)
 *
 * @returns {Vector}
 */
export function outerProduct(vectorA, vectorB)
{
  return foil(vectorA, vectorB, (productVector, product, i) => {
    return productVector.setComponent(i, product.get([0,0]));
  }, new Vector(vectorA.getBasis()));
}

/**
 * Vector
 */
export default class Vector
{
  constructor(basis)
  {
    if (!basis || ('length' in basis && basis.length === 0))
    {
      throw new Exception.InvalidPreparation('Basis vector cannot be empty');
    }

    // Set basis and init components with same length and value of 1
    this.basis = basis;
    this.components = basis.map(() => 1);
  }

  /**
   *
   * @param {Number} index The basis vector index
   * @param {Mixed} value
   * @returns {Vector}
   */
  setComponent(index, value)
  {
    if (index >= this.components.length)
    {
      throw new Exception.InvalidProperty('Invalid basis index');
    }

    this.components[index] = value;
    return this;
  }

  /**
   *
   * @param {Number} index The basis vector index
   * @returns {Number}
   */
  getComponent(index)
  {
    if (index >= this.components.length)
    {
      throw new Exception.InvalidProperty('Invalid basis index');
    }

    return this.components[index];
  }

  /**
   *
   * @param {Array} values
   * @returns {Vector}
   */
  setComponents(values)
  {
    if (values.length !== this.components.length)
    {
      throw new Exception.InvalidProperty('Invalid');
    }

    this.components = values;
    return this;
  }

  /**
   *
   * @returns {Number[]}
   */
  getComponents()
  {
    return this.components;
  }

  /**
   *
   * @returns {mathjs}
   */
  getBasis()
  {
    return this.basis;
  }

  /**
   * Applies a scalar to the vector components, simulates applying a scalar to
   * vector mathematically
   *
   * @param {Number} scalar
   * @returns {Vector}
   */
  scale(scalar)
  {
    this.components = this.components.map((component) => multiply(scalar, component));
    return this;
  }

  /**
   * Determines the magnitude of the vector, sqrt(x*x + y*y)
   *
   * @returns {mathjs}
   */
  getMagnitude()
  {
    return sqrt(this.components.reduce((magnitude, component) => {
      return add(magnitude, multiply(conj(component), component));
    }, 0));
  }

  /**
   * Multiplies the components by a scalar to that makes the magnitude 1
   *
   * @returns {Vector}
   */
  normalize()
  {
    const magSq = innerProduct(this, this);

    // Already normalized
    if (magSq === 1)
    {
      return this;
    }

    return this.scale(divide(1, sqrt(magSq)));
  }

  /**
   *
   * @returns {Vector}
   */
  clone()
  {
    return (new Vector(this.getBasis()))
      .setComponents(this.getComponents());
  }

  /**
   * Returns a new vector that is just one basis dir, by index of the basis
   * set
   *
   * @param {Number} index
   * @returns {Vector}
   */
  getBasisVector(index)
  {
    // Set all other component values to zero other than the index
    return this.clone()
      .setComponents(this.components.map((val, i) => (i === index) ? val : 0))
      .normalize();
  }
}
