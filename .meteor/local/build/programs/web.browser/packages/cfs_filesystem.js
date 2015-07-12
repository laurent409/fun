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
var FS = Package['cfs:base-package'].FS;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/cfs:filesystem/filesystem.client.js                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// On the client we have just a shell                                // 1
FS.Store.FileSystem = function(name, options) {                      // 2
  var self = this;                                                   // 3
  if (!(self instanceof FS.Store.FileSystem))                        // 4
    throw new Error('FS.Store.FileSystem missing keyword "new"');    // 5
                                                                     // 6
  return new FS.StorageAdapter(name, options, {                      // 7
    typeName: 'storage.filesystem'                                   // 8
  });                                                                // 9
};                                                                   // 10
                                                                     // 11
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:filesystem'] = {};

})();
