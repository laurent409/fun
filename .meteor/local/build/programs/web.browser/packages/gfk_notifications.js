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
var Template = Package.templating.Template;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Notifications;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/gfk:notifications/template.notifications.js                                                            //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("notifications");                                                                             // 2
Template["notifications"] = new Template("Template.notifications", (function() {                                   // 3
  var view = this;                                                                                                 // 4
  return HTML.UL({                                                                                                 // 5
    "class": "notifications"                                                                                       // 6
  }, "\n       ", Blaze.Each(function() {                                                                          // 7
    return Spacebars.call(view.lookup("notifications"));                                                           // 8
  }, function() {                                                                                                  // 9
    return [ "\n           ", Spacebars.include(view.lookupTemplate("notification")), "\n       " ];               // 10
  }), "\n	");                                                                                                      // 11
}));                                                                                                               // 12
                                                                                                                   // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/gfk:notifications/notifications.js                                                                     //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/*global Notifications:true */                                                                                     // 1
// 'use strict'; reinstate when https://github.com/meteor/meteor/issues/2437 is fixed                              // 2
                                                                                                                   // 3
var constructor = (function() {                                                                                    // 4
    /***                                                                                                           // 5
     * Creates an instance of Notifications                                                                        // 6
     * @constructor                                                                                                // 7
     */                                                                                                            // 8
    function Notifications(settings) {                                                                             // 9
		settings = settings || {};                                                                                       // 10
		_.defaults(settings, this.defaultSettings);                                                                      // 11
                                                                                                                   // 12
        this._notificationsCollection = new Mongo.Collection(null);                                                // 13
        this._notificationTimeout = undefined;                                                                     // 14
		this.settings = settings;                                                                                        // 15
    }                                                                                                              // 16
                                                                                                                   // 17
    /***                                                                                                           // 18
     * Adds a notification                                                                                         // 19
     * @param {String} title of the notification                                                                   // 20
     * @param {String} message of the notification                                                                 // 21
     * @param {Object}  [options={}] Options object to use for notification                                        // 22
     * @param {String}  [options.type=defaultOptions.type] the type of the notification                            // 23
     * @param {Boolean} [options.userCloseable=defaultOptions.userCloseable] Whether the notification is user closeable
     */                                                                                                            // 25
    Notifications.prototype.addNotification = function (title, message, options) {                                 // 26
        options = options || {};                                                                                   // 27
        _.defaults(options, this.defaultOptions);                                                                  // 28
                                                                                                                   // 29
        var notification = {};                                                                                     // 30
        notification.title = title;                                                                                // 31
        notification.message = message;                                                                            // 32
        notification.type = options.type;                                                                          // 33
        notification.userCloseable = options.userCloseable;                                                        // 34
                                                                                                                   // 35
        if (options.timeout) {                                                                                     // 36
            notification.expires = new Date().getTime() + options.timeout;                                         // 37
        }                                                                                                          // 38
                                                                                                                   // 39
        this._add(notification);                                                                                   // 40
    };                                                                                                             // 41
                                                                                                                   // 42
    /***                                                                                                           // 43
     * Wraps addNotification, sets type to error                                                                   // 44
     * @param {String} title of the notification                                                                   // 45
     * @param {String} message of the notification                                                                 // 46
     * @param {Object}  [options={}] Options object to use for notification                                        // 47
     * @param {Boolean} [options.userCloseable=defaultOptions.userCloseable] Whether the notification is user closeable
     * @returns {*}                                                                                                // 49
     */                                                                                                            // 50
    Notifications.prototype.error = function (title, message, options) {                                           // 51
        options = options || {};                                                                                   // 52
        options.type = this.TYPES.ERROR;                                                                           // 53
        return this.addNotification(title, message, options);                                                      // 54
    };                                                                                                             // 55
                                                                                                                   // 56
    /***                                                                                                           // 57
     * Wraps addNotification, sets type to warning                                                                 // 58
     * @param {String} title of the notification                                                                   // 59
     * @param {String} message of the notification                                                                 // 60
     * @param {Object}  [options={}] Options object to use for notification                                        // 61
     * @param {Boolean} [options.userCloseable=defaultOptions.userCloseable] Whether the notification is user closeable
     * @returns {*}                                                                                                // 63
     */                                                                                                            // 64
    Notifications.prototype.warn = function (title, message, options) {                                            // 65
        options = options || {};                                                                                   // 66
        options.type = this.TYPES.WARNING;                                                                         // 67
        return this.addNotification(title, message, options);                                                      // 68
    };                                                                                                             // 69
                                                                                                                   // 70
    /***                                                                                                           // 71
     * Wraps addNotification, sets type to info                                                                    // 72
     * @param {String} title of the notification                                                                   // 73
     * @param {String} message of the notification                                                                 // 74
     * @param {Object}  [options={}] Options object to use for notification                                        // 75
     * @param {Boolean} [options.userCloseable=defaultOptions.userCloseable] Whether the notification is user closeable
     * @returns {*}                                                                                                // 77
     */                                                                                                            // 78
    Notifications.prototype.info = function (title, message, options) {                                            // 79
        options = options || {};                                                                                   // 80
        options.type = this.TYPES.INFO;                                                                            // 81
        return this.addNotification(title, message, options);                                                      // 82
    };                                                                                                             // 83
                                                                                                                   // 84
    /***                                                                                                           // 85
     * Wraps addNotification, sets type to success                                                                 // 86
     * @param {String} title of the notification                                                                   // 87
     * @param {String} message of the notification                                                                 // 88
     * @param {Object}  [options={}] Options object to use for notification                                        // 89
     * @param {Boolean} [options.userCloseable=defaultOptions.userCloseable] Whether the notification is user closeable
     * @returns {*}                                                                                                // 91
     */                                                                                                            // 92
    Notifications.prototype.success = function (title, message, options) {                                         // 93
        options = options || {};                                                                                   // 94
        options.type = this.TYPES.SUCCESS;                                                                         // 95
        return this.addNotification(title, message, options);                                                      // 96
    };                                                                                                             // 97
                                                                                                                   // 98
    /***                                                                                                           // 99
     * Returns the NotificationsCollection Meteor.Collection                                                       // 100
     * @returns {object} NotificationsCollection                                                                   // 101
     * @private                                                                                                    // 102
     */                                                                                                            // 103
    Notifications.prototype._getNotificationsCollection = function () {                                            // 104
        return this._notificationsCollection;                                                                      // 105
    };                                                                                                             // 106
                                                                                                                   // 107
    /***                                                                                                           // 108
     * Does the actual add to the collection. And creates a Timeout if necessary.                                  // 109
     * @param {object} notification the object to be inserted into the collection                                  // 110
     * @private                                                                                                    // 111
     */                                                                                                            // 112
    Notifications.prototype._add = function (notification) {                                                       // 113
        var notificationsCollection = this._getNotificationsCollection();                                          // 114
        var firstExpiration = this._getFirstExpiredTimestamp();                                                    // 115
                                                                                                                   // 116
        notificationsCollection.insert(notification);                                                              // 117
                                                                                                                   // 118
        if (notification.expires) {                                                                                // 119
            if (this._notificationTimeout) {                                                                       // 120
                if (firstExpiration > notification.expires) {                                                      // 121
                    Meteor.clearTimeout(this._notificationTimeout);                                                // 122
                    this._notificationTimeout = undefined;                                                         // 123
                }                                                                                                  // 124
            }                                                                                                      // 125
                                                                                                                   // 126
            if (!this._notificationTimeout) {                                                                      // 127
                this._createTimeout();                                                                             // 128
            }                                                                                                      // 129
        }                                                                                                          // 130
    };                                                                                                             // 131
                                                                                                                   // 132
    /***                                                                                                           // 133
     * Returns the timestamp of the notification from the notificationsCollection that is first to expire          // 134
     * @returns {string} first to expire timestamp                                                                 // 135
     * @private                                                                                                    // 136
     */                                                                                                            // 137
    Notifications.prototype._getFirstExpiredTimestamp = function () {                                              // 138
        var notificationsCollection = this._getNotificationsCollection();                                          // 139
                                                                                                                   // 140
        var firstNotification = notificationsCollection.findOne({expires: {$gt: 0}}, {sort:[['expires', 'asc']]}); // 141
        var firstExpiredTimestamp = firstNotification ? firstNotification.expires : 0;                             // 142
                                                                                                                   // 143
        return firstExpiredTimestamp;                                                                              // 144
    };                                                                                                             // 145
                                                                                                                   // 146
    /***                                                                                                           // 147
     * creates a timeout for the first to expire notification.                                                     // 148
     * @private                                                                                                    // 149
     */                                                                                                            // 150
    Notifications.prototype._createTimeout = function () {                                                         // 151
        var self = this;                                                                                           // 152
        var firstExpiration = this._getFirstExpiredTimestamp();                                                    // 153
                                                                                                                   // 154
		if (firstExpiration) {                                                                                           // 155
            this._notificationTimeout = Meteor.setTimeout(function () {                                            // 156
				self.remove({expires: {$lte: firstExpiration}});                                                               // 157
				self._createTimeout();                                                                                         // 158
            }, firstExpiration - new Date().getTime());                                                            // 159
        } else {                                                                                                   // 160
            this._notificationTimeout = undefined;                                                                 // 161
        }                                                                                                          // 162
    };                                                                                                             // 163
                                                                                                                   // 164
    /***                                                                                                           // 165
     * Gets the class containing the color for the notification                                                    // 166
     * @param {String} notificationType                                                                            // 167
     * @returns {string} classname to use for the notification                                                     // 168
     */                                                                                                            // 169
    Notifications.prototype.getNotificationClass = function (notificationType) {                                   // 170
        var notificationClass;                                                                                     // 171
                                                                                                                   // 172
        _.each(this.TYPES,  function (value, key) {                                                                // 173
            if(value === notificationType) {                                                                       // 174
                notificationClass = key.toLowerCase();                                                             // 175
            }                                                                                                      // 176
        });                                                                                                        // 177
                                                                                                                   // 178
        return notificationClass;                                                                                  // 179
    };                                                                                                             // 180
                                                                                                                   // 181
    /***                                                                                                           // 182
     * Removes the notifications matching the selector                                                             // 183
     * @param selector                                                                                             // 184
     */                                                                                                            // 185
    Notifications.prototype.remove = function (selector) {                                                         // 186
        this._getNotificationsCollection().remove(selector);                                                       // 187
                                                                                                                   // 188
        if (this._notificationTimeout) {                                                                           // 189
            Meteor.clearTimeout(this._notificationTimeout);                                                        // 190
            this._notificationTimeout = undefined;                                                                 // 191
            this._createTimeout();                                                                                 // 192
        }                                                                                                          // 193
    };                                                                                                             // 194
                                                                                                                   // 195
    /***                                                                                                           // 196
     * Stores constants for the different notification types                                                       // 197
     * @type {{ERROR: number, WARNING: number, INFO: number, SUCCESS: number}}                                     // 198
     */                                                                                                            // 199
    Notifications.prototype.TYPES = {                                                                              // 200
        'ERROR': 1,                                                                                                // 201
        'WARNING': 2,                                                                                              // 202
        'INFO': 3,                                                                                                 // 203
        'SUCCESS': 4                                                                                               // 204
    };                                                                                                             // 205
                                                                                                                   // 206
    /***                                                                                                           // 207
     * Object with the default options for the notifications                                                       // 208
     * @type {{type: number, userCloseable: boolean, timeout: number}}                                             // 209
     */                                                                                                            // 210
    Notifications.prototype.defaultOptions = {                                                                     // 211
        type: Notifications.prototype.TYPES.INFO,                                                                  // 212
        userCloseable: true,                                                                                       // 213
        timeout: 0                                                                                                 // 214
    };                                                                                                             // 215
                                                                                                                   // 216
	Notifications.prototype.defaultSettings = {                                                                       // 217
		hideAnimationProperties: {                                                                                       // 218
			height: 0,                                                                                                      // 219
			opacity: 0,                                                                                                     // 220
			paddingTop: 0,                                                                                                  // 221
			paddingBottom: 0,                                                                                               // 222
			marginTop: 0                                                                                                    // 223
		},                                                                                                               // 224
		animationSpeed: 400                                                                                              // 225
	};                                                                                                                // 226
                                                                                                                   // 227
    return Notifications;                                                                                          // 228
})();                                                                                                              // 229
                                                                                                                   // 230
