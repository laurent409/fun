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
var Cookie = Package['chuangbo:cookie'].Cookie;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var Accounts = Package['accounts-base'].Accounts;

/* Package-scope variables */
var FastRender, __init_fast_render, EncodeEJSON, DecodeEJSON, AddedToChanged, ApplyDDP, DeepExtend, collData;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/utils.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
EncodeEJSON = function(ejson) {                                                                                        // 1
  var ejsonString = EJSON.stringify(ejson);                                                                            // 2
  return encodeURI(ejsonString);                                                                                       // 3
};                                                                                                                     // 4
                                                                                                                       // 5
DecodeEJSON = function(encodedEjson) {                                                                                 // 6
  var decodedEjsonString = decodeURI(encodedEjson);                                                                    // 7
  return EJSON.fromJSONValue(JSON.parse(decodedEjsonString));                                                          // 8
};                                                                                                                     // 9
                                                                                                                       // 10
AddedToChanged = function(localCopy, added) {                                                                          // 11
  added.msg = "changed";                                                                                               // 12
  added.cleared = [];                                                                                                  // 13
  added.fields = added.fields || {};                                                                                   // 14
                                                                                                                       // 15
  _.each(localCopy, function(value, key) {                                                                             // 16
    if(key != '_id') {                                                                                                 // 17
      if(typeof added.fields[key] == "undefined") {                                                                    // 18
        added.cleared.push(key);                                                                                       // 19
      }                                                                                                                // 20
    }                                                                                                                  // 21
  });                                                                                                                  // 22
};                                                                                                                     // 23
                                                                                                                       // 24
ApplyDDP = function(existing, message) {                                                                               // 25
  var newDoc = (!existing)? {}: _.clone(existing);                                                                     // 26
  if(message.msg == 'added') {                                                                                         // 27
    _.each(message.fields, function(value, key) {                                                                      // 28
      newDoc[key] = value;                                                                                             // 29
    });                                                                                                                // 30
  } else if(message.msg == "changed") {                                                                                // 31
    _.each(message.fields, function(value, key) {                                                                      // 32
      newDoc[key] = value;                                                                                             // 33
    });                                                                                                                // 34
    _.each(message.cleared, function(key) {                                                                            // 35
      delete newDoc[key];                                                                                              // 36
    });                                                                                                                // 37
  } else if(message.msg == "removed") {                                                                                // 38
    newDoc = null;                                                                                                     // 39
  }                                                                                                                    // 40
                                                                                                                       // 41
  return newDoc;                                                                                                       // 42
};                                                                                                                     // 43
                                                                                                                       // 44
// source: https://gist.github.com/kurtmilam/1868955                                                                   // 45
//  modified a bit to not to expose this as an _ api                                                                   // 46
DeepExtend = function deepExtend (obj) {                                                                               // 47
  var parentRE = /#{\s*?_\s*?}/,                                                                                       // 48
      slice = Array.prototype.slice,                                                                                   // 49
      hasOwnProperty = Object.prototype.hasOwnProperty;                                                                // 50
                                                                                                                       // 51
  _.each(slice.call(arguments, 1), function(source) {                                                                  // 52
    for (var prop in source) {                                                                                         // 53
      if (hasOwnProperty.call(source, prop)) {                                                                         // 54
        if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop]) || _.isDate(source[prop])) { // 55
          obj[prop] = source[prop];                                                                                    // 56
        }                                                                                                              // 57
        else if (_.isString(source[prop]) && parentRE.test(source[prop])) {                                            // 58
          if (_.isString(obj[prop])) {                                                                                 // 59
            obj[prop] = source[prop].replace(parentRE, obj[prop]);                                                     // 60
          }                                                                                                            // 61
        }                                                                                                              // 62
        else if (_.isArray(obj[prop]) || _.isArray(source[prop])){                                                     // 63
          if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){                                                      // 64
            throw 'Error: Trying to combine an array with a non-array (' + prop + ')';                                 // 65
          } else {                                                                                                     // 66
            obj[prop] = _.reject(DeepExtend(obj[prop], source[prop]), function (item) { return _.isNull(item);});      // 67
          }                                                                                                            // 68
        }                                                                                                              // 69
        else if (_.isObject(obj[prop]) || _.isObject(source[prop])){                                                   // 70
          if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){                                                    // 71
            throw 'Error: Trying to combine an object with a non-object (' + prop + ')';                               // 72
          } else {                                                                                                     // 73
            obj[prop] = DeepExtend(obj[prop], source[prop]);                                                           // 74
          }                                                                                                            // 75
        } else {                                                                                                       // 76
          obj[prop] = source[prop];                                                                                    // 77
        }                                                                                                              // 78
      }                                                                                                                // 79
    }                                                                                                                  // 80
  });                                                                                                                  // 81
  return obj;                                                                                                          // 82
};                                                                                                                     // 83
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/client/fast_render.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
FastRender = {};                                                                                                       // 1
FastRender.enabled = typeof __fast_render_config != 'undefined';                                                       // 2
FastRender._dataReceived = false;                                                                                      // 3
FastRender._revertedBackToOriginal = false;                                                                            // 4
FastRender._blockDDP = Meteor._localStorage.getItem('__frblockddp') != undefined;                                      // 5
if(FastRender._blockDDP) {                                                                                             // 6
  console.log("FastRender is blocking DDP messages. apply 'FastRender.debugger.unblockDDP()' to unblock again.");      // 7
}                                                                                                                      // 8
                                                                                                                       // 9
