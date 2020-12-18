import State from '../state';
import { array2D } from '../util';


export default class Device
{
  /**
   * @param {Vector} [vector]
   */
  constructor(vector= null)
  {
    this.vector = vector ? vector.normalize() : null;
    this.output = null;
  }

  /**
   * @param {State} state
   * @returns {State[]}
   */
  evaluate(state)
  {
    return [];
  }

  /**
   * Sorts particles given an array of probabilities, all less than 1
   *
   * @param {Particle[]} particles
   * @param {Number[]}  probability
   * @return {Particle[][]}
   */
  static sortParticlesByProbability(particles, probability)
  {
    const sums = probability.reduce((sums, val, index) =>
    {
      sums.push(val + (sums[index - 1] || 0));
      return sums;
    }, []);
    const result = array2D(probability.length);

    // Go through particles and decide in which spin they will go
    while (particles.length)
    {
      const rand = math.random();
      const index = sums.findIndex(probability => rand < probability);

      if (index >= 0)
      {
        result[index].push(particles.pop());
      }
    }

    return result;
  }

  /**
   * Joins an array of particles and bases to create State objects
   *
   * @param {Particle[][]} particles
   * @param {Vector[]}  bases
   * @return {State[]}
   */
  static generateStates(particles, bases)
  {
    if (particles.length !== bases.length)
    {
      throw new Exception.InvalidPreparation('Particle array and bases array must be same length');
    }

    return particles.map((particle, i) => new State(particle, bases[i]));
  };
}
