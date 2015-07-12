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
var Template = Package.templating.Template;
var EJSON = Package.ejson.EJSON;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/schnie:uploader/lib/uploadedFiles.coffee.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.UploadedFiles = new Meteor.Collection("uploadedFiles");

this.UploadedFiles.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/schnie:uploader/lib/UploaderFile.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Knox, fs, path;

this.UploaderFile = (function() {
  UploaderFile.prototype.CHUNK_SIZE = 1024 * 1024 * 0.5;

  UploaderFile.fromJSONValue = function(value) {
    return new UploaderFile({
      id: value.id,
      name: value.name,
      ext: value.ext,
      type: value.type,
      size: value.size,
      data: EJSON.fromJSONValue(value.data),
      start: value.start,
      end: value.end,
      bytesRead: value.bytesRead,
      bytesUploaded: value.bytesUploaded
    }, value.settings);
  };

  function UploaderFile(doc, settings) {
    var _ref;
    if (doc == null) {
      doc = {};
    }
    if (settings == null) {
      settings = {};
    }
    this.id = doc.id || Random.id();
    this.name = doc.name || null;
    this.type = doc.type || null;
    this.data = doc.data || null;
    this.size = doc.size || 0;
    this.start = doc.start || 0;
    this.end = doc.end || 0;
    this.bytesRead = doc.bytesRead || 0;
    this.bytesUploaded = doc.bytesUploaded || 0;
    this.ext = (_ref = this.name) != null ? _ref.match(/\.[0-9a-z]{1,5}$/i) : void 0;
    this.settings = settings;
  }

  UploaderFile.prototype.typeName = function() {
    return "UploaderFile";
  };

  UploaderFile.prototype.equals = function(id) {
    return this.id = other.id;
  };

  UploaderFile.prototype.clone = function() {
    return new UploaderFile({
      id: this.id,
      name: this.name,
      type: this.type,
      size: this.size,
      data: this.data,
      start: this.start,
      end: this.end,
      bytesRead: this.bytesRead,
      bytesUploaded: this.bytesUploaded
    }, this.settings);
  };

  UploaderFile.prototype.toJSONValue = function() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      size: this.size,
      data: EJSON.toJSONValue(this.data),
      start: this.start,
      end: this.end,
      bytesRead: this.bytesRead,
      bytesUploaded: this.bytesUploaded,
      settings: this.settings
    };
  };

  UploaderFile.prototype.getDocument = function() {
    return UploadedFiles.findOne({
      _id: this.id
    });
  };

  UploaderFile.prototype.getTotalProgress = function() {
    var cloudUploadProgress, file, uploadProgress;
    file = this.getDocument();
    uploadProgress = file.uploadProgress || 0;
    cloudUploadProgress = file.cloudUploadProgress || 0;
    return uploadProgress / 2 + cloudUploadProgress / 2;
  };

  return UploaderFile;

})();

EJSON.addType("UploaderFile", UploaderFile.fromJSONValue);

if (Meteor.isClient) {
  UploaderFile.upload = function(uploaderId, file, settings) {
    if (settings == null) {
      settings = {};
    }
    return new UploaderFile({}, settings).upload(uploaderId, file);
  };
  UploaderFile.prototype.rewind = function() {
    this.data = null;
    this.start = 0;
    this.end = 0;
    this.bytesRead = 0;
    return this.bytesUploaded = 0;
  };
  UploaderFile.prototype._updateStatus = function() {
    var readProgress, uploadProgress;
    readProgress = Math.round(this.bytesRead / this.size * 100);
    uploadProgress = Math.round(this.bytesUploaded / this.size * 100);
    return UploadedFiles.update({
      _id: this.id
    }, {
      $set: {
        readProgress: readProgress,
        uploadProgress: uploadProgress
      }
    });
  };
  UploaderFile.prototype.upload = function(uploaderId, file) {
    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
    UploadedFiles.insert({
      _id: this.id,
      name: this.name,
      type: this.type,
      size: this.size,
      uploaderId: uploaderId,
      readProgress: 0,
      uploadProgress: 0,
      cloudUploadProgress: 0
    });
    this.read(file);
    return this;
  };
  UploaderFile.prototype.read = function(file) {
    var blob, reader;
    if (this.bytesUploaded < this.size) {
      this.start = this.end;
      this.end += this.CHUNK_SIZE;
      if (this.end > this.size) {
        this.end = this.size;
      }
      reader = new FileReader;
      reader.onload = (function(_this) {
        return function() {
          _this.bytesRead += _this.end - _this.start;
          _this.data = new Uint8Array(reader.result);
          return Meteor.call("uploadChunk", _this, function(error, result) {
            if (error) {
              _this.rewind();
              _this._updateStatus();
              throw error;
            } else {
              _this.bytesUploaded += _this.data.length;
              _this._updateStatus();
              return _this.read(file);
            }
          });
        };
      })(this);
      blob = file.slice(this.start, this.end);
      return reader.readAsArrayBuffer(blob);
    } else {
      return this._updateStatus();
    }
  };
}