FastRender._disable = Meteor._localStorage.getItem('__frdisable') != undefined;                                        // 10
if(FastRender._disable) {                                                                                              // 11
  console.log("FastRender is disabled. apply 'FastRender.debugger.enableFR()' to enable it back.")                     // 12
}                                                                                                                      // 13
                                                                                                                       // 14
// This allow us to apply DDP message even if Meteor block accepting messages                                          // 15
//  When doing initial login, Meteor sends an login message                                                            // 16
//  Then it'll block the accpeting DDP messages from server                                                            // 17
//  This is the cure                                                                                                   // 18
FastRender.injectDdpMessage = function(conn, message) {                                                                // 19
  FastRender.debugger.log('injecting ddp message:', message);                                                          // 20
  var originalWait = conn._waitingForQuiescence;                                                                       // 21
  conn._waitingForQuiescence = function() {return false};                                                              // 22
  conn._livedata_data(message);                                                                                        // 23
  conn._waitingForQuiescence = originalWait;                                                                           // 24
};                                                                                                                     // 25
                                                                                                                       // 26
FastRender.init = function(payload) {                                                                                  // 27
  if(FastRender._disable) return;                                                                                      // 28
                                                                                                                       // 29
  payload = DecodeEJSON(payload);                                                                                      // 30
                                                                                                                       // 31
  FastRender._subscriptions = payload.subscriptions || {};                                                             // 32
  FastRender._subscriptionIdMap = {};                                                                                  // 33
  FastRender._dataReceived = true;                                                                                     // 34
  FastRender._payload = payload;                                                                                       // 35
                                                                                                                       // 36
  // merging data from different subscriptions                                                                         // 37
  //  yes, this is a minimal mergeBox on the client                                                                    // 38
  var allData = {};                                                                                                    // 39
  _.each(payload.data, function(subData, collName) {                                                                   // 40
    if(!allData[collName]) {                                                                                           // 41
      allData[collName] = {};                                                                                          // 42
    }                                                                                                                  // 43
    collData = allData[collName];                                                                                      // 44
                                                                                                                       // 45
    subData.forEach(function(dataSet) {                                                                                // 46
      dataSet.forEach(function(item) {                                                                                 // 47
        if(!collData[item._id]) {                                                                                      // 48
          collData[item._id] = item;                                                                                   // 49
        } else {                                                                                                       // 50
          DeepExtend(collData[item._id], item);                                                                        // 51
        }                                                                                                              // 52
      });                                                                                                              // 53
    });                                                                                                                // 54
  });                                                                                                                  // 55
                                                                                                                       // 56
  _.each(allData, function(collData, collName) {                                                                       // 57
    _.each(collData, function(item, id) {                                                                              // 58
      var id = LocalCollection._idStringify(item._id);                                                                 // 59
      delete item._id;                                                                                                 // 60
                                                                                                                       // 61
      var ddpMessage = {                                                                                               // 62
        msg: 'added',                                                                                                  // 63
        collection: collName,                                                                                          // 64
        id: id,                                                                                                        // 65
        fields: item,                                                                                                  // 66
        frGen: true                                                                                                    // 67
      };                                                                                                               // 68
                                                                                                                       // 69
      FastRender.injectDdpMessage(Meteor.connection, ddpMessage);                                                      // 70
    });                                                                                                                // 71
  });                                                                                                                  // 72
                                                                                                                       // 73
  // let Meteor know, user login process has been completed                                                            // 74
  if(typeof Accounts != 'undefined') {                                                                                 // 75
    Accounts._setLoggingIn(false);                                                                                     // 76
  }                                                                                                                    // 77
};                                                                                                                     // 78
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/client/debugger.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
FastRender.debugger = {};                                                                                              // 1
FastRender.debugger._logs = [];                                                                                        // 2
FastRender.debugger.log = function function_name(message/*, args..*/) {                                                // 3
  if(                                                                                                                  // 4
    typeof console != 'undefined' &&                                                                                   // 5
    typeof Meteor._localStorage != 'undefined' &&                                                                      // 6
    Meteor._localStorage.getItem('__frlog') == "1")                                                                    // 7
  {                                                                                                                    // 8
    FastRender.debugger._logs.push(arguments);                                                                         // 9
    arguments[0] = "FR: " + arguments[0];                                                                              // 10
    console.log.apply(console, arguments);                                                                             // 11
  }                                                                                                                    // 12
}                                                                                                                      // 13
                                                                                                                       // 14