Notifications = new constructor();                                                                                 // 231
                                                                                                                   // 232
Template.notifications.helpers({                                                                                   // 233
    notifications: function() {                                                                                    // 234
        return Notifications._getNotificationsCollection().find();                                                 // 235
    }                                                                                                              // 236
});                                                                                                                // 237
                                                                                                                   // 238
Template.notifications.rendered = function () {                                                                    // 239
    this.firstNode._uihooks = {                                                                                    // 240
        insertElement: function (node, next) {                                                                     // 241
			var settings = Notifications.settings;                                                                          // 242
			$(node)                                                                                                         // 243
                .addClass('notificationHidden')                                                                    // 244
                .insertBefore(next)                                                                                // 245
                .fadeIn({duration: settings.animationSpeed})                                                       // 246
                .promise()                                                                                         // 247
                .done(function () {                                                                                // 248
                    $(this).removeClass('notificationHidden');                                                     // 249
                });                                                                                                // 250
        },                                                                                                         // 251
        removeElement: function (node) {                                                                           // 252
			var settings = Notifications.settings;                                                                          // 253
            $(node).animate(settings.hideAnimationProperties, {                                                    // 254
                duration: settings.animationSpeed,                                                                 // 255
                complete: function () {                                                                            // 256
                    $(node).remove();                                                                              // 257
                }});                                                                                               // 258
        }                                                                                                          // 259
    };                                                                                                             // 260
};                                                                                                                 // 261
                                                                                                                   // 262
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/gfk:notifications/template.notification.js                                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("notification");                                                                              // 2
Template["notification"] = new Template("Template.notification", (function() {                                     // 3
  var view = this;                                                                                                 // 4
  return HTML.LI({                                                                                                 // 5
    "class": function() {                                                                                          // 6
      return [ "notification ", Spacebars.mustache(view.lookup("notificationColor"), view.lookup("type")), " ", Blaze.If(function() {
        return Spacebars.call(view.lookup("userCloseable"));                                                       // 8
      }, function() {                                                                                              // 9
        return "closeable";                                                                                        // 10
      }) ];                                                                                                        // 11
    }                                                                                                              // 12
  }, "\n         ", HTML.DIV({                                                                                     // 13
    "class": "title"                                                                                               // 14
  }, Blaze.View(function() {                                                                                       // 15
    return Spacebars.mustache(view.lookup("title"));                                                               // 16
  })), "\n         ", HTML.DIV({                                                                                   // 17
    "class": "message"                                                                                             // 18
  }, Blaze.View(function() {                                                                                       // 19
    return Spacebars.mustache(view.lookup("message"));                                                             // 20
  })), "\n         ", Blaze.If(function() {                                                                        // 21
    return Spacebars.call(view.lookup("userCloseable"));                                                           // 22
  }, function() {                                                                                                  // 23
    return [ "\n                 ", HTML.DIV({                                                                     // 24
      "class": "closeButton"                                                                                       // 25
    }, HTML.CharRef({                                                                                              // 26
      html: "&times;",                                                                                             // 27
      str: "×"                                                                                                     // 28
    })), "\n         " ];                                                                                          // 29
  }), "\n     ");                                                                                                  // 30
}));                                                                                                               // 31
                                                                                                                   // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/gfk:notifications/notification.js                                                                      //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
'use strict';                                                                                                      // 1
                                                                                                                   // 2
Template.notification.rendered = function () {                                                                     // 3
	//TODO: Remove this when meteor issue #2369 gets fixed                                                            // 4
	$(this.firstNode).data('_id', this.data._id);                                                                     // 5
};                                                                                                                 // 6
                                                                                                                   // 7
Template.notification.helpers({                                                                                    // 8
    notificationColor: function(notificationType) {                                                                // 9
        return Notifications.getNotificationClass(notificationType);                                               // 10
    }                                                                                                              // 11
});                                                                                                                // 12
                                                                                                                   // 13
Template.notification.events = {                                                                                   // 14
    'click': function () {                                                                                         // 15
        if (this.userCloseable || this.expires < new Date()) {                                                     // 16
            Notifications.remove(this._id);                                                                        // 17
        }                                                                                                          // 18
    }                                                                                                              // 19
};                                                                                                                 // 20
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gfk:notifications'] = {
  Notifications: Notifications
};

})();