if (Meteor.isServer) {
  fs = Npm.require("fs");
  path = Npm.require("path");
  Knox = Npm.require("knox");
  UploaderFile.prototype._updateStatus = function(progress) {
    return UploadedFiles.update({
      _id: this.id
    }, {
      $set: {
        cloudUploadProgress: progress.percent
      }
    });
  };
  UploaderFile.prototype._updateCloudUrl = function(url) {
    return UploadedFiles.update({
      _id: this.id
    }, {
      $set: {
        url: url
      }
    });
  };
  UploaderFile.prototype._setError = function(error) {
    return UploadedFiles.update({
      _id: this.id
    }, {
      $set: {
        error: error
      }
    });
  };
  UploaderFile.prototype.save = function(dirPath) {
    var buffer, fd, filePath, mode;
    filePath = path.resolve(path.join("", "" + this.id + this.ext));
    buffer = new Buffer(this.data);
    mode = this.start === 0 ? 'w' : 'a';
    fd = fs.openSync(filePath, mode);
    fs.writeSync(fd, buffer, 0, buffer.length, this.start);
    fs.closeSync(fd);
    if (this.end === this.size) {
      return this.upload(filePath);
    }
  };
  UploaderFile.prototype.upload = function(filePath) {
    var cloudPath, config, knox, put;
    config = Uploader.getConfig();
    knox = Knox.createClient(config);
    cloudPath = "" + this.id + this.ext;
    if (this.settings.directory != null) {
      cloudPath = this.settings.directory.replace(/\/?$/, '/').concat(cloudPath);
    }
    put = knox.putFile(filePath, cloudPath, Meteor.bindEnvironment((function(_this) {
      return function(error, response) {
        fs.unlinkSync(filePath);
        if (response) {
          _this._updateCloudUrl(knox.http(cloudPath));
        }
        if (error) {
          return _this._setError(new Meteor.Error(500, "An error occured transferring " + _this.name));
        }
      };
    })(this)));
    return put.on("progress", Meteor.bindEnvironment((function(_this) {
      return function(progress) {
        return _this._updateStatus(progress);
      };
    })(this)));
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/schnie:uploader/client/views/template.uploader.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("uploader", (function() {                                                                          // 2
  var view = this;                                                                                                     // 3
  return HTML.DIV({                                                                                                    // 4
    "class": "uploader-controls"                                                                                       // 5
  }, "\n\n    ", Blaze.If(function() {                                                                                 // 6
    return Spacebars.call(view.lookup("filesSelected"));                                                               // 7
  }, function() {                                                                                                      // 8
    return [ "\n\n      ", HTML.Comment(" PROGRESS BAR "), "\n      ", HTML.DIV({                                      // 9
      "class": "progress progress-striped"                                                                             // 10
    }, "\n        ", HTML.DIV({                                                                                        // 11
      "class": function() {                                                                                            // 12
        return [ "progress-bar ", Blaze.If(function() {                                                                // 13
          return Spacebars.call(view.lookup("complete"));                                                              // 14
        }, function() {                                                                                                // 15
          return "progress-bar-success";                                                                               // 16
        }) ];                                                                                                          // 17
      },                                                                                                               // 18
      role: "progressbar",                                                                                             // 19
      "aria-valuenow": function() {                                                                                    // 20
        return Spacebars.mustache(view.lookup("progress"));                                                            // 21
      },                                                                                                               // 22
      "aria-valuemin": "0",                                                                                            // 23
      "aria-valuemax": "100",                                                                                          // 24
      style: function() {                                                                                              // 25
        return [ "width: ", Spacebars.mustache(view.lookup("progress")), "%" ];                                        // 26
      }                                                                                                                // 27
    }, "\n          ", HTML.SPAN(Blaze.View(function() {                                                               // 28
      return Spacebars.mustache(view.lookup("progress"));                                                              // 29
    }), "%"), "\n        "), "\n      "), "\n      ", Blaze.If(function() {                                            // 30
      return Spacebars.call(view.lookup("multipleQueue"));                                                             // 31
    }, function() {                                                                                                    // 32
      return [ "\n        ", HTML.SPAN("Uploading ", Blaze.View(function() {                                           // 33
        return Spacebars.mustache(view.lookup("currentlyUploading"));                                                  // 34
      }), " of ", Blaze.View(function() {                                                                              // 35
        return Spacebars.mustache(view.lookup("queueSize"));                                                           // 36
      })), "\n      " ];                                                                                               // 37
    }), "\n\n    " ];                                                                                                  // 38
  }, function() {                                                                                                      // 39
    return [ "\n\n      ", HTML.Comment(" UPLOAD BUTTON "), "\n      ", HTML.INPUT({                                   // 40
      type: "file",                                                                                                    // 41
      accept: function() {                                                                                             // 42
        return Spacebars.mustache(Spacebars.dot(view.lookup("settings"), "accept"));                                   // 43
      },                                                                                                               // 44
      multiple: function() {                                                                                           // 45
        return Spacebars.mustache(Spacebars.dot(view.lookup("settings"), "multiple"));                                 // 46
      },                                                                                                               // 47
      "class": "hidden file-upload"                                                                                    // 48
    }), "\n      ", Blaze.If(function() {                                                                              // 49
      return Spacebars.call(view.templateContentBlock);                                                                // 50
    }, function() {                                                                                                    // 51
      return [ "\n        ", Blaze.InOuterTemplateScope(view, function() {                                             // 52
        return Spacebars.include(function() {                                                                          // 53
          return Spacebars.call(view.templateContentBlock);                                                            // 54
        });                                                                                                            // 55
      }), "\n      " ];                                                                                                // 56
    }, function() {                                                                                                    // 57
      return [ "\n        ", HTML.BUTTON({                                                                             // 58
        type: "button",                                                                                                // 59
        "class": "btn btn-default btn-block file-upload-button"                                                        // 60
      }, "\n          ", HTML.SPAN({                                                                                   // 61
        "class": "glyphicon glyphicon-cloud-upload fa fa-cloud-upload"                                                 // 62
      }), "\n          Upload\n        "), "\n      " ];                                                               // 63
    }), "\n    " ];                                                                                                    // 64
  }), "\n\n  ");                                                                                                       // 65
}));                                                                                                                   // 66
                                                                                                                       // 67
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/schnie:uploader/client/views/uploader.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var addFile, clickHandler, dataURLToBlob, getFile, getFileDocument, progress, removeFile, reset, watchFilesCollection;

clickHandler = function(event, tpl) {
  event.preventDefault();
  return $(tpl.find(".file-upload")).click();
};

dataURLToBlob = function(dataUrl) {
  var ab, binaryImg, i, length, ua;
  binaryImg = window.atob(dataUrl.slice(dataUrl.indexOf("base64") + 7, dataUrl.length));
  length = binaryImg.length;
  ab = new ArrayBuffer(length);
  ua = new Uint8Array(ab);
  i = 0;
  while (i < length) {
    ua[i] = binaryImg.charCodeAt(i);
    i++;
  }
  return new Blob([ua]);
};

getFile = function(id) {
  var file, files;
  files = this.stateManager.get("files");
  return file = _.findWhere(files, {
    id: id
  });
};

getFileDocument = function(id) {
  var file;
  file = getFile.call(this, id);
  if (file != null) {
    return file.getDocument();
  }
};

removeFile = function(id) {
  var files;
  files = this.stateManager.get("files");
  files = _.reject(files, function(file) {
    return file.id === id;
  });
  return this.stateManager.set("files", files);
};

addFile = function(file) {
  var files;
  files = this.stateManager.get("files");
  files.push(file);
  return this.stateManager.set("files", files);
};

progress = function() {
  var files, total, tpl;
  tpl = UI._templateInstance();
  files = tpl.stateManager.get("files");
  total = _.reduce(files, function(memo, val) {
    return memo += val.getTotalProgress();
  }, 0);
  return Math.round(total / _.size(files) * 100 / 100);
};

reset = function() {
  return this.stateManager.set("files", []);
};

watchFilesCollection = function() {
  Meteor.subscribe("uploadedFiles", this.uploaderId);
  return UploadedFiles.find().observeChanges({
    changed: (function(_this) {
      return function(id, fields) {
        var allDone, err, file, _base, _base1;
        if (fields.url != null) {
          file = getFileDocument.call(_this, id);
          if (file != null) {
            if (typeof (_base = _this.data.settings).onUpload === "function") {
              _base.onUpload(null, file);
            }
          }
        }
        if (fields.error != null) {
          err = fields.error;
          file = getFileDocument.call(_this, id);
          if (file != null) {
            removeFile.call(_this, id);
            if (typeof (_base1 = _this.data.settings).onUpload === "function") {
              _base1.onUpload(new Meteor.Error(err.error, err.reason), file);
            }
          }
        }
        allDone = _.every(_this.stateManager.get("files"), function(file) {
          var _ref;
          return (_ref = file.getDocument()) != null ? _ref.url : void 0;
        });
        if (allDone) {
          return reset.call(_this);
        }
      };
    })(this)
  });
};

Template.uploader.created = function() {
  this.uploaderId = Random.id();
  this.stateManager = new UploaderState(this.uploaderId);
  reset.call(this);
  return watchFilesCollection.call(this);
};

Template.uploader.helpers({
  progress: progress,
  complete: function() {
    return progress() === 100;
  },
  filesSelected: function() {
    var tpl;
    tpl = UI._templateInstance();
    return tpl.stateManager.get("files");
  }
});

Template.uploader.events({
  "click button": function(event, tpl) {
    return clickHandler(event, tpl);
  },
  "click a": function(event, tpl) {
    return clickHandler(event, tpl);
  },
  "change input[type=file]": function(event, tpl) {
    var files, settings;
    settings = tpl.data.settings;
    files = event.currentTarget.files;
    if (settings.onSelection != null) {
      settings.onSelection(files);
    }
    return _.each(files, (function(_this) {
      return function(file) {
        var reader, uFile;
        if ((settings.manipulateImage != null) && (file.type.match(/image.*/) != null)) {
          reader = new FileReader;
          reader.onload = function() {
            return settings.manipulateImage(reader.result, file, function(dataUrl) {
              var blob, uFile;
              blob = dataURLToBlob(dataUrl);
              blob.name = file.name;
              uFile = UploaderFile.upload(tpl.uploaderId, blob, settings);
              return addFile.call(tpl, uFile);
            });
          };
          return reader.readAsDataURL(file);
        } else {
          uFile = UploaderFile.upload(tpl.uploaderId, file, settings);
          return addFile.call(tpl, uFile);
        }
      };
    })(this));
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/schnie:uploader/client/UploaderState.coffee.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.UploaderState = (function(_super) {
  __extends(UploaderState, _super);

  function UploaderState(uploaderId) {
    this.uploaderId = uploaderId;
    UploaderState.__super__.constructor.call(this);
  }

  UploaderState.prototype._getKey = function(key) {
    return "" + this.uploaderId + "-" + key;
  };

  UploaderState.prototype.set = function(key, value) {
    return UploaderState.__super__.set.call(this, this._getKey(key), value);
  };

  UploaderState.prototype.get = function(key) {
    return UploaderState.__super__.get.call(this, this._getKey(key));
  };

  return UploaderState;

})(ReactiveDict);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['schnie:uploader'] = {};

})();