FastRender.debugger.showLogs = function() {                                                                            // 15
  Meteor._localStorage.setItem('__frlog', "1");                                                                        // 16
  location.reload();                                                                                                   // 17
};                                                                                                                     // 18
                                                                                                                       // 19
FastRender.debugger.hideLogs = function() {                                                                            // 20
  Meteor._localStorage.removeItem('__frlog');                                                                          // 21
  location.reload();                                                                                                   // 22
};                                                                                                                     // 23
                                                                                                                       // 24
FastRender.debugger.getLogs = function() {                                                                             // 25
  return FastRender.debugger._logs;                                                                                    // 26
};                                                                                                                     // 27
                                                                                                                       // 28
FastRender.debugger.getLogsJSON = function() {                                                                         // 29
  return JSON.stringify(FastRender.debugger._logs);                                                                    // 30
};                                                                                                                     // 31
                                                                                                                       // 32
FastRender.debugger.blockDDP = function() {                                                                            // 33
  Meteor._localStorage.setItem('__frblockddp', "1");                                                                   // 34
  location.reload();                                                                                                   // 35
};                                                                                                                     // 36
                                                                                                                       // 37
FastRender.debugger.unblockDDP = function() {                                                                          // 38
  Meteor._localStorage.removeItem('__frblockddp');                                                                     // 39
  location.reload();                                                                                                   // 40
};                                                                                                                     // 41
                                                                                                                       // 42
FastRender.debugger.disableFR = function() {                                                                           // 43
  Meteor._localStorage.setItem('__frdisable', "1");                                                                    // 44
  location.reload();                                                                                                   // 45
};                                                                                                                     // 46
                                                                                                                       // 47
FastRender.debugger.enableFR = function() {                                                                            // 48
  Meteor._localStorage.removeItem('__frdisable');                                                                      // 49
  location.reload();                                                                                                   // 50
};                                                                                                                     // 51
                                                                                                                       // 52
FastRender.debugger.getPayload = function() {                                                                          // 53
  return FastRender._payload;                                                                                          // 54
};                                                                                                                     // 55
                                                                                                                       // 56
FastRender.debugger.getPayloadJSON = function() {                                                                      // 57
  return JSON.stringify(FastRender._payload);                                                                          // 58
};                                                                                                                     // 59
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/client/ddp_update.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var reconnecting = false;                                                                                              // 1
                                                                                                                       // 2
