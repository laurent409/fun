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
var _ = Package.underscore._;

/* Package-scope variables */
var EventEmitter;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/raix:eventemitter/eventemitter.client.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
EventEmitter = function(options) {                                                                                    // 1
  var self = this;                                                                                                    // 2
  // Check that the user uses "new" keyword for api consistency                                                       // 3
  if (! (self instanceof EventEmitter))                                                           // 6                // 4
    throw new Error('use "new" to construct an EventEmitter');                                                        // 5
                                                                                                                      // 6
  options = options || {};                                                                                            // 7
                                                                                                                      // 8
  // Hidden scope                                                                                                     // 9
  self._eventEmitter = {                                                                                              // 10
    onListeners: {},                                                                                                  // 11
    onceListeners: {},                                                                                                // 12
    maxListeners: options.maxListeners || 10                                                                          // 13
  };                                                                                                                  // 14
};                                                                                                                    // 15
                                                                                                                      // 16
var _checkListenerLimit = function(eventName, listenerCount) {                                                        // 17
  var self = this;                                                                                                    // 18
  // Check if we are to send a warning                                                                                // 19
  if (self._eventEmitter.maxListeners && listenerCount > self._eventEmitter.maxListeners) {                           // 20
    // Return string                                                                                                  // 21
    return 'warning: possible EventEmitter memory leak detected. ' +                                                  // 22
        listenerCount + ' listeners added on event "' + eventName +                                                   // 23
        '". Use emitter.setMaxListeners() to increase limit. (' +                                                     // 24
        self._eventEmitter.maxListeners + ')';                                                                        // 25
                                                                                                                      // 26
  }                                                                                                                   // 27
};                                                                                                                    // 28
                                                                                                                      // 29
// By default EventEmitters will print a warning if more than 10 listeners are                                        // 30
// added for a particular event. This is a useful default which helps finding                                         // 31
// memory leaks. Obviously not all Emitters should be limited to 10. This function                                    // 32
// allows that to be increased. Set to zero for unlimited.                                                            // 33
EventEmitter.prototype.setMaxListeners = function(n) {                                                                // 34
  this._eventEmitter.maxListeners = n;                                                                                // 35
};                                                                                                                    // 36
                                                                                                                      // 37
var _addToList = function(list, eventName, listener) {                                                                // 38
  var self = this;                                                                                                    // 39
  // Check that we have a container for the event, Create listener array                                              // 40
  if (typeof list[eventName] == 'undefined') list[eventName] = [];                                                    // 41
                                                                                                                      // 42
  // Make sure the listener is not in there already?                                                                  // 43
  // We have to comment this to be compliant with node.js                                                             // 44
  // list[eventName] = _.without(list[eventName], listener);                                                          // 45
                                                                                                                      // 46
  // Add the listener and Check the limit                                                                             // 47
  return _checkListenerLimit.apply(this, [eventName, list[eventName].push(listener)]);                                // 48
};                                                                                                                    // 49
                                                                                                                      // 50
// Adds a listener to the end of the listeners array for the specified event.                                         // 51
// server.on('connection', function (stream) {                                                                        // 52
//   console.log('someone connected!');                                                                               // 53
// });                                                                                                                // 54
// Returns emitter, so calls can be chained.                                                                          // 55
EventEmitter.prototype.on = function(eventName, listener) {                                                           // 56
  var warn = _addToList.apply(this, [this._eventEmitter.onListeners, eventName, listener]);                           // 57
                                                                                                                      // 58
  // Warn if needed                                                                                                   // 59
  if (warn) console.warn((new Error(warn)).stack);                                                                    // 60
                                                                                                                      // 61
  // Return the emitter                                                                                               // 62
  return self;                                                                                                        // 63
};                                                                                                                    // 64
                                                                                                                      // 65
// Adds a one time listener for the event. This listener is invoked                                                   // 66
// only the next time the event is fired, after which it is removed.                                                  // 67
EventEmitter.prototype.once = function(eventName, listener) {                                                         // 68
  var warn = _addToList.apply(this, [this._eventEmitter.onceListeners, eventName, listener]);                         // 69
                                                                                                                      // 70
  // Warn if needed                                                                                                   // 71
  if (warn) console.warn((new Error(warn)).stack);                                                                    // 72
                                                                                                                      // 73
  // Return the emitter                                                                                               // 74
  return self;                                                                                                        // 75
};                                                                                                                    // 76
                                                                                                                      // 77
var _runCallbacks = function(listenerArray, args) {                                                                   // 78
  var self = this;                                                                                                    // 79
  // count of listeners triggered                                                                                     // 80
  var count = 0;                                                                                                      // 81
  // Check if we have anything to work with                                                                           // 82
  if (typeof listenerArray !== 'undefined') {                                                                         // 83
    // Try to iterate over the listeners                                                                              // 84
    _.each(listenerArray, function(listener) {                                                                        // 85
      // Count listener calls                                                                                         // 86
      count++;                                                                                                        // 87
      // Send the job to the eventloop                                                                                // 88
      listener.apply(self, args);                                                                                     // 89
    });                                                                                                               // 90
  }                                                                                                                   // 91
                                                                                                                      // 92
  // Return the count                                                                                                 // 93
  return count;                                                                                                       // 94
};                                                                                                                    // 95
                                                                                                                      // 96
