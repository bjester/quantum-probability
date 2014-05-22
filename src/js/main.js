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
        {type: 'device', src: '/images/system/magneticFieldz.svg', title: 'MagneticField', action: 'magneticField'},
        {type: 'device', src: '/images/system/detector.svg', title: 'Detector', action: 'detector'}
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
