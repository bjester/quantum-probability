/**
 * Quantum Probability
 * 
 * Main Execution script
 */
(function($)
{
  var global = this,
      interface = null,
      main = {};
  
  main.init = function()
  {
    interface = new global.Interface.Interface(
    { 
      header: 'body > header',
      menu: 'body > aside',
      content: 'body > section'
    });
    
    var menuButton = $('#MenuButton'),
        translate = $('.Translate');
    var menuOpen = function()
    {
      translate.transition(
      {
        translate: [280, 0, 0]
      },
      function()
      {
        console.log('open');
        menuButton.one('click', menuClose);
      });
    };
    
    var menuClose = function()
    {
      translate.transition(
      {
        translate: [0, 0, 0]
      },
      function()
      {
        console.log('close');
        menuButton.one('click', menuOpen);
      });
    };
    
    $('#MenuButton').one('click', menuOpen);
  };
  
  global.onload = function()
  {
    main.init();
  };
  
})(jQuery);
