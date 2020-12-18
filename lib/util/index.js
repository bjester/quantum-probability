import { multiply, subtract } from "mathjs";

/**
 * Empty function
 */
export function noop(){}

/**
 * Creates a 2D array of a certain length
 *
 * @param {Number} length
 * @return {[][]}
 */
export function array2D(length)
{
  return [].fill(null, 0, length - 1).map(() => []);
}

/**
 * Determines the value of the commutator of two matrices
 *
 * @param {mathjs.matrix} matrixA
 * @param {mathjs.matrix} matrixB
 * @return {mathjs.matrix}
 */
export function commutation(matrixA, matrixB)
{
  return subtract(multiply(matrixA, matrixB), multiply(matrixB, matrixA));
}
