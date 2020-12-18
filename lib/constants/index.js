import { i, multiply, SQRT1_2 } from 'mathjs';
import EIGEN_VECTORS from './eigenVectors';
import OPERATORS from './operators';
import * as SPIN from './spin';

/**
 * Fundamental constants
 */
export const I = i;
export const NEGATIVE_I = multiply(-1, i);
export const SPEED_OF_LIGHT = 299792458; // m/s
export const FUNDAMENTAL_CHARGE = 1.602176565e-19; // C
export const H_BAR = 4.135667516e-15; // C
export { SQRT1_2 };

/**
 * Simulation specific constants
 */
export { SPIN, EIGEN_VECTORS, OPERATORS };
