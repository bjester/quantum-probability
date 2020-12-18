import Vector from "./util/vector";
import State from "./state";

/**
 * System Class: describes the system, what particle, analyzers, etc are
 * currently used in the system
 */

/* System single instance */
let instance = null;

export default class System
{
  constructor()
  {
    this.queue = [];
    this.particle = null;
    this.initialStateVector = null;
  }

  static getInstance()
  {
    if (!instance)
    {
      instance = new System();
    }

    return instance;
  }

  static reset()
  {
    instance = null;
  }

  /**
   *
   * @param {Chain} chain
   * @returns {System}
   */
  run(chain)
  {
    let vector = this.getInitialStateVector();
    let particles = this.queue.slice();
    this.queue = [];
    this._run(chain, new State(particles, vector));
  }

  /**
   *
   * @param {Chain} chain
   * @param {State} state
   * @returns {undefined}
   */
  _run(chain, state) {
    const results = chain.getDevice().analyze(state);
    chain.forEach((nextChain, i) =>
    {
      this._run(nextChain, results[i]);
    });
  }

  /**
   * Instantiates a new particle
   *
   * @returns {Particle}
   */
  newParticle(energy) {
    return new this.particle(energy);
  }

  /**
   *
   * @returns {System}
   */
  addParticle(num, energy) {
    this.queue.push(...[].fill(energy, 0, num || 1).map(this.newParticle.bind(this)));
    return this;
  }

  /**
   *
   * @returns {Number} Particle.SPIN_*
   */
  getSpin() {
    return this.newParticle().getSpin();
  }

  /**
   *
   * @param {Util.Vector} state
   * @returns {System}
   */
  setInitialStateVector(vector) {
    this.initialStateVector = vector;
    return this;
  }

  /**
   *
   * @returns {Util.Vector}
   */
  getInitialStateVector() {
    return this.initialStateVector;
  }

  /**
   *
   * @param {Particle} particle
   * @returns {System}
   */
  setParticle(particle) {
    this.particle = particle;
    return this;
  }

  /**
   *
   * @returns {Particle}
   */
  getParticle() {
    return this.particle;
  }
}
