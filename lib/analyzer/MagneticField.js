/**
 * Magnetic Field "analyzer", this isn't so much an analyzer as it is 
 * a state modifier. For purposes of programming, it is sufficient definition.
 *
 * This only supports spin 1/2
 */
(function()
{
  var global = this,
      nspace = global.Analyzer,
      Analyzer = nspace.Analyzer,
      Util = global.Util,
      math = global.mathjs(),
      Exception = global.Exception;

  /**
   *
   * @type MagneticField
   */
  var MagneticField = nspace.MagneticField = function(direction, strength, width)
  {
    this.__construct(direction);
    this.vector.scale(strength);
    this.width = width;
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

  MagneticField.prototype = new Analyzer();

  MagneticField.prototype.strength = null;
  MagneticField.prototype.width = null;

  /**
   *
   * @param {State} state
   * @return {State}
   */
  MagneticField.prototype.analyze = function(state)
  {
    var sortedParticles = MagneticField.sortParticlesByEnergy(
      state.getParticles());

    var bases = state.getBasis(),
        orderedParticles = bases.map(function()
        {
          return [];
        });

    if (bases.length > 2)
    {
      throw new Exception.Unsupported();
    }

    for (var energy in sortedParticles)
    {
      var particles = sortedParticles[energy],
          mass = particles[0].getMass(),
          charge = particles[0].getCharge(),
          restMass = particles[0].getRestEnergy();

      // We expect energy to be in 'eV' so we use rest energy, so we
      // multiply by 'c'
      var time = math.divide(
        this.width,
        math.multiply(CONST.SPEED_OF_LIGHT,
          math.sqrt(
            math.divide(
              math.number(energy), math.multiply(2, restMass)
            )
          )
        )
      );

      // Calculate oscillation frequencies
      var omega0 = this.getOmega(0, mass, charge),
          omega1 = this.getOmega(1, mass, charge);

      // Determine spin flip probability
      var omegaSqSum = math.add(math.square(omega0), math.square(omega1)),
        spinFlip = math.multiply(
          math.divide(math.square(omega1), omegaSqSum),
          math.square(
            math.sin(
              math.divide(
                math.multiply(math.sqrt(omegaSqSum), time),
                2
              )
            )
          )
        );

      var sternGerlach = new Analyzer.SternGerlach(bases),
          sgResults = sternGerlach.analyze(state);

      // TODO handle up particles for different energies
    }

    return result;
  };

  /**
   *
   * @param {Number} index
   * @param {Number} mass
   * @param {Number} charge
   * @returns {Complex|*|Number|BigNumber|Complex|Unit|Array|Matrix}
   */
  MagneticField.prototype.getOmega = function(index, mass, charge)
  {
    var comps = this.vector.getComponents();

    return math.divide(math.multiply(comp[index], math.abs(charge)), mass);
  };

})();
