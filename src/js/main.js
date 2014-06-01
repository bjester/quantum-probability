/**
 * Quantum Probability
 * 
 * Main Execution script
 */
(function($)
{
  var global = this,
      ui = null,
      main = {};
  
  main.init = function()
  {
    global.ui = ui = new global.UI.UserInterface(
    { 
      header: 'body > header',
      menu: 'body > aside',
      content: 'body > section'
    });

    ui.addMenu('main',
    {
      name: 'Main Menu',
      id: 'Main',
      items: 
      [
        {type: 'standard', icon: 'home', title: 'Home', action: 'page/home'},
        {type: 'standard', icon: 'info', title: 'About', action: 'page/about'},
        {type: 'standard', icon: 'plus', title: 'Add Device', action: 'menu/add'},
        {type: 'standard', icon: 'cog', title: 'Settings', action: 'page/settings'},
        {type: 'standard', icon: 'help', title: 'Help', action: 'page/help'}
      ]
    });

    ui.addMenu('add',
    {
      name: 'Add Device',
      id: 'Add',
      items: 
      [
        {type: 'standard', icon: 'reply', title: 'Go Back', action: 'menu/main'},
        {type: 'device', src: '/images/system/oven.svg', title: 'Oven', action: 'add/oven'},
        {type: 'device', src: '/images/system/sg2z.svg', title: 'Analyzer', action: 'add/analyzer'},
        {type: 'device', src: '/images/system/magneticFieldz.svg', title: 'MagneticField', action: 'add/magneticField'},
        {type: 'device', src: '/images/system/detector.svg', title: 'Detector', action: 'add/detector'}
      ]
    });
    
//    var menuButton = $('#MenuButton'),
//        translate = $('.Translate');
    
    
    $('#MenuButton').on('click', function()
    {
      if (ui.menuOpen)
      {
        ui.closeMenu();
      }
      else
      {
        ui.openMenu('main');
      }
    });

    ui.fillMenu('main');

    var content = $('body > section');

    var pos = (content.width() < 1280)
      ? 1280 / 6
      : (content.width()) / 6;

    var height = 70;

    var oven = ui.canvas.display.image({
      x: pos,
      y: 120,
      origin: { x: "center", y: "center" },
      image: "/images/system/oven.svg",
      height: height,
      width: height*1.41196,
      zIndex: 10
    });

    var line1 = ui.canvas.display.line({
      start: { x: pos+(height/2), y: 120 },
      end: { x: 2*pos, y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line1);

    var analyzer = ui.canvas.display.image({
      x: (2*pos),
      y: 120,
      origin: { x: "center", y: "center" },
      image: "/images/system/sg2z.svg",
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line2 = ui.canvas.display.line({
      start: { x: (2*pos)+(height/2), y: 120-(height/3) },
      end: { x: (3*pos)-(height/2), y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line2);

    var analyzer2 = ui.canvas.display.image({
      x: (3*pos),
      y: 120,
      origin: { x: "center", y: "center" },
      image: "/images/system/sg2x.svg",
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line3 = ui.canvas.display.line({
      start: { x: (3*pos)+(height/2), y: 120-(height/3) },
      end: { x: (4*pos)-(height/2), y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line3);

    var analyzer3 = ui.canvas.display.image({
      x: (4*pos),
      y: 120,
      origin: { x: "center", y: "center" },
      image: "/images/system/sg2z.svg",
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line4 = ui.canvas.display.line({
      start: { x: (4*pos)+(height/2), y: 120-(height/3) },
      end: { x: (5*pos)-(height/2), y: 80 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line4);

    var line5 = ui.canvas.display.line({
      start: { x: (4*pos)+(height/2), y: 120+(height/3) },
      end: { x: (5*pos)-(height/2), y: 160 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line5);

    var detector1 = ui.canvas.display.image({
      x: (5*pos),
      y: 160,
      origin: { x: "center", y: "center" },
      image: "/images/system/detector.svg",
      height: height,
      width: height*1.52117,
      zIndex: 10
    });

    var detector2 = ui.canvas.display.image({
      x: (5*pos),
      y: 80,
      origin: { x: "center", y: "center" },
      image: "/images/system/detector.svg",
      height: height,
      width: height*1.52117,
      zIndex: 10
    });

    ui.canvas.addChild(oven);
    ui.canvas.addChild(analyzer);
    ui.canvas.addChild(analyzer2);
    ui.canvas.addChild(analyzer3);
    ui.canvas.addChild(detector1);
    ui.canvas.addChild(detector2);

    var timeResize = null;
    $(global).resize(function()
    {
      global.clearTimeout(timeResize);
      timeResize = global.setTimeout(function()
      {
        ui.canvas.width = content.width();
        ui.canvas.height = content.height();
      }, 200);
    }).trigger('resize');



    var dUp = ui.canvas.display.text(
    {
      x: (5*pos)+20,
      y: 80,
      origin: { x: "center", y: "center" },
      font: "bold 30px sans-serif",
      text: "0",
      fill: "#000"
    });

    var dDown = ui.canvas.display.text(
    {
      x: (5*pos)+20,
      y: 160,
      origin: { x: "center", y: "center" },
      font: "bold 30px sans-serif",
      text: "0",
      fill: "#000"
    });

    ui.canvas.addChild(dUp);
    ui.canvas.addChild(dDown);

    /**
     * @param {Number} num
     * @returns {Array}
     */
    var getParticle = function(num)
    {
      var particles = new Array();

      for (var i = 0; i < num; i++)
      {
        particles.push(new Particle.Electron());
      }

      return particles;
    };

    /**
     * @returns {State}
     */
    var getState = function(num, orient)
    {
      orient = orient || State.EIGEN_VECTORS.SPIN_HALF.Z;
      return new State(getParticle(num), new Util.Vector(orient));
    };

    /**
     * @returns {Device.Analyzer}
     */
    var getAnalyzer = function(orient)
    {
      orient = orient || State.EIGEN_VECTORS.SPIN_HALF.X;
      var v = new Util.Vector(orient);
      return new Device.Analyzer(v);
    };

    var a1 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF.Z);
    var a2 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF.X);
    var a3 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF.Z);

    ui.canvas.setLoop(function()
    {
      var state = getState(50);
      var results = a3.evaluate(a2.evaluate(a1.evaluate(state)[0])[0]);

//      console.log(dUp.text, parseInt(dUp.text), results[0].length)
      dUp.text = '' + (parseInt(dUp.text) + results[0].getParticles().length);
      dDown.text = '' + (parseInt(dDown.text) + results[1].getParticles().length);
    });

    $('#play').on("click", function()
    {
      $(this).hide();
      $("#pause").show();
      ui.canvas.timeline.start();
    });

    $('#pause').on("click", function()
    {
      $(this).hide();
      $("#play").show();
      ui.canvas.timeline.stop();
    });

    console.log(dUp);
  };
  
  $(function()
  {
    global.location.href = '#';

    // Load micro templates
    $.get('templates.html', function(data)
    {
      $('body').append(data);
      main.init();
    });
  });
  
})(jQuery);
