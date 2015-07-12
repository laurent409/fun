//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/fezvrasta:bootstrap-material-design/dist/js/material.js                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/* globals jQuery */                                                                                                // 1
                                                                                                                    // 2
(function($) {                                                                                                      // 3
  // Selector to select only not already processed elements                                                         // 4
  $.expr[":"].notmdproc = function(obj){                                                                            // 5
    if ($(obj).data("mdproc")) {                                                                                    // 6
      return false;                                                                                                 // 7
    } else {                                                                                                        // 8
      return true;                                                                                                  // 9
    }                                                                                                               // 10
  };                                                                                                                // 11
                                                                                                                    // 12
  function _isChar(evt) {                                                                                           // 13
    if (typeof evt.which == "undefined") {                                                                          // 14
      return true;                                                                                                  // 15
    } else if (typeof evt.which == "number" && evt.which > 0) {                                                     // 16
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 && evt.which != 9;                       // 17
    }                                                                                                               // 18
    return false;                                                                                                   // 19
  }                                                                                                                 // 20
                                                                                                                    // 21
  $.material =  {                                                                                                   // 22
    "options": {                                                                                                    // 23
      // These options set what will be started by $.material.init()                                                // 24
      "input": true,                                                                                                // 25
      "ripples": true,                                                                                              // 26
      "checkbox": true,                                                                                             // 27
      "togglebutton": true,                                                                                         // 28
      "radio": true,                                                                                                // 29
      "arrive": true,                                                                                               // 30
      "autofill": false,                                                                                            // 31
                                                                                                                    // 32
      "withRipples": [                                                                                              // 33
        ".btn:not(.btn-link)",                                                                                      // 34
        ".card-image",                                                                                              // 35
        ".navbar a:not(.withoutripple)",                                                                            // 36
        ".dropdown-menu a",                                                                                         // 37
        ".nav-tabs a:not(.withoutripple)",                                                                          // 38
        ".withripple"                                                                                               // 39
      ].join(","),                                                                                                  // 40
      "inputElements": "input.form-control, textarea.form-control, select.form-control",                            // 41
      "checkboxElements": ".checkbox > label > input[type=checkbox]",                                               // 42
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",                                       // 43
      "radioElements": ".radio > label > input[type=radio]"                                                         // 44
    },                                                                                                              // 45
    "checkbox": function(selector) {                                                                                // 46
      // Add fake-checkbox to material checkboxes                                                                   // 47
      $((selector) ? selector : this.options.checkboxElements)                                                      // 48
      .filter(":notmdproc")                                                                                         // 49
      .data("mdproc", true)                                                                                         // 50
      .after("<span class=checkbox-material><span class=check></span></span>");                                     // 51
    },                                                                                                              // 52
    "togglebutton": function(selector) {                                                                            // 53
      // Add fake-checkbox to material checkboxes                                                                   // 54
      $((selector) ? selector : this.options.togglebuttonElements)                                                  // 55
      .filter(":notmdproc")                                                                                         // 56
      .data("mdproc", true)                                                                                         // 57
      .after("<span class=toggle></span>");                                                                         // 58
    },                                                                                                              // 59
    "radio": function(selector) {                                                                                   // 60
      // Add fake-radio to material radios                                                                          // 61
      $((selector) ? selector : this.options.radioElements)                                                         // 62
      .filter(":notmdproc")                                                                                         // 63
      .data("mdproc", true)                                                                                         // 64
      .after("<span class=circle></span><span class=check></span>");                                                // 65
    },                                                                                                              // 66
    "input": function(selector) {                                                                                   // 67
      $((selector) ? selector : this.options.inputElements)                                                         // 68
      .filter(":notmdproc")                                                                                         // 69
      .data("mdproc", true)                                                                                         // 70
      .each( function() {                                                                                           // 71
        var $this = $(this);                                                                                        // 72
                                                                                                                    // 73
        if (!$(this).attr("data-hint") && !$this.hasClass("floating-label")) {                                      // 74
          return;                                                                                                   // 75
        }                                                                                                           // 76
        $this.wrap("<div class=form-control-wrapper></div>");                                                       // 77
        $this.after("<span class=material-input></span>");                                                          // 78
                                                                                                                    // 79
        // Add floating label if required                                                                           // 80
        if ($this.hasClass("floating-label")) {                                                                     // 81
          var placeholder = $this.attr("placeholder");                                                              // 82
          $this.attr("placeholder", null).removeClass("floating-label");                                            // 83
          $this.after("<div class=floating-label>" + placeholder + "</div>");                                       // 84
        }                                                                                                           // 85
                                                                                                                    // 86
        // Add hint label if required                                                                               // 87
        if ($this.attr("data-hint")) {                                                                              // 88
          $this.after("<div class=hint>" + $this.attr("data-hint") + "</div>");                                     // 89
        }                                                                                                           // 90
                                                                                                                    // 91
        // Set as empty if is empty (damn I must improve this...)                                                   // 92
        if ($this.val() === null || $this.val() == "undefined" || $this.val() === "") {                             // 93
          $this.addClass("empty");                                                                                  // 94
        }                                                                                                           // 95
                                                                                                                    // 96
        // Support for file input                                                                                   // 97
        if ($this.parent().next().is("[type=file]")) {                                                              // 98
          $this.parent().addClass("fileinput");                                                                     // 99
          var $input = $this.parent().next().detach();                                                              // 100
          $this.after($input);                                                                                      // 101
        }                                                                                                           // 102
      });                                                                                                           // 103
                                                                                                                    // 104
      $(document)                                                                                                   // 105
      .on("change", ".checkbox input[type=checkbox]", function() { $(this).blur(); })                               // 106
      .on("keydown paste", ".form-control", function(e) {                                                           // 107
        if(_isChar(e)) {                                                                                            // 108
          $(this).removeClass("empty");                                                                             // 109
        }                                                                                                           // 110
      })                                                                                                            // 111
      .on("keyup change", ".form-control", function() {                                                             // 112
        var $this = $(this);                                                                                        // 113
        if ($this.val() === "" && (typeof $this[0].checkValidity != "undefined" && $this[0].checkValidity())) {     // 114
          $this.addClass("empty");                                                                                  // 115
        } else {                                                                                                    // 116
          $this.removeClass("empty");                                                                               // 117
        }                                                                                                           // 118
      })                                                                                                            // 119
      .on("focus", ".form-control-wrapper.fileinput", function() {                                                  // 120
        $(this).find("input").addClass("focus");                                                                    // 121
      })                                                                                                            // 122
      .on("blur", ".form-control-wrapper.fileinput", function() {                                                   // 123
        $(this).find("input").removeClass("focus");                                                                 // 124
      })                                                                                                            // 125
      .on("change", ".form-control-wrapper.fileinput [type=file]", function() {                                     // 126
        var value = "";                                                                                             // 127
        $.each($(this)[0].files, function(i, file) {                                                                // 128
          value += file.name + ", ";                                                                                // 129
        });                                                                                                         // 130
        value = value.substring(0, value.length - 2);                                                               // 131
        if (value) {                                                                                                // 132
          $(this).prev().removeClass("empty");                                                                      // 133
        } else {                                                                                                    // 134
          $(this).prev().addClass("empty");                                                                         // 135
        }                                                                                                           // 136
        $(this).prev().val(value);                                                                                  // 137
      });                                                                                                           // 138
    },                                                                                                              // 139
    "ripples": function(selector) {                                                                                 // 140
      $((selector) ? selector : this.options.withRipples).ripples();                                                // 141
    },                                                                                                              // 142
    "autofill": function() {                                                                                        // 143
                                                                                                                    // 144
      // This part of code will detect autofill when the page is loading (username and password inputs for example) // 145
      var loading = setInterval(function() {                                                                        // 146
        $("input[type!=checkbox]").each(function() {                                                                // 147
          if ($(this).val() && $(this).val() !== $(this).attr("value")) {                                           // 148
            $(this).trigger("change");                                                                              // 149
          }                                                                                                         // 150
        });                                                                                                         // 151
      }, 100);                                                                                                      // 152
                                                                                                                    // 153
      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them     // 154
      setTimeout(function() {                                                                                       // 155
        clearInterval(loading);                                                                                     // 156
      }, 10000);                                                                                                    // 157
      // Now we just listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;                                                                                                  // 159
      $(document)                                                                                                   // 160
      .on("focus", "input", function() {                                                                            // 161
        var $inputs = $(this).parents("form").find("input").not("[type=file]");                                     // 162
        focused = setInterval(function() {                                                                          // 163
          $inputs.each(function() {                                                                                 // 164
            if ($(this).val() !== $(this).attr("value")) {                                                          // 165
              $(this).trigger("change");                                                                            // 166
            }                                                                                                       // 167
          });                                                                                                       // 168
        }, 100);                                                                                                    // 169
      })                                                                                                            // 170
      .on("blur", "input", function() {                                                                             // 171
        clearInterval(focused);                                                                                     // 172
      });                                                                                                           // 173
    },                                                                                                              // 174
    "init": function() {                                                                                            // 175
      if ($.fn.ripples && this.options.ripples) {                                                                   // 176
        this.ripples();                                                                                             // 177
      }                                                                                                             // 178
      if (this.options.input) {                                                                                     // 179
        this.input();                                                                                               // 180
      }                                                                                                             // 181
      if (this.options.checkbox) {                                                                                  // 182
        this.checkbox();                                                                                            // 183
      }                                                                                                             // 184
      if (this.options.togglebutton) {                                                                              // 185
        this.togglebutton();                                                                                        // 186
      }                                                                                                             // 187
      if (this.options.radio) {                                                                                     // 188
        this.radio();                                                                                               // 189
      }                                                                                                             // 190
      if (this.options.autofill) {                                                                                  // 191
        this.autofill();                                                                                            // 192
      }                                                                                                             // 193
                                                                                                                    // 194
      if (document.arrive && this.options.arrive) {                                                                 // 195
        if ($.fn.ripples && this.options.ripples) {                                                                 // 196
          $(document).arrive(this.options.withRipples, function() {                                                 // 197
            $.material.ripples($(this));                                                                            // 198
          });                                                                                                       // 199
        }                                                                                                           // 200
        if (this.options.input) {                                                                                   // 201
          $(document).arrive(this.options.inputElements, function() {                                               // 202
            $.material.input($(this));                                                                              // 203
          });                                                                                                       // 204
        }                                                                                                           // 205
        if (this.options.checkbox) {                                                                                // 206
          $(document).arrive(this.options.checkboxElements, function() {                                            // 207
            $.material.checkbox($(this));                                                                           // 208
          });                                                                                                       // 209
        }                                                                                                           // 210
        if (this.options.radio) {                                                                                   // 211
          $(document).arrive(this.options.radioElements, function() {                                               // 212
            $.material.radio($(this));                                                                              // 213
          });                                                                                                       // 214
        }                                                                                                           // 215
        if (this.options.togglebutton) {                                                                            // 216
          $(document).arrive(this.options.togglebuttonElements, function() {                                        // 217
            $.material.togglebutton($(this));                                                                       // 218
          });                                                                                                       // 219
        }                                                                                                           // 220
                                                                                                                    // 221
      }                                                                                                             // 222
    }                                                                                                               // 223
  };                                                                                                                // 224
                                                                                                                    // 225
})(jQuery);                                                                                                         // 226
                                                                                                                    // 227
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/fezvrasta:bootstrap-material-design/dist/js/ripples.js                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals jQuery, navigator */                                                                                     // 2
                                                                                                                    // 3
