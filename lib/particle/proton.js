import Particle from "./index";
import * as constants from '../constants';

export const SPIN = constants.SPIN.HALF;
export const MASS = 1.672621777e-27; // kg
export const CHARGE = 1.602176565e-19; // C
export const REST_ENERGY = 938272046; // eV

export default class Proton extends Particle
{
  spin = SPIN
  mass = MASS
  charge = CHARGE
  restEnergy = REST_ENERGY
}
