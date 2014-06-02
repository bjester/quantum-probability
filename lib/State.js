/**
 * Quantum State
 */
(function()
{
  var global = this,
      nspace = global,
      Particle = global.Particle.Particle,
      Util = global.Util,
      math = global.mathjs(),
      System = global.System,
      posi = math.i,
      negi = math.multiply(-1, math.i);

  /**
   *
   * @type State
   */
  var State = nspace.State = function(particles, vector)
  {
    this.particles = new Array();
    this.fill(particles, vector);
  };

  // Eigenvectors in z-basis
  // None of these are normalized, most need a factor of SQRT1_2
  State.EIGEN_VECTORS =
  {
    // Spin Half eigenvectors
    SPIN_HALF:
    {
      Z: [
        [
          [1],
          [0]
        ],
        [
          [0],
          [1]
        ]
      ],

      X: [
        [
          [1],
          [1]
        ],
        [
          [1],
          [-1]
        ]
      ],

      Y: [
        [
          [1],
          [posi]
        ],
        [
          [1],
          [negi]
        ]
      ]
    },

    // Spin 1 eigenvectors
    SPIN_ONE:
    {
      Z: [
        [
          [1],
          [0],
          [0]
        ],
        [
          [0],
          [1],
          [0]
        ],
        [
          [0],
          [0],
          [1]
        ]
      ],

      X: [
        [
          [math.SQRT1_2],
          [1],
          [math.SQRT1_2]
        ],
        [
          [1],
          [0],
          [-1]
        ],
        [
          [math.SQRT1_2],
          [-1],
          [math.SQRT1_2]
        ]
      ],

      Y: [
        [
          [math.SQRT1_2],
          [posi],
          [-1*math.SQRT1_2]
        ],
        [
          [1],
          [0],
          [1]
        ],
        [
          [math.SQRT1_2],
          [negi],
          [-1*math.SQRT1_2]
        ]
      ]
    }
  };

  // Spin Operators in z-basis
  State.OPERATORS =
  {
    SPIN_HALF:
    {
      Z: [
        [1,  0],
        [0, -1]
      ],

      X: [
        [0, 1],
        [1, 0]
      ],

      Y: [
        [0,    negi],
        [posi, 0   ]
      ]
    },

    SPIN_ONE:
    {
      Z: [
        [1,  0,  0],
        [0,  0,  0],
        [0,  0, -1]
      ],

      X: [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0]
      ],

      Y: [
        [0,    negi, 0   ],
        [posi, 0,    negi],
        [0,    posi, 0   ]
      ]
    }
  };
  
  State.SPIN_UP = 'up';
  State.SPIN_0 = '0';
  State.SPIN_DOWN = 'down';
  
  State.SPIN_Z = 'Z';
  State.SPIN_X = 'X';
  State.SPIN_Y = 'Y';

  State.SPINS = {};
  State.SPINS[Particle.SPIN_HALF] = State.EIGEN_VECTORS.SPIN_HALF;
  State.SPINS[Particle.SPIN_ONE] = State.EIGEN_VECTORS.SPIN_ONE;

  /**
   * Returns the state vector for certain spin and orientation (X,Y,Z)
   *
   * @param {String} orient State.SPIN_*
   * @param {Number[]} components
   * @returns {Util.Vector} Vector is normalized
   */
  State.getStateVector = function(orient, components)
  {
    var spin = global.System().getSpin(),
        v = new Util.Vector(State.SPINS[spin][orient]);
    v.setComponents(components);
    v.normalize();
    
    return v;
  };

  // Boolean indicating whether or not the State.EIGEN_VECTORS
  // and State.OPERATORS have be converted to math.matrix
  State.isInitialized = false;

  // Auto intialize
  (function()
  {
    if (State.isInitialized)
    {
      return;
    }

    State.isInitialized = true;

    var matrixize = function(set, vector)
    {
      for (var j in set)
      {
        if (vector)
        {
          for (var k = 0; k < set[j].length; k++)
          {
            set[j][k] = math.matrix(set[j][k]);
          }

          continue;
        }

        set[j] = math.matrix(set[j]);
      }
    };

    matrixize(State.EIGEN_VECTORS.SPIN_HALF, true);
    matrixize(State.EIGEN_VECTORS.SPIN_ONE, true);
    matrixize(State.OPERATORS.SPIN_HALF, false);
    matrixize(State.OPERATORS.SPIN_ONE, false);
  })();
  
  /**
   * Prototype of state
   */
  State.prototype = 
  {
    particles: null,
    multiplicity: null,
    orientation: null,
    vector: null,
    
    /**
     *
     * @param {Array} particles
     * @param {Util.Vector} vector
     * @returns {State}
     */
    fill: function(particles, vector)
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
    },
    
    /**
     * 
     * @param {Util.Vector} vector
     * @returns {State}
     */
    setVector: function(vector)
    {
      this.vector = vector;
      return this;
    },
    
    /**
     * 
     * @returns {Util.Vector}
     */
    getVector: function()
    {
      return this.vector;
    },
    
    /**
     * 
     * @returns {Particle[]}
     */
    getParticles: function()
    {
      return this.particles;
    },

    /**
     *
     * @returns {Particle[]}
     */
    setParticles: function(particles)
    {
      this.particles = particles;
      return this;
    }
  };
  
})();