var originalLivedataData = Meteor.connection._livedata_data;                                                           // 3
Meteor.connection._livedata_data = function(msg) {                                                                     // 4
  if(FastRender._blockDDP && !msg.frGen) {                                                                             // 5
    FastRender.debugger.log('blocking incoming ddp', msg);                                                             // 6
    return;                                                                                                            // 7
  };                                                                                                                   // 8
  // fast-render adds data manually while initializing                                                                 // 9
  // But when the server sends actual data via DDP, it also tries to add                                               // 10
  // Then we need to detect that and alter                                                                             // 11
  //                                                                                                                   // 12
  // But we don't need to interfer with Meteor's simulation process                                                    // 13
  // That's why we are checking for serverDocs and ignore manual handling                                              // 14
  //                                                                                                                   // 15
  // We don't need this logic after our special handling reverted back to                                              // 16
  // original. But we can't detect when null publications completed or not                                             // 17
  // That's why we need keep this logic                                                                                // 18
  //                                                                                                                   // 19
  // It's okay to ignore this logic after sometime, but not sure when exactly                                          // 20
                                                                                                                       // 21
  if(msg.msg == 'added') {                                                                                             // 22
    var id = LocalCollection._idParse(msg.id);                                                                         // 23
    var serverDoc = this._getServerDoc(msg.collection, id);                                                            // 24
                                                                                                                       // 25
    if(!reconnecting && !serverDoc) {                                                                                  // 26
      var localCollection = this._mongo_livedata_collections[msg.collection];                                          // 27
      var pendingStoreUpdates = this._updatesForUnknownStores[msg.collection];                                         // 28
      if(localCollection) {                                                                                            // 29
        var existingDoc = localCollection.findOne(id);                                                                 // 30
        if(existingDoc) {                                                                                              // 31
          FastRender.debugger.log('re writing DDP for:', msg);                                                         // 32
          AddedToChanged(existingDoc, msg);                                                                            // 33
        }                                                                                                              // 34
      } else if(pendingStoreUpdates) {                                                                                 // 35
        var mergedDoc = null;                                                                                          // 36
        var existingDocs = _.filter(pendingStoreUpdates, function(doc) {                                               // 37
          return doc.id == msg.id;                                                                                     // 38
        });                                                                                                            // 39
                                                                                                                       // 40
        _.each(existingDocs, function(cachedMsg) {                                                                     // 41
          mergedDoc = ApplyDDP(mergedDoc, cachedMsg);                                                                  // 42
        });                                                                                                            // 43
                                                                                                                       // 44
        if(mergedDoc) {                                                                                                // 45
          FastRender.debugger.log('re writing DDP for:', msg);                                                         // 46
          AddedToChanged(mergedDoc, msg);                                                                              // 47
        }                                                                                                              // 48
      }                                                                                                                // 49
    }                                                                                                                  // 50
  }                                                                                                                    // 51
                                                                                                                       // 52
  // if we've completed our tasks, no need of special handling                                                         // 53
  if(!FastRender._revertedBackToOriginal && FastRender._dataReceived) {                                                // 54
                                                                                                                       // 55
    // This will take care of cleaning special subscription handling                                                   // 56
    // after the actual subscription comes out                                                                         // 57
    if(msg.msg == 'ready' && !msg.frGen && FastRender._subscriptions) {                                                // 58
      msg.subs.forEach(function(subId) {                                                                               // 59
        var subscription = FastRender._subscriptionIdMap[subId];                                                       // 60
        if(subscription) {                                                                                             // 61
          FastRender.debugger.log('actual subscription completed:', subscription, subId);                              // 62
          // we don't need to handle specially after this                                                              // 63
          delete FastRender._subscriptions[subscription];                                                              // 64
          delete FastRender._subscriptionIdMap[subId];                                                                 // 65
        }                                                                                                              // 66
      });                                                                                                              // 67
    }                                                                                                                  // 68
                                                                                                                       // 69
    // if all the subscriptions have been processed,                                                                   // 70
    // there is no need to keep hijacking                                                                              // 71
    if(EJSON.equals(FastRender._subscriptions, {})) {                                                                  // 72
      FastRender.debugger.log('fast rendering completed!');                                                            // 73
      FastRender._revertedBackToOriginal = true;                                                                       // 74
    }                                                                                                                  // 75
  }                                                                                                                    // 76
                                                                                                                       // 77
  return originalLivedataData.call(this, msg);                                                                         // 78
};                                                                                                                     // 79
                                                                                                                       // 80