(function($, window, document, undefined) {                                                                         // 4
                                                                                                                    // 5
  "use strict";                                                                                                     // 6
                                                                                                                    // 7
  /**                                                                                                               // 8
   * Define the name of the plugin                                                                                  // 9
   */                                                                                                               // 10
  var ripples = "ripples";                                                                                          // 11
                                                                                                                    // 12
                                                                                                                    // 13
  /**                                                                                                               // 14
   * Get an instance of the plugin                                                                                  // 15
   */                                                                                                               // 16
  var self = null;                                                                                                  // 17
                                                                                                                    // 18
                                                                                                                    // 19
  /**                                                                                                               // 20
   * Define the defaults of the plugin                                                                              // 21
   */                                                                                                               // 22
  var defaults = {};                                                                                                // 23
                                                                                                                    // 24
                                                                                                                    // 25
  /**                                                                                                               // 26
   * Create the main plugin function                                                                                // 27
   */                                                                                                               // 28
  function Ripples(element, options) {                                                                              // 29
    self = this;                                                                                                    // 30
                                                                                                                    // 31
    this.element = $(element);                                                                                      // 32
                                                                                                                    // 33
    this.options = $.extend({}, defaults, options);                                                                 // 34
                                                                                                                    // 35
    this._defaults = defaults;                                                                                      // 36
    this._name = ripples;                                                                                           // 37
                                                                                                                    // 38
    this.init();                                                                                                    // 39
  }                                                                                                                 // 40
                                                                                                                    // 41
                                                                                                                    // 42
  /**                                                                                                               // 43
   * Initialize the plugin                                                                                          // 44
   */                                                                                                               // 45
  Ripples.prototype.init = function() {                                                                             // 46
    var $element  = this.element;                                                                                   // 47
                                                                                                                    // 48
    $element.on("mousedown touchstart", function(event) {                                                           // 49
      /**                                                                                                           // 50
       * Verify if the user is just touching on a device and return if so                                           // 51
       */                                                                                                           // 52
      if(self.isTouch() && event.type === "mousedown") {                                                            // 53
        return;                                                                                                     // 54
      }                                                                                                             // 55
                                                                                                                    // 56
                                                                                                                    // 57
      /**                                                                                                           // 58
       * Verify if the current element already has a ripple wrapper element and                                     // 59
       * creates if it doesn't                                                                                      // 60
       */                                                                                                           // 61
      if(!($element.find(".ripple-wrapper").length)) {                                                              // 62
        $element.append("<div class=\"ripple-wrapper\"></div>");                                                    // 63
      }                                                                                                             // 64
                                                                                                                    // 65
                                                                                                                    // 66
      /**                                                                                                           // 67
       * Find the ripple wrapper                                                                                    // 68
       */                                                                                                           // 69
      var $wrapper = $element.children(".ripple-wrapper");                                                          // 70
                                                                                                                    // 71
                                                                                                                    // 72
      /**                                                                                                           // 73
       * Get relY and relX positions                                                                                // 74
       */                                                                                                           // 75
      var relY = self.getRelY($wrapper, event);                                                                     // 76
      var relX = self.getRelX($wrapper, event);                                                                     // 77
                                                                                                                    // 78
                                                                                                                    // 79
      /**                                                                                                           // 80
       * If relY and/or relX are false, return the event                                                            // 81
       */                                                                                                           // 82
      if(!relY && !relX) {                                                                                          // 83
        return;                                                                                                     // 84
      }                                                                                                             // 85
                                                                                                                    // 86
                                                                                                                    // 87
      /**                                                                                                           // 88
       * Get the ripple color                                                                                       // 89
       */                                                                                                           // 90
      var rippleColor = self.getRipplesColor($element);                                                             // 91
                                                                                                                    // 92
                                                                                                                    // 93
      /**                                                                                                           // 94
       * Create the ripple element                                                                                  // 95
       */                                                                                                           // 96
      var $ripple = $("<div></div>");                                                                               // 97
                                                                                                                    // 98
      $ripple                                                                                                       // 99
      .addClass("ripple")                                                                                           // 100
      .css({                                                                                                        // 101
        "left": relX,                                                                                               // 102
        "top": relY,                                                                                                // 103
        "background-color": rippleColor                                                                             // 104
      });                                                                                                           // 105
                                                                                                                    // 106
                                                                                                                    // 107
      /**                                                                                                           // 108
       * Append the ripple to the wrapper                                                                           // 109
       */                                                                                                           // 110
      $wrapper.append($ripple);                                                                                     // 111
                                                                                                                    // 112
                                                                                                                    // 113
      /**                                                                                                           // 114
       * Make sure the ripple has the styles applied (ugly hack but it works)                                       // 115
       */                                                                                                           // 116
      (function() { return window.getComputedStyle($ripple[0]).opacity; })();                                       // 117
                                                                                                                    // 118
                                                                                                                    // 119
      /**                                                                                                           // 120
       * Turn on the ripple animation                                                                               // 121
       */                                                                                                           // 122
      self.rippleOn($element, $ripple);                                                                             // 123
                                                                                                                    // 124
                                                                                                                    // 125
      /**                                                                                                           // 126
       * Call the rippleEnd function when the transition "on" ends                                                  // 127
       */                                                                                                           // 128
      setTimeout(function() {                                                                                       // 129
        self.rippleEnd($ripple);                                                                                    // 130
      }, 500);                                                                                                      // 131
                                                                                                                    // 132
                                                                                                                    // 133
      /**                                                                                                           // 134
       * Detect when the user leaves the element                                                                    // 135
       */                                                                                                           // 136
      $element.on("mouseup mouseleave touchend", function() {                                                       // 137
        $ripple.data("mousedown", "off");                                                                           // 138
                                                                                                                    // 139
        if($ripple.data("animating") === "off") {                                                                   // 140
          self.rippleOut($ripple);                                                                                  // 141
        }                                                                                                           // 142
      });                                                                                                           // 143
                                                                                                                    // 144
    });                                                                                                             // 145
  };                                                                                                                // 146
                                                                                                                    // 147
                                                                                                                    // 148
  /**                                                                                                               // 149
   * Get the new size based on the element height/width and the ripple width                                        // 150
   */                                                                                                               // 151
  Ripples.prototype.getNewSize = function($element, $ripple) {                                                      // 152
                                                                                                                    // 153
    return (Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth()) * 2.5;                  // 154
  };                                                                                                                // 155
                                                                                                                    // 156
                                                                                                                    // 157
  /**                                                                                                               // 158
   * Get the relX                                                                                                   // 159
   */                                                                                                               // 160
  Ripples.prototype.getRelX = function($wrapper,  event) {                                                          // 161
    var wrapperOffset = $wrapper.offset();                                                                          // 162
                                                                                                                    // 163
    if(!self.isTouch()) {                                                                                           // 164
      /**                                                                                                           // 165
       * Get the mouse position relative to the ripple wrapper                                                      // 166
       */                                                                                                           // 167
      return event.pageX - wrapperOffset.left;                                                                      // 168
    } else {                                                                                                        // 169
      /**                                                                                                           // 170
       * Make sure the user is using only one finger and then get the touch                                         // 171
       * position relative to the ripple wrapper                                                                    // 172
       */                                                                                                           // 173
      event = event.originalEvent;                                                                                  // 174
                                                                                                                    // 175
      if(event.touches.length !== 1) {                                                                              // 176
        return event.touches[0].pageX - wrapperOffset.left;                                                         // 177
      }                                                                                                             // 178
                                                                                                                    // 179
      return false;                                                                                                 // 180
    }                                                                                                               // 181
  };                                                                                                                // 182
                                                                                                                    // 183
                                                                                                                    // 184
  /**                                                                                                               // 185
   * Get the relY                                                                                                   // 186
   */                                                                                                               // 187
  Ripples.prototype.getRelY = function($wrapper, event) {                                                           // 188
    var wrapperOffset = $wrapper.offset();                                                                          // 189
                                                                                                                    // 190
    if(!self.isTouch()) {                                                                                           // 191
      /**                                                                                                           // 192
       * Get the mouse position relative to the ripple wrapper                                                      // 193
       */                                                                                                           // 194
      return event.pageY - wrapperOffset.top;                                                                       // 195
    } else {                                                                                                        // 196
      /**                                                                                                           // 197
       * Make sure the user is using only one finger and then get the touch                                         // 198
       * position relative to the ripple wrapper                                                                    // 199
       */                                                                                                           // 200
      event = event.originalEvent;                                                                                  // 201
                                                                                                                    // 202
      if(event.touches.length !== 1) {                                                                              // 203
        return event.touches[0].pageY - wrapperOffset.top;                                                          // 204
      }                                                                                                             // 205
                                                                                                                    // 206
      return false;                                                                                                 // 207
    }                                                                                                               // 208
  };                                                                                                                // 209
                                                                                                                    // 210
                                                                                                                    // 211
  /**                                                                                                               // 212
   * Get the ripple color                                                                                           // 213
   */                                                                                                               // 214
  Ripples.prototype.getRipplesColor = function($element) {                                                          // 215
                                                                                                                    // 216
    var color = $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;
                                                                                                                    // 218
    return color;                                                                                                   // 219
  };                                                                                                                // 220
                                                                                                                    // 221
                                                                                                                    // 222
  /**                                                                                                               // 223
   * Verify if the client browser has transistion support                                                           // 224
   */                                                                                                               // 225
  Ripples.prototype.hasTransitionSupport = function() {                                                             // 226
    var thisBody  = document.body || document.documentElement;                                                      // 227
    var thisStyle = thisBody.style;                                                                                 // 228
                                                                                                                    // 229
    var support = (                                                                                                 // 230
      thisStyle.transition !== undefined ||                                                                         // 231
      thisStyle.WebkitTransition !== undefined ||                                                                   // 232
      thisStyle.MozTransition !== undefined ||                                                                      // 233
      thisStyle.MsTransition !== undefined ||                                                                       // 234
      thisStyle.OTransition !== undefined                                                                           // 235
    );                                                                                                              // 236
                                                                                                                    // 237
    return support;                                                                                                 // 238
  };                                                                                                                // 239
                                                                                                                    // 240
                                                                                                                    // 241
  /**                                                                                                               // 242
   * Verify if the client is using a mobile device                                                                  // 243
   */                                                                                                               // 244
  Ripples.prototype.isTouch = function() {                                                                          // 245
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);              // 246
  };                                                                                                                // 247
                                                                                                                    // 248
                                                                                                                    // 249
  /**                                                                                                               // 250
   * End the animation of the ripple                                                                                // 251
   */                                                                                                               // 252
  Ripples.prototype.rippleEnd = function($ripple) {                                                                 // 253
    $ripple.data("animating", "off");                                                                               // 254
                                                                                                                    // 255
    if($ripple.data("mousedown") === "off") {                                                                       // 256
      self.rippleOut($ripple);                                                                                      // 257
    }                                                                                                               // 258
  };                                                                                                                // 259
                                                                                                                    // 260
                                                                                                                    // 261
  /**                                                                                                               // 262
   * Turn off the ripple effect                                                                                     // 263
   */                                                                                                               // 264
  Ripples.prototype.rippleOut = function($ripple) {                                                                 // 265
    $ripple.off();                                                                                                  // 266
                                                                                                                    // 267
    if(self.hasTransitionSupport()) {                                                                               // 268
      $ripple.addClass("ripple-out");                                                                               // 269
    } else {                                                                                                        // 270
      $ripple.animate({"opacity": 0}, 100, function() {                                                             // 271
        $ripple.trigger("transitionend");                                                                           // 272
      });                                                                                                           // 273
    }                                                                                                               // 274
                                                                                                                    // 275
    $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {                     // 276
      $ripple.remove();                                                                                             // 277
    });                                                                                                             // 278
  };                                                                                                                // 279
                                                                                                                    // 280
                                                                                                                    // 281
  /**                                                                                                               // 282
   * Turn on the ripple effect                                                                                      // 283
   */                                                                                                               // 284
  Ripples.prototype.rippleOn = function($element, $ripple) {                                                        // 285
    var size = self.getNewSize($element, $ripple);                                                                  // 286
                                                                                                                    // 287
    if(self.hasTransitionSupport()) {                                                                               // 288
      $ripple                                                                                                       // 289
      .css({                                                                                                        // 290
        "-ms-transform": "scale(" + size + ")",                                                                     // 291
        "-moz-transform": "scale(" + size + ")",                                                                    // 292
        "-webkit-transform": "scale(" + size + ")",                                                                 // 293
        "transform": "scale(" + size + ")"                                                                          // 294
      })                                                                                                            // 295
      .addClass("ripple-on")                                                                                        // 296
      .data("animating", "on")                                                                                      // 297
      .data("mousedown", "on");                                                                                     // 298
    } else {                                                                                                        // 299
      $ripple.animate({                                                                                             // 300
        "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,                                       // 301
        "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,                                      // 302
        "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),                              // 303
        "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),                               // 304
        "opacity": 0.2                                                                                              // 305
      }, 500, function() {                                                                                          // 306
        $ripple.trigger("transitionend");                                                                           // 307
      });                                                                                                           // 308
    }                                                                                                               // 309
  };                                                                                                                // 310
                                                                                                                    // 311
                                                                                                                    // 312
  /**                                                                                                               // 313
   * Create the jquery plugin function                                                                              // 314
   */                                                                                                               // 315
  $.fn.ripples = function(options) {                                                                                // 316
    return this.each(function() {                                                                                   // 317
      if(!$.data(this, "plugin_" + ripples)) {                                                                      // 318
        $.data(this, "plugin_" + ripples, new Ripples(this, options));                                              // 319
      }                                                                                                             // 320
    });                                                                                                             // 321
  };                                                                                                                // 322
                                                                                                                    // 323
})(jQuery, window, document);                                                                                       // 324
                                                                                                                    // 325
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/fezvrasta:bootstrap-material-design/meteor/init.js                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.startup(function () {                                                                                        // 1
  $.material.init();                                                                                                // 2
});                                                                                                                 // 3
                                                                                                                    // 4
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['fezvrasta:bootstrap-material-design'] = {};

})();
