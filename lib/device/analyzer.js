import { square } from "mathjs";
import Device from './device';
import { innerProduct } from "../util/vector";

/**
 * Stern Gerlach analyzer
 */
export default class Analyzer extends Device
{
  evaluate(state)
  {
    const bases = this.vector.getBasis().map((_, i) => this.vector.getBasisVector(i));

    // Calculate probabilities
    const probabilities = bases.map(basisVector =>
    {
      return square(innerProduct(basisVector, state.getVector()));
    })

    return Device.generateStates(
      Device.sortParticlesByProbability(state.getParticles(), probabilities),
      bases
    );
  }
}

