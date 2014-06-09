/**
 * Magnetic Field "analyzer", this isn't so much an analyzer as it is 
 * a state modifier. For purposes of programming, it is sufficient definition.
 *
 * This only supports spin 1/2
 */
(function()
{
  var global = this,
      nspace = global.Device,
      Device = nspace.Device,
      Util = global.Util,
      math = global.mathjs(),
      Exception = global.Exception;

  /**
   *
   * @type MagneticField
   */
  var MagneticField = nspace.MagneticField = function(direction, strength, width)
  {
    this.direction = direction;
    this.strength = strength || 1;
    this.width = width || 1;
  };

  /**
   * Sorts particles by energy
   *
   * @param {Particle[]} particles
   * @returns {{}}
   */
  MagneticField.sortParticlesByEnergy = function(particles)
  {
    var sorted = {};

    for (var i = 0; i < particles.length; i++)
    {
      var energy = particles[i].getEnergy();

      if (!Util.isArray(sorted[energy]))
      {
        sorted[energy] = new Array();
      }

      sorted[energy].push(particles[i]);
    }

    return sorted;
  };

  MagneticField.prototype = new Device();

  MagneticField.prototype.direction = null;
  MagneticField.prototype.strength = null;
  MagneticField.prototype.width = null;

  /**
   *
   * @param {State} state
   * @return {State}
   */
  MagneticField.prototype.evaluate = function(state)
  {
    var stateVector = state.getVector(),
      outputUpBasis = math.matrix([[0], [0]]),
      outputDownBasis = math.matrix([[0], [0]]);

    var bases = stateVector.getBasis();

    if (bases.length > 2)
    {
      throw new Exception.Unsupported();
    }

    var sortedParticles = MagneticField.sortParticlesByEnergy(
      state.getParticles());

    // Combine particles of different energy by adding their bases
    for (var energy in sortedParticles)
    {
      var particles = sortedParticles[energy],
          charge = particles[0].getCharge(),
          restMass = particles[0].getRestEnergy();

      // Calculate field time and oscillation frequency
      var time = this.calculateFieldTime(restMass, energy),
          phi = math.multiply(time, 2 * math.PI / 100); // This is arbitrary
      var omega = this.calculateOmega(restMass, charge);

      // Determine Hamiltonian
      var H = math.multiply(math.multiply(
        omega,
        1),
        State.OPERATORS.SPIN_HALF[this.direction]
      );

      // Two terms in Unitary expansion, sine and cosine, not including identity
      var sine = math.multiply(math.multiply(-1, math.sin(phi)), math.i);
      var cosine = math.subtract(math.cos(phi), 1);

      // Determine Unitary time evolution operator
      var U = math.add(math.add(
        math.eye(2), // Identity matrix
        math.multiply(sine, H)),
        math.multiply(cosine, math.multiply(H, H))
      );

      outputUpBasis = math.add(outputUpBasis, math.multiply(U, bases[0]));
      outputDownBasis = math.add(outputUpBasis, math.multiply(U, bases[1]));

//      outputUpBasis = math.round(
//        math.add(outputUpBasis, math.multiply(U, bases[0])), 9);
//      outputDownBasis = math.round(
//        math.add(outputUpBasis, math.multiply(U, bases[1])), 9);
    }

    var outputVector = new Util.Vector([outputUpBasis, outputDownBasis]);
    return new State(state.getParticles(), outputVector);
  };

  /**
   *
   * @param {Number} restMass
   * @param {Number} charge
   * @returns {Complex|*|Number|BigNumber|Complex|Unit|Array|Matrix}
   */
  MagneticField.prototype.calculateOmega = function(restMass, charge)
  {
    return math.divide(
      math.multiply(this.strength, math.abs(charge)),
      math.multiply(restMass, CONST.SPEED_OF_LIGHT * CONST.SPEED_OF_LIGHT));
  };

  /**
   *
   * @param {Number} restMass
   * @param {Number} energy
   * @returns {Complex|*|Number|BigNumber|Complex|Unit|Array|Matrix}
   */
  MagneticField.prototype.calculateFieldTime = function(restMass, energy)
  {
    // We expect energy to be in 'eV' so we use rest energy, so we
    // multiply by 'c'
    return math.divide(
      this.width,
      math.multiply(CONST.SPEED_OF_LIGHT,
        math.sqrt(
          math.divide(
            math.number(energy), math.multiply(2, restMass)
          )
        )
      )
    );
  };

})();
