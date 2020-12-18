import Particle from "./index";
import * as constants from '../constants';

export const SPIN = constants.SPIN.HALF;
export const MASS = 1.674927351e-27; // kg
export const CHARGE = 0; // C
export const REST_ENERGY = 939565378; // eV

export default class Neutron extends Particle
{
  spin = SPIN
  mass = MASS
  charge = CHARGE
  restEnergy = REST_ENERGY
}
