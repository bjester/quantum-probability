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
    var query = global.location.href.replace(/[^?]+\?([^#]+).*/, '$1');
    var params = {};

    if (query)
    {
      params = $.unserialize(query);
    }

    if (!('state' in params))
    {
      params.state = ['z',1,1];
    }
    else
    {
      params.state = params.state.split(',');
      params.state[1] = parseInt(params.state[1]);
      params.state[2] = parseInt(params.state[2]);
    }

    if (!('analyzer' in params))
    {
      params.analyzer = ['z','x','z'];
    }
    else
    {
      params.analyzer = params.analyzer.split(',');
    }

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

    var pos = (content.width() < 600)
      ? 600 / 5
      : (content.width()) / 5;

    var height = 70;

    var oven = ui.canvas.display.image({
      x: pos-(pos/2),
      y: 120,
      origin: { x: "center", y: "center" },
      image: "/images/system/oven.svg",
      height: height,
      width: height*1.41196,
      zIndex: 10
    });

    var line1 = ui.canvas.display.line({
      start: { x: pos-(pos/2)+(height/2), y: 120 },
      end: { x: (2*pos)-(pos/2), y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line1);

    var getAnalyzerImage = function(i)
    {
      return "/images/system/sg2" + params.analyzer[i] + ".svg";
    };

    var analyzer = ui.canvas.display.image({
      x: (2*pos)-(pos/2),
      y: 120,
      origin: { x: "center", y: "center" },
      image: getAnalyzerImage(0),
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line2 = ui.canvas.display.line({
      start: { x: (2*pos)-(pos/2)+(height/2), y: 120-(height/3) },
      end: { x: (3*pos)-(pos/2)-(height/2), y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line2);

    var analyzer2 = ui.canvas.display.image({
      x: (3*pos)-(pos/2),
      y: 120,
      origin: { x: "center", y: "center" },
      image: getAnalyzerImage(1),
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line3 = ui.canvas.display.line({
      start: { x: (3*pos)-(pos/2)+(height/2), y: 120-(height/3) },
      end: { x: (4*pos)-(pos/2)-(height/2), y: 120 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line3);

    var analyzer3 = ui.canvas.display.image({
      x: (4*pos)-(pos/2),
      y: 120,
      origin: { x: "center", y: "center" },
      image: getAnalyzerImage(2),
      height: height,
      width: height*1.24941,
      zIndex: 10
    });

    var line4 = ui.canvas.display.line({
      start: { x: (4*pos)-(pos/2)+(height/2), y: 120-(height/3) },
      end: { x: (5*pos)-(pos/2)-(height/2), y: 80 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line4);

    var line5 = ui.canvas.display.line({
      start: { x: (4*pos)-(pos/2)+(height/2), y: 120+(height/3) },
      end: { x: (5*pos)-(pos/2)-(height/2), y: 160 },
      stroke: "5px #ddd",
      zIndex:1
    });

    ui.canvas.addChild(line5);

    var detector1 = ui.canvas.display.image({
      x: (5*pos)-(pos/2),
      y: 160,
      origin: { x: "center", y: "center" },
      image: "/images/system/detector.svg",
      height: height,
      width: height*1.52117,
      zIndex: 10
    });

    var detector2 = ui.canvas.display.image({
      x: (5*pos)-(pos/2),
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


    var down1 = ui.canvas.display.text(
    {
      x: (2*pos)-(pos/2)+60,
      y: 130,
      origin: { x: "left", y: "top" },
      font: "bold 25px sans-serif",
      text: "0",
      fill: "#fff"
    });

    var down2 = ui.canvas.display.text(
    {
      x: (3*pos)-(pos/2)+60,
      y: 130,
      origin: { x: "left", y: "top" },
      font: "bold 25px sans-serif",
      text: "0",
      fill: "#fff"
    });

    var dUp = ui.canvas.display.text(
    {
      x: (5*pos)-(pos/2)+20,
      y: 80,
      origin: { x: "center", y: "center" },
      font: "bold 25px sans-serif",
      text: "0",
      fill: "#000"
    });

    var dDown = ui.canvas.display.text(
    {
      x: (5*pos)-(pos/2)+20,
      y: 160,
      origin: { x: "center", y: "center" },
      font: "bold 25px sans-serif",
      text: "0",
      fill: "#000"
    });

    ui.canvas.addChild(down1);
    ui.canvas.addChild(down2);
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
    var getState = function(num)
    {
      orient = State.EIGEN_VECTORS.SPIN_HALF[params.state[0].toUpperCase()];
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

    var a1 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF[params.analyzer[0].toUpperCase()]);
    var a2 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF[params.analyzer[1].toUpperCase()]);
    var a3 = getAnalyzer(State.EIGEN_VECTORS.SPIN_HALF[params.analyzer[2].toUpperCase()]);

    var updateText = function(obj, result)
    {
      obj.text = '' + (parseInt(obj.text) + result.getParticles().length);
    };

    var state = getState(1);
    state.getVector().setComponents(params.state.slice(1)).normalize();

    ui.canvas.setLoop(function()
    {
      state.setParticles(getParticle(50));

      var output1 = a1.evaluate(state);
      var output2 = a2.evaluate(output1[0]);
      var output3 = a3.evaluate(output2[0]);

      updateText(down1, output1[1]);
      updateText(down2, output2[1]);
      updateText(dUp, output3[0]);
      updateText(dDown, output3[1]);
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
  };
  
  $(function()
  {
    // Load micro templates
    $.get('templates.html', function(data)
    {
      $('body').append(data);
      main.init();
      global.location.href = '#';
    });
  });
  
})(jQuery);

/**
 * $.unserialize
 *
 * Takes a string in format "param1=value1&param2=value2" and returns an object { param1: 'value1', param2: 'value2' }. If the "param1" ends with "[]" the param is treated as an array.
 *
 * Example:
 *
 * Input:  param1=value1&param2=value2
 * Return: { param1 : value1, param2: value2 }
 *
 * Input:  param1[]=value1&param1[]=value2
 * Return: { param1: [ value1, value2 ] }
 *
 * @todo Support params like "param1[name]=value1" (should return { param1: { name: value1 } })
 * Usage example: console.log($.unserialize("one="+escape("& = ?")+"&two="+escape("value1")+"&two="+escape("value2")+"&three[]="+escape("value1")+"&three[]="+escape("value2")));
 */
(function($){
  $.unserialize = function(serializedString){
    var str = decodeURI(serializedString);
    var pairs = str.split('&');
    var obj = {}, p, idx;
    for (var i=0, n=pairs.length; i < n; i++) {
      p = pairs[i].split('=');
      idx = p[0];
      if (obj[idx] === undefined) {
        obj[idx] = unescape(p[1]);
      }else{
        if (typeof obj[idx] == "string") {
          obj[idx]=[obj[idx]];
        }
        obj[idx].push(unescape(p[1]));
      }
    }
    return obj;q
  };
})(jQuery);