var originalSend = Meteor.connection._send;                                                                            // 81
Meteor.connection._send = function(msg) {                                                                              // 82
  // if looking for connect again to the server, we must need to revert back to                                        // 83
  // original to prevent some weird DDP issues                                                                         // 84
  //  normally it is already reverted, but user may added subscriptions                                                // 85
  //  in server, which are not subscribed from the client                                                              // 86
  if(msg.msg == 'connect' && msg.session != undefined) {                                                               // 87
    FastRender._revertedBackToOriginal = true;                                                                         // 88
    reconnecting = true;                                                                                               // 89
  }                                                                                                                    // 90
                                                                                                                       // 91
  var self = this;                                                                                                     // 92
                                                                                                                       // 93
  // if we've completed our tasks, no need of special handling                                                         // 94
  if(!FastRender._revertedBackToOriginal && FastRender._dataReceived) {                                                // 95
    var canSendFakeReady =                                                                                             // 96
      msg.msg == 'sub' &&                                                                                              // 97
      FastRender._subscriptions[msg.name];                                                                             // 98
                                                                                                                       // 99
    FastRender.debugger.log('new subscription:', msg.name);                                                            // 100
    if(canSendFakeReady) {                                                                                             // 101
      FastRender.debugger.log('sending fake ready for sub:', msg.name);                                                // 102
      FastRender.injectDdpMessage(self, {msg:"ready",subs:[msg.id], frGen: true});                                     // 103
      // add the messageId to be handled later                                                                         // 104
      FastRender._subscriptionIdMap[msg.id] = msg.name;                                                                // 105
    }                                                                                                                  // 106
  }                                                                                                                    // 107
                                                                                                                       // 108
  return originalSend.call(this, msg);                                                                                 // 109
};                                                                                                                     // 110
                                                                                                                       // 111
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/client/data_handler.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  var fastRenderData = $('script[type="text/fast-render"]', document.head).text().trim();                              // 2
  if(fastRenderData) {                                                                                                 // 3
    FastRender.init(fastRenderData);                                                                                   // 4
  }                                                                                                                    // 5
});                                                                                                                    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/meteorhacks:fast-render/lib/client/auth.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if(typeof Meteor.user == 'function') {                                                                                 // 1
  Tracker.autorun(function() {                                                                                         // 2
    var user = Meteor.user();                                                                                          // 3
    var status = Meteor.status();                                                                                      // 4
                                                                                                                       // 5
    //we don't need to clean cookie if we've not connected yet                                                         // 6
    //this is very usefull when testing with connecting a bad ddp connection                                           // 7
    if(status.connected) {                                                                                             // 8
      if(user) {                                                                                                       // 9
        var loginToken = Meteor._localStorage.getItem('Meteor.loginToken');                                            // 10
        var loginTokenExpires = new Date(Meteor._localStorage.getItem('Meteor.loginTokenExpires'));                    // 11
                                                                                                                       // 12
        Cookie.set('meteor_login_token', loginToken, {                                                                 // 13
          path: '/',                                                                                                   // 14
          expires: loginTokenExpires                                                                                   // 15
        });                                                                                                            // 16
      } else {                                                                                                         // 17
        Cookie.set('meteor_login_token', loginToken, {                                                                 // 18
          path: '/',                                                                                                   // 19
          expires: -1                                                                                                  // 20
        });                                                                                                            // 21
      }                                                                                                                // 22
    }                                                                                                                  // 23
  });                                                                                                                  // 24
} else {                                                                                                               // 25
  //make sure cookie is deleted (if previously setted)                                                                 // 26
  Cookie.set('meteor_login_token', loginToken, {                                                                       // 27
    path: '/',                                                                                                         // 28
    expires: -1                                                                                                        // 29
  });                                                                                                                  // 30
}                                                                                                                      // 31
                                                                                                                       // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteorhacks:fast-render'] = {
  FastRender: FastRender,
  __init_fast_render: __init_fast_render
};

})();
