import { OPERATORS } from './constants';
import Vector from "./util/vector";
import System from "./system";

/**
 * Quantum State
 */
export default class State
{
  constructor(particles, vector)
  {
    this.particles = [];
    this.multiplicity = null;
    this.orientation = null;
    this.fill(particles, vector);
  }

  /**
   * Returns the state vector for certain spin and orientation (X,Y,Z)
   *
   * @param {String} orient State.SPIN_*
   * @param {Number[]} components
   * @returns {Util.Vector} Vector is normalized
   */
  getStateVector(orient, components)
  {
    const spin = System.getInstance().getSpin(),
      v = new Vector(OPERATORS[spin][orient]);
    v.setComponents(components);
    v.normalize();
    return v;
  }

  /**
   *
   * @param {Array} particles
   * @param {Vector} vector
   * @returns {State}
   */
  fill(particles, vector)
  {
    if (vector)
    {
      this.vector = vector.normalize();
    }

    if (!particles || ('length' in particles && particles.length === 0))
    {
      return this;
    }

    this.particles = particles;
    return this;
  }

  /**
   *
   * @param {Util.Vector} vector
   * @returns {State}
   */
  setVector(vector)
  {
    this.vector = vector;
    return this;
  }

  /**
   *
   * @returns {Util.Vector}
   */
  getVector()
  {
    return this.vector;
  }

  /**
   *
   * @returns {Particle[]}
   */
  getParticles()
  {
    return this.particles;
  }

  /**
   *
   * @returns {Particle[]}
   */
  setParticles(particles)
  {
    this.particles = particles;
    return this;
  }
}
