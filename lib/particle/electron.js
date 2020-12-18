import Particle from "./index";
import * as constants from '../constants';

export const SPIN = constants.SPIN.HALF;
export const MASS = 9.10938291e-31; // kg
export const CHARGE = -1.602176565e-19; // C
export const REST_ENERGY = 510998.928; // eV

export default class Electron extends Particle
{
  spin = SPIN
  mass = MASS
  charge = CHARGE
  restEnergy = REST_ENERGY
}