// emitter.emit(event, [arg1], [arg2], [...])#                                                                        // 97
// Execute each of the listeners in order with the supplied arguments.                                                // 98
EventEmitter.prototype.emit = function(eventName /* arguments */) {                                                   // 99
  var self = this;                                                                                                    // 100
  // make argument list to pass on to listeners                                                                       // 101
  var args = _.rest(arguments);                                                                                       // 102
                                                                                                                      // 103
  // Count listeners triggered                                                                                        // 104
  var count = 0;                                                                                                      // 105
                                                                                                                      // 106
  // Swap once list                                                                                                   // 107
  var onceList = self._eventEmitter.onceListeners[eventName];                                                         // 108
                                                                                                                      // 109
  // Empty the once list                                                                                              // 110
  self._eventEmitter.onceListeners[eventName] = [];                                                                   // 111
                                                                                                                      // 112
  // Trigger on listeners                                                                                             // 113
  count += _runCallbacks.call(self, self._eventEmitter.onListeners[eventName], args);                                 // 114
                                                                                                                      // 115
  // Trigger once listeners                                                                                           // 116
  count += _runCallbacks.call(self, onceList, args);                                                                  // 117
                                                                                                                      // 118
  // Returns true if event had listeners, false otherwise.                                                            // 119
  return (count > 0);                                                                                                 // 120
};                                                                                                                    // 121
                                                                                                                      // 122
// XXX: When removing a listener in node js it only removes one - not all.                                            // 123
var _withoutOne = function(list, obj) {                                                                               // 124
  var found = false;                                                                                                  // 125
  var result = [];                                                                                                    // 126
                                                                                                                      // 127
  // Iterate over listeners                                                                                           // 128
  for (var i = 0; i < list.length; i++)                                                                               // 129
    // Check if we found one...                                                                                       // 130
    if (!found && list[i] === obj) found = true; else result.push(list[i]);                                           // 131
                                                                                                                      // 132
  // return the new array                                                                                             // 133
  return result;                                                                                                      // 134
};                                                                                                                    // 135
                                                                                                                      // 136
// Removes all listeners, or those of the specified event. It's not a                                                 // 137
// good idea to remove listeners that were added elsewhere in the code,                                               // 138
// especially when it's on an emitter that you didn't create (e.g. sockets                                            // 139
// or file streams).                                                                                                  // 140
// Returns emitter, so calls can be chained.                                                                          // 141
EventEmitter.prototype.off = function(eventName, listener) {                                                          // 142
  var self = this;                                                                                                    // 143
  if (eventName) {                                                                                                    // 144
    if (typeof listener == 'function') {                                                                              // 145
      // its a bit more tricky - we have to iterate over the arrays and only                                          // 146
      // clone listeners not equal to                                                                                 // 147
      if (typeof self._eventEmitter.onListeners[eventName] !== 'undefined') {                                         // 148
        self._eventEmitter.onListeners[eventName] = _withoutOne(self._eventEmitter.onListeners[eventName], listener); // 149
                                                                                                                      // 150
      }                                                                                                               // 151
      if (typeof self._eventEmitter.onceListeners[eventName] !== 'undefined') {                                       // 152
        self._eventEmitter.onceListeners[eventName] = _withoutOne(self._eventEmitter.onceListeners[eventName], listener);
                                                                                                                      // 154
      }                                                                                                               // 155
    } else {                                                                                                          // 156
      // Remove all listeners for eventName                                                                           // 157
      self._eventEmitter.onListeners[eventName] = [];                                                                 // 158
      self._eventEmitter.onceListeners[eventName] = [];                                                               // 159
    }                                                                                                                 // 160
                                                                                                                      // 161
  } else {                                                                                                            // 162
    // Remove all listeners                                                                                           // 163
    self._eventEmitter.onListeners = {};                                                                              // 164
    self._eventEmitter.onceListeners = {};                                                                            // 165
  }                                                                                                                   // 166
};                                                                                                                    // 167
                                                                                                                      // 168
// Add api helpers                                                                                                    // 169
EventEmitter.prototype.addListener = EventEmitter.prototype.on;                                                       // 170
EventEmitter.prototype.removeListener = EventEmitter.prototype.off;                                                   // 171
EventEmitter.prototype.removeAllListeners = EventEmitter.prototype.off;                                               // 172
                                                                                                                      // 173
// Add jquery like helpers                                                                                            // 174
EventEmitter.prototype.one = EventEmitter.prototype.once;                                                             // 175
EventEmitter.prototype.trigger = EventEmitter.prototype.emit;                                                         // 176
                                                                                                                      // 177
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['raix:eventemitter'] = {
  EventEmitter: EventEmitter
};

})();
