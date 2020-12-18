import { matrix } from "mathjs";
import { I, NEGATIVE_I } from "./index";
import * as SPIN from './spin';

export const SPIN_HALF = {
  Z: matrix([
    [1,  0],
    [0, -1]
  ]),
  X: matrix([
    [0, 1],
    [1, 0]
  ]),
  Y: matrix([
    [0, NEGATIVE_I],
    [I,          0]
  ]),
};

export const SPIN_ONE = {
  Z: matrix([
    [1,  0,  0],
    [0,  0,  0],
    [0,  0, -1]
  ]),
  X: matrix([
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
  ]),
  Y: matrix([
    [0, NEGATIVE_I,          0],
    [I,          0, NEGATIVE_I],
    [0,          I,          0]
  ]),
};

export default {
  SPIN_HALF,
  SPIN_ONE,
  [SPIN.HALF]: SPIN_HALF,
  [SPIN.ONE]: SPIN_ONE,
}
