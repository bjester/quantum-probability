import { matrix } from "mathjs";
import { I, NEGATIVE_I, SQRT1_2 } from "./index";
import * as SPIN from './spin';

/**
 * Spin 1/2 eigenvectors
 */
export const SPIN_HALF = {
  Z: [
    matrix([
      [1],
      [0]
    ]),
    matrix([
      [0],
      [1]
    ])
  ],
  X: [
    matrix([
      [1],
      [1]
    ]),
    matrix([
      [1],
      [-1]
    ])
  ],
  Y: [
    matrix([
      [1],
      [I]
    ]),
    matrix([
      [1],
      [NEGATIVE_I]
    ])
  ]
};

/**
 * Spin 1 eigenvectors
 */
export const SPIN_ONE = {
  Z: [
    matrix([
      [1],
      [0],
      [0]
    ]),
    matrix([
      [0],
      [1],
      [0]
    ]),
    matrix([
      [0],
      [0],
      [1]
    ]),
  ],
  X: [
    matrix([
      [SQRT1_2],
      [1],
      [SQRT1_2]
    ]),
    matrix([
      [1],
      [0],
      [-1]
    ]),
    matrix([
      [SQRT1_2],
      [-1],
      [SQRT1_2]
    ]),
  ],
  Y: [
    matrix([
      [SQRT1_2],
      [I],
      [-1 * SQRT1_2]
    ]),
    matrix([
      [1],
      [0],
      [1]
    ]),
    matrix([
      [SQRT1_2],
      [NEGATIVE_I],
      [-1 * SQRT1_2]
    ]),
  ]
};

/**
 * Export all with symbols as well
 */
export default {
  SPIN_HALF,
  SPIN_ONE,
  [SPIN.HALF]: SPIN_HALF,
  [SPIN.ONE]: SPIN_ONE,
};
