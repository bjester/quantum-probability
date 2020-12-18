import { multiply, divide, add, subtract, matrix, sin, cos, pi, abs, sqrt, number, identity } from "mathjs";
import { I, SPEED_OF_LIGHT, OPERATORS } from '../constants'
import Device from './device';
import Vector from "../util/vector";
import State from "../state";

/**
 * Magnetic Field "analyzer", this isn't so much an analyzer as it is
 * a state modifier. For purposes of programming, it is sufficient definition.
 *
 * This only supports spin 1/2
 */
export default class MagneticField extends Device
{
  /**
   * @param direction
   * @param {Number} strength
   * @param {Number} width
   */
  constructor(direction, strength = 1, width = 1) {
    super();

    this.direction = direction;
    this.strength = strength || 1;
    this.width = width || 1;
  }

  /**
   * Sorts particles by energy
   *
   * @param {Particle[]} particles
   * @returns {{}}
   */
  static sortParticlesByEnergy(particles)
  {
    return particles.reduce((sorted, particle) =>
    {
      const energy = particle.getEnergy();
      if (!sorted[energy])
      {
        sorted[energy] = [];
      }

      sorted[energy].push(particle);
      return sorted;
    }, {});
  }

  /**
   * @param {State} state
   * @return {State}
   */
  evaluate(state)
  {
    const stateVector = state.getVector();
    let outputUpBasis = matrix([[0], [0]]),
        outputDownBasis = matrix([[0], [0]]);

    const bases = stateVector.getBasis();
    if (bases.length > 2)
    {
      throw new Exception.Unsupported();
    }

    const sortedParticles = MagneticField.sortParticlesByEnergy(
        state.getParticles());

    // Combine particles of different energy by adding their bases
    for (let energy in sortedParticles)
    {
      let particles = sortedParticles[energy],
          charge = particles[0].getCharge(),
          restMass = particles[0].getRestEnergy();

      // Calculate field time and oscillation frequency
      let time = this.calculateFieldTime(restMass, energy),
          phi = multiply(time, 2 * pi / 100); // This is arbitrary
      let omega = this.calculateOmega(restMass, charge);

      // Determine Hamiltonian
      let H = multiply(multiply(
          omega,
          1),
          OPERATORS.SPIN_HALF[this.direction]
      );

      // Two terms in Unitary expansion, sine and cosine, not including identity
      let sine = multiply(multiply(-1, sin(phi)), I);
      let cosine = subtract(cos(phi), 1);

      // Determine Unitary time evolution operator
      let U = add(add(
          identity(2), // Identity matrix
          multiply(sine, H)),
          multiply(cosine, multiply(H, H))
      );

      outputUpBasis = add(outputUpBasis, multiply(U, bases[0]));
      outputDownBasis = add(outputUpBasis, multiply(U, bases[1]));

  //      outputUpBasis = math.round(
  //        add(outputUpBasis, multiply(U, bases[0])), 9);
  //      outputDownBasis = math.round(
  //        add(outputUpBasis, multiply(U, bases[1])), 9);
    }

    return new State(state.getParticles(), new Vector([outputUpBasis, outputDownBasis]));
  }

  /**
   *
   * @param {Number} restMass
   * @param {Number} charge
   * @returns {Complex|*|Number|BigNumber|Complex|Unit|Array|Matrix}
   */
  calculateOmega(restMass, charge)
  {
    return divide(
        multiply(this.strength, abs(charge)),
        multiply(restMass, SPEED_OF_LIGHT * SPEED_OF_LIGHT)
    );
  }

  /**
   *
   * @param {Number} restMass
   * @param {Number} energy
   * @returns {Complex|*|Number|BigNumber|Complex|Unit|Array|Matrix}
   */
  calculateFieldTime(restMass, energy)
  {
    // We expect energy to be in 'eV' so we use rest energy, so we
    // multiply by 'c'
    return divide(
        this.width,
        multiply(SPEED_OF_LIGHT,
            sqrt(
                divide(
                    number(energy), multiply(2, restMass)
                )
            )
        )
    );
  }
}
