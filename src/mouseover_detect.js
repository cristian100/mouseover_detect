/** 
 * mouseover_detect - jQuery Mouse over detector.
 * Copyright 2019 Cristian Antonio Gonzalez Cienfuegos All Rights Reserved
 * Website: http://d4all.mx/plugin/mouseover_detect
 * Version 1.0 
 */
(function($) {
  "use strict";

  /**
   * MOD class: mouseover_detect.
   */
  var mod = function(options) {

    /**
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;
    var mousedetect = 0;
    var touchstart_flag = 0;

    /**
     * Constructor
     */
    this.construct = function(options){
      $.extend(vars, options);
    };

    /**
     * Returns true if the browser supports mouseover events.
     */
    this.hasMouseOver = function () {
      if ($('html').hasClass('has-mouseover')) {
        return true;
      }

      return false;
    }

    /**
     * Adds has-mouseover classes.
     */
    this.addMouseOverClass = function (time) {
      if (time == 0) {
        $('html').addClass('has-mouseover');
      }
      else {
        $('html').addClass('has-mouseover-' + time);
      }
    }

    /**
     * Adds has-mouseover class timmed.
     */
    this.addMouseOverClassTimmeout = function (time) {
      setTimeout(root.addMouseOverClass.bind(this), time, time);
    }

    /**
     * Adds has-mouseover classes.
     */
    this.addMouseOverClasses = function () {
      root.addMouseOverClassTimmeout(0);
      root.addMouseOverClassTimmeout(500);
      root.addMouseOverClassTimmeout(1000);
    }

    /**
     * Init script.
     */
    this.init = function () {

      /**
       * If users uses mouse wheel mouseover is detected.
       */
      $(document).on('wheel', function() {
        root.mousedetect = 1;
  
        root.addMouseOverClasses();
        $(document).off('wheel');
      });

      /**
       * If users uses touch make note of it.
       */
      $(document).on('touchstart', function() {
        root.touchstart_flag = 1;
      });

      /**
       * If user uses mouse mouseover is detected.
       */
      $(document).on('mousemove', function() {
        // Avoid false mouse event from touch triggered event.
        if (root.touchstart_flag == 1) {
          return;
        }

        // Add mouseover classes at this point.
        root.addMouseOverClasses();

        root.mousedetect = 1;
        $(document).off('mousemove');
      });

      /**
       * Add hover class to any object that has hover-here class
       * this will enable to add css to any desired object
       * and this will work only if browser has mouseover detected.
       */
      $(document).on('mouseenter', '.hover-here', function() {
        if (root.hasMouseOver()) {
          $(this).addClass('hover');
        }
      });
    
      $(document).on('mouseleave', '.hover-here', function() {
        if (root.hasMouseOver()) {
          $(this).removeClass('hover');
        }
      });
    }
  }

  /**
   * Initializes mod class.
   */
  window.mod = new mod();
  window.mod.init();

}(jQuery));
