(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;

/* Package-scope variables */
var FileCollection, __coffeescriptShare;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/vsivsi:file-collection/src/gridFS.coffee.js                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
share.defaultChunkSize = 2 * 1024 * 1024 - 1024;

share.defaultRoot = 'fs';

share.insert_func = function(file, chunkSize) {
  var id, subFile, _ref, _ref1, _ref2, _ref3;
  if (file == null) {
    file = {};
  }
  try {
    id = new Meteor.Collection.ObjectID("" + file._id);
  } catch (_error) {
    id = new Meteor.Collection.ObjectID();
  }
  subFile = {};
  subFile._id = id;
  subFile.length = 0;
  subFile.md5 = 'd41d8cd98f00b204e9800998ecf8427e';
  subFile.uploadDate = new Date();
  subFile.chunkSize = chunkSize;
  subFile.filename = (_ref = file.filename) != null ? _ref : '';
  subFile.metadata = (_ref1 = file.metadata) != null ? _ref1 : {};
  subFile.aliases = (_ref2 = file.aliases) != null ? _ref2 : [];
  subFile.contentType = (_ref3 = file.contentType) != null ? _ref3 : 'application/octet-stream';
  return subFile;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/vsivsi:file-collection/src/server_shared.coffee.js                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var through2;

if (Meteor.isServer) {
  through2 = Npm.require('through2');
  share.check_allow_deny = function(type, userId, file, fields) {
    var checkRules, result;
    checkRules = function(rules) {
      var func, res, _i, _len, _ref;
      res = false;
      _ref = rules[type];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        func = _ref[_i];
        if (!res) {
          res = func(userId, file, fields);
        }
      }
      return res;
    };
    result = !checkRules(this.denys) && checkRules(this.allows);
    return result;
  };
  share.bind_env = function(func) {
    if (func != null) {
      return Meteor.bindEnvironment(func, function(err) {
        throw err;
      });
    } else {
      return func;
    }
  };
  share.safeObjectID = function(s) {
    if (s != null ? s.match(/^[0-9a-f]{24}$/i) : void 0) {
      return new Mongo.ObjectID(s);
    } else {
      return null;
    }
  };
  share.streamChunker = function(size) {
    var makeFuncs;
    if (size == null) {
      size = share.defaultChunkSize;
    }
    makeFuncs = function(size) {
      var bufferList, flush, total, transform;
      bufferList = [new Buffer(0)];
      total = 0;
      flush = function(cb) {
        var lastBuffer, newBuffer, outSize, outputBuffer;
        outSize = total > size ? size : total;
        if (outSize > 0) {
          outputBuffer = Buffer.concat(bufferList, outSize);
          this.push(outputBuffer);
          total -= outSize;
        }
        lastBuffer = bufferList.pop();
        newBuffer = lastBuffer.slice(lastBuffer.length - total);
        bufferList = [newBuffer];
        if (total < size) {
          return cb();
        } else {
          return flush.bind(this)(cb);
        }
      };
      transform = function(chunk, enc, cb) {
        bufferList.push(chunk);
        total += chunk.length;
        if (total < size) {
          return cb();
        } else {
          return flush.bind(this)(cb);
        }
      };
      return [transform, flush];
    };
    return through2.apply(this, makeFuncs(size));
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/vsivsi:file-collection/src/gridFS_server.coffee.js                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var dicer, express, fs, grid, gridLocks, mongodb, path, reject_file_modifier,                
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (Meteor.isServer) {
  mongodb = Npm.require('mongodb');
  grid = Npm.require('gridfs-locking-stream');
  gridLocks = Npm.require('gridfs-locks');
  fs = Npm.require('fs');
  path = Npm.require('path');
  dicer = Npm.require('dicer');
  express = Npm.require('express');
  FileCollection = (function(_super) {
    __extends(FileCollection, _super);

    function FileCollection(root, options) {
      var indexOptions, self, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      this.root = root != null ? root : share.defaultRoot;
      if (options == null) {
        options = {};
      }
      if (!(this instanceof FileCollection)) {
        return new FileCollection(this.root, options);
      }
      if (!(this instanceof Mongo.Collection)) {
        throw new Error('The global definition of Mongo.Collection has changed since the file-collection package was loaded. Please ensure that any packages that redefine Mongo.Collection are loaded before file-collection.');
      }
      if (typeof this.root === 'object') {
        options = this.root;
        this.root = share.defaultRoot;
      }
      this.chunkSize = (_ref = options.chunkSize) != null ? _ref : share.defaultChunkSize;
      this.db = Meteor.wrapAsync(mongodb.MongoClient.connect)(process.env.MONGO_URL, {});
      this.lockOptions = {
        timeOut: (_ref1 = (_ref2 = options.locks) != null ? _ref2.timeOut : void 0) != null ? _ref1 : 360,
        lockExpiration: (_ref3 = (_ref4 = options.locks) != null ? _ref4.lockExpiration : void 0) != null ? _ref3 : 90,
        pollingInterval: (_ref5 = (_ref6 = options.locks) != null ? _ref6.pollingInterval : void 0) != null ? _ref5 : 5
      };
      this.locks = gridLocks.LockCollection(this.db, {
        root: this.root,
        timeOut: this.lockOptions.timeOut,
        lockExpiration: this.lockOptions.lockExpiration,
        pollingInterval: this.lockOptions.pollingInterval
      });
      this.gfs = new grid(this.db, mongodb, this.root);
      this.baseURL = (_ref7 = options.baseURL) != null ? _ref7 : "/gridfs/" + this.root;
      if (options.resumable || options.http) {
        share.setupHttpAccess.bind(this)(options);
      }
      this.allows = {
        read: [],
        insert: [],
        write: [],
        remove: []
      };
      this.denys = {
        read: [],
        insert: [],
        write: [],
        remove: []
      };
      FileCollection.__super__.constructor.call(this, this.root + '.files', {
        idGeneration: 'MONGO'
      });
      if (options.resumable) {
        indexOptions = {};
        if (typeof options.resumableIndexName === 'string') {
          indexOptions.name = options.resumableIndexName;
        }
        this._ensureIndex({
          'metadata._Resumable.resumableIdentifier': 1,
          'metadata._Resumable.resumableChunkNumber': 1,
          length: 1
        }, indexOptions);
      }
      FileCollection.__super__.allow.bind(this)({
        insert: (function(_this) {
          return function(userId, file) {
            return true;
          };
        })(this),
        remove: (function(_this) {
          return function(userId, file) {
            return true;
          };
        })(this)
      });
      FileCollection.__super__.deny.bind(this)({
        insert: (function(_this) {
          return function(userId, file) {
            check(file, {
              _id: Meteor.Collection.ObjectID,
              length: Match.Where(function(x) {
                check(x, Match.Integer);
                return x === 0;
              }),
              md5: Match.Where(function(x) {
                check(x, String);
                return x === 'd41d8cd98f00b204e9800998ecf8427e';
              }),
              uploadDate: Date,
              chunkSize: Match.Where(function(x) {
                check(x, Match.Integer);
                return x === _this.chunkSize;
              }),
              filename: String,
              contentType: String,
              aliases: [String],
              metadata: Object
            });
            if (file.chunkSize !== _this.chunkSize) {
              console.warn("Invalid chunksize");
              return true;
            }
            if (share.check_allow_deny.bind(_this)('insert', userId, file)) {
              return false;
            }
            return true;
          };
        })(this),
        update: (function(_this) {
          return function(userId, file, fields) {
            return true;
          };
        })(this),
        remove: (function(_this) {
          return function(userId, file) {
            return true;
          };
        })(this)
      });
      self = this;
      Meteor.server.method_handlers["" + this._prefix + "remove"] = function(selector) {
        var file;
        if (!LocalCollection._selectorIsIdPerhapsAsObject(selector)) {
          throw new Meteor.Error(403, "Not permitted. Untrusted code may only remove documents by ID.");
        }
        file = self.findOne(selector);
        if (file) {
          if (share.check_allow_deny.bind(self)('remove', this.userId, file)) {
            return self.remove(file);
          } else {
            throw new Meteor.Error(403, "Access denied");
          }
        } else {
          return 0;
        }
      };
    }

    FileCollection.prototype.allow = function(allowOptions) {
      var func, type, _results;
      _results = [];
      for (type in allowOptions) {
        func = allowOptions[type];
        if (!(type in this.allows)) {
          throw new Error("Unrecognized allow rule type '" + type + "'.");
        }
        if (typeof func !== 'function') {
          throw new Error("Allow rule " + type + " must be a valid function.");
        }
        _results.push(this.allows[type].push(func));
      }
      return _results;
    };

    FileCollection.prototype.deny = function(denyOptions) {
      var func, type, _results;
      _results = [];
      for (type in denyOptions) {
        func = denyOptions[type];
        if (!(type in this.denys)) {
          throw new Error("Unrecognized deny rule type '" + type + "'.");
        }
        if (typeof func !== 'function') {
          throw new Error("Deny rule " + type + " must be a valid function.");
        }
        _results.push(this.denys[type].push(func));
      }
      return _results;
    };

    FileCollection.prototype.insert = function(file, callback) {
      if (file == null) {
        file = {};
      }
      if (callback == null) {
        callback = void 0;
      }
      file = share.insert_func(file, this.chunkSize);
      return FileCollection.__super__.insert.call(this, file, callback);
    };

    FileCollection.prototype.update = function(selector, modifier, options, callback) {
      var err;
      if (options == null) {
        options = {};
      }
      if (callback == null) {
        callback = void 0;
      }
      if ((callback == null) && typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (options.upsert != null) {
        err = new Error("Update does not support the upsert option");
        if (callback != null) {
          return callback(err);
        } else {
          throw err;
        }
      }
      if (reject_file_modifier(modifier) && !options.force) {
        err = new Error("Modifying gridFS read-only document elements is a very bad idea!");
        if (callback != null) {
          return callback(err);
        } else {
          throw err;
        }
      } else {
        return FileCollection.__super__.update.call(this, selector, modifier, options, callback);
      }
    };

    FileCollection.prototype.upsert = function(selector, modifier, options, callback) {
      var err;
      if (options == null) {
        options = {};
      }
      if (callback == null) {
        callback = void 0;
      }
      if ((callback == null) && typeof options === 'function') {
        callback = options;
      }
      err = new Error("File Collections do not support 'upsert'");
      if (callback != null) {
        return callback(err);
      } else {
        throw err;
      }
    };

    FileCollection.prototype.upsertStream = function(file, options, callback) {
      var cbCalled, found, mods, writeStream;
      if (options == null) {
        options = {};
      }
      if (callback == null) {
        callback = void 0;
      }
      if ((callback == null) && typeof options === 'function') {
        callback = options;
        options = {};
      }
      callback = share.bind_env(callback);
      cbCalled = false;
      mods = {};
      if (file.filename != null) {
        mods.filename = file.filename;
      }
      if (file.aliases != null) {
        mods.aliases = file.aliases;
      }
      if (file.contentType != null) {
        mods.contentType = file.contentType;
      }
      if (file.metadata != null) {
        mods.metadata = file.metadata;
      }
      if (options.autoRenewLock == null) {
        options.autoRenewLock = true;
      }
      if (options.mode === 'w+') {
        throw new Error("The ability to append file data in upsertStream() was removed in version 1.0.0");
      }
      if (file._id) {
        found = this.findOne({
          _id: file._id
        });
      }
      if (!(file._id && found)) {
        file._id = this.insert(mods);
      } else if (Object.keys(mods).length > 0) {
        this.update({
          _id: file._id
        }, {
          $set: mods
        });
      }
      writeStream = Meteor.wrapAsync(this.gfs.createWriteStream.bind(this.gfs))({
        root: this.root,
        _id: mongodb.ObjectID("" + file._id),
        mode: 'w',
        timeOut: this.lockOptions.timeOut,
        lockExpiration: this.lockOptions.lockExpiration,
        pollingInterval: this.lockOptions.pollingInterval
      });
      if (writeStream) {
        if (options.autoRenewLock) {
          writeStream.on('expires-soon', (function(_this) {
            return function() {
              return writeStream.renewLock(function(e, d) {
                if (e || !d) {
                  return console.warn("Automatic Write Lock Renewal Failed: " + file._id, e);
                }
              });
            };
          })(this));
        }
        if (callback != null) {
          writeStream.on('close', function(retFile) {
            if (retFile) {
              return callback(null, retFile);
            }
          });
          writeStream.on('error', function(err) {
            return callback(err);
          });
        }
        return writeStream;
      }
      return null;
    };

    FileCollection.prototype.findOneStream = function(selector, options, callback) {
      var file, opts, range, readStream, _ref, _ref1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      if (callback == null) {
        callback = void 0;
      }
      if ((callback == null) && typeof options === 'function') {
        callback = options;
        options = {};
      }
      callback = share.bind_env(callback);
      opts = {};
      if (options.sort != null) {
        opts.sort = options.sort;
      }
      if (options.skip != null) {
        opts.skip = options.skip;
      }
      file = this.findOne(selector, opts);
      if (file) {
        if (options.autoRenewLock == null) {
          options.autoRenewLock = true;
        }
        range = {
          start: (_ref = (_ref1 = options.range) != null ? _ref1.start : void 0) != null ? _ref : 0,
          end: (_ref2 = (_ref3 = options.range) != null ? _ref3.end : void 0) != null ? _ref2 : file.length - 1
        };
        readStream = Meteor.wrapAsync(this.gfs.createReadStream.bind(this.gfs))({
          root: this.root,
          _id: mongodb.ObjectID("" + file._id),
          timeOut: this.lockOptions.timeOut,
          lockExpiration: this.lockOptions.lockExpiration,
          pollingInterval: this.lockOptions.pollingInterval,
          range: {
            startPos: range.start,
            endPos: range.end
          }
        });
        if (readStream) {
          if (options.autoRenewLock) {
            readStream.on('expires-soon', (function(_this) {
              return function() {
                return readStream.renewLock(function(e, d) {
                  if (e || !d) {
                    return console.warn("Automatic Read Lock Renewal Failed: " + file._id, e);
                  }
                });
              };
            })(this));
          }
          if (callback != null) {
            readStream.on('close', function() {
              return callback(null, file);
            });
            readStream.on('error', function(err) {
              return callback(err);
            });
          }
          return readStream;
        }
      }
      return null;
    };

    FileCollection.prototype.remove = function(selector, callback) {
      var err, ret;
      if (callback == null) {
        callback = void 0;
      }
      callback = share.bind_env(callback);
      if (selector != null) {
        ret = 0;
        this.find(selector).forEach((function(_this) {
          return function(file) {
            var res;
            res = Meteor.wrapAsync(_this.gfs.remove.bind(_this.gfs))({
              _id: mongodb.ObjectID("" + file._id),
              root: _this.root,
              timeOut: _this.lockOptions.timeOut,
              lockExpiration: _this.lockOptions.lockExpiration,
              pollingInterval: _this.lockOptions.pollingInterval
            });
            return ret += res ? 1 : 0;
          };
        })(this));
        (callback != null) && callback(null, ret);
        return ret;
      } else {
        err = new Error("Remove with an empty selector is not supported");
        if (callback != null) {
          callback(err);
        } else {
          throw err;
        }
      }
    };

    FileCollection.prototype.importFile = function(filePath, file, callback) {
      var readStream, writeStream;
      callback = share.bind_env(callback);
      filePath = path.normalize(filePath);
      if (file == null) {
        file = {};
      }
      if (file.filename == null) {
        file.filename = path.basename(filePath);
      }
      readStream = fs.createReadStream(filePath);
      writeStream = this.upsertStream(file);
      return readStream.pipe(share.streamChunker(this.chunkSize)).pipe(writeStream).on('close', share.bind_env(function(d) {
        return callback(null, d);
      })).on('error', share.bind_env(callback));
    };

    FileCollection.prototype.exportFile = function(selector, filePath, callback) {
      var readStream, writeStream;
      callback = share.bind_env(callback);
      filePath = path.normalize(filePath);
      readStream = this.findOneStream(selector);
      writeStream = fs.createWriteStream(filePath);
      return readStream.pipe(writeStream).on('finish', share.bind_env(callback)).on('error', share.bind_env(callback));
    };

    return FileCollection;

  })(Mongo.Collection);
  reject_file_modifier = function(modifier) {
    var forbidden, required;
    forbidden = Match.OneOf(Match.ObjectIncluding({
      _id: Match.Any
    }), Match.ObjectIncluding({
      length: Match.Any
    }), Match.ObjectIncluding({
      chunkSize: Match.Any
    }), Match.ObjectIncluding({
      md5: Match.Any
    }), Match.ObjectIncluding({
      uploadDate: Match.Any
    }));
    required = Match.OneOf(Match.ObjectIncluding({
      _id: Match.Any
    }), Match.ObjectIncluding({
      length: Match.Any
    }), Match.ObjectIncluding({
      chunkSize: Match.Any
    }), Match.ObjectIncluding({
      md5: Match.Any
    }), Match.ObjectIncluding({
      uploadDate: Match.Any
    }), Match.ObjectIncluding({
      metadata: Match.Any
    }), Match.ObjectIncluding({
      aliases: Match.Any
    }), Match.ObjectIncluding({
      filename: Match.Any
    }), Match.ObjectIncluding({
      contentType: Match.Any
    }));
    return Match.test(modifier, Match.OneOf(Match.ObjectIncluding({
      $set: forbidden
    }), Match.ObjectIncluding({
      $unset: required
    }), Match.ObjectIncluding({
      $inc: forbidden
    }), Match.ObjectIncluding({
      $mul: forbidden
    }), Match.ObjectIncluding({
      $bit: forbidden
    }), Match.ObjectIncluding({
      $min: forbidden
    }), Match.ObjectIncluding({
      $max: forbidden
    }), Match.ObjectIncluding({
      $rename: required
    }), Match.ObjectIncluding({
      $currentDate: forbidden
    })));
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/vsivsi:file-collection/src/resumable_server.coffee.js                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var async, check_order, dicer, express, grid, gridLocks, mongodb, resumable_get_handler, resumable_get_lookup, resumable_post_handler, resumable_post_lookup;

if (Meteor.isServer) {
  express = Npm.require('express');
  mongodb = Npm.require('mongodb');
  grid = Npm.require('gridfs-locking-stream');
  gridLocks = Npm.require('gridfs-locks');
  dicer = Npm.require('dicer');
  async = Npm.require('async');
  check_order = function(file, callback) {
    var fileId, lock;
    fileId = mongodb.ObjectID("" + file.metadata._Resumable.resumableIdentifier);
    lock = gridLocks.Lock(fileId, this.locks, {}).obtainWriteLock();
    lock.on('locked', (function(_this) {
      return function() {
        var cursor, files;
        files = _this.db.collection("" + _this.root + ".files");
        cursor = files.find({
          'metadata._Resumable.resumableIdentifier': file.metadata._Resumable.resumableIdentifier,
          length: {
            $ne: 0
          }
        }, {
          fields: {
            length: 1,
            metadata: 1
          },
          sort: {
            'metadata._Resumable.resumableChunkNumber': 1
          }
        });
        return cursor.count(function(err, count) {
          var chunks;
          if (err) {
            lock.releaseLock();
            return callback(err);
          }
          if (!(count >= 1)) {
            cursor.close();
            lock.releaseLock();
            return callback();
          }
          if (count !== file.metadata._Resumable.resumableTotalChunks) {
            cursor.close();
            lock.releaseLock();
            return callback();
          }
          chunks = _this.db.collection("" + _this.root + ".chunks");
          cursor.batchSize(file.metadata._Resumable.resumableTotalChunks + 1);
          return cursor.toArray(function(err, parts) {
            if (err) {
              lock.releaseLock();
              return callback(err);
            }
            return async.eachLimit(parts, 5, function(part, cb) {
              var partId, partlock;
              if (err) {
                console.error("Error from cursor.next()", err);
                cb(err);
              }
              if (!part) {
                return cb(new Error("Received null part"));
              }
              partId = mongodb.ObjectID("" + part._id);
              partlock = gridLocks.Lock(partId, _this.locks, {}).obtainWriteLock();
              partlock.on('locked', function() {
                return async.series([
                  function(cb) {
                    return chunks.update({
                      files_id: partId,
                      n: 0
                    }, {
                      $set: {
                        files_id: fileId,
                        n: part.metadata._Resumable.resumableChunkNumber - 1
                      }
                    }, cb);
                  }, function(cb) {
                    return files.remove({
                      _id: partId
                    }, cb);
                  }
                ], function(err, res) {
                  if (err) {
                    return cb(err);
                  }
                  if (part.metadata._Resumable.resumableChunkNumber !== part.metadata._Resumable.resumableTotalChunks) {
                    partlock.removeLock();
                    return cb();
                  } else {
                    return chunks.update({
                      files_id: partId,
                      n: 1
                    }, {
                      $set: {
                        files_id: fileId,
                        n: part.metadata._Resumable.resumableChunkNumber
                      }
                    }, function(err, res) {
                      partlock.removeLock();
                      if (err) {
                        return cb(err);
                      }
                      return cb();
                    });
                  }
                });
              });
              partlock.on('timed-out', function() {
                return cb(new Error('Partlock timed out!'));
              });
              partlock.on('expired', function() {
                return cb(new Error('Partlock expired!'));
              });
              return partlock.on('error', function(err) {
                console.error("Error obtaining partlock " + part._id, err);
                return cb(err);
              });
            }, function(err) {
              var md5Command;
              if (err) {
                lock.releaseLock();
                return callback(err);
              }
              md5Command = {
                filemd5: fileId,
                root: "" + _this.root
              };
              return _this.db.command(md5Command, function(err, results) {
                if (err) {
                  lock.releaseLock();
                  return callback(err);
                }
                return files.update({
                  _id: fileId
                }, {
                  $set: {
                    length: file.metadata._Resumable.resumableTotalSize,
                    md5: results.md5
                  }
                }, (function(_this) {
                  return function(err, res) {
                    lock.releaseLock();
                    return callback(err);
                  };
                })(this));
              });
            });
          });
        });
      };
    })(this));
    lock.on('expires-soon', function() {
      return lock.renewLock().once('renewed', function(ld) {
        if (!ld) {
          return console.warn("Resumable upload lock renewal failed!");
        }
      });
    });
    lock.on('expired', function() {
      return callback(new Error("File Lock expired"));
    });
    lock.on('timed-out', function() {
      return callback(new Error("File Lock timed out"));
    });
    return lock.on('error', function(err) {
      return callback(err);
    });
  };
  resumable_post_lookup = function(params, query, multipart) {
    var _ref;
    return {
      _id: share.safeObjectID(multipart != null ? (_ref = multipart.params) != null ? _ref.resumableIdentifier : void 0 : void 0)
    };
  };
  resumable_post_handler = function(req, res, next) {
    var chunkQuery, findResult, resumable, writeStream, _ref, _ref1;
    if (!((_ref = req.multipart) != null ? (_ref1 = _ref.params) != null ? _ref1.resumableIdentifier : void 0 : void 0)) {
      console.error("Missing resumable.js multipart information");
      res.writeHead(501, {
        'Content-Type': 'text/plain'
      });
      res.end();
      return;
    }
    resumable = req.multipart.params;
    resumable.resumableTotalSize = parseInt(resumable.resumableTotalSize);
    resumable.resumableTotalChunks = parseInt(resumable.resumableTotalChunks);
    resumable.resumableChunkNumber = parseInt(resumable.resumableChunkNumber);
    resumable.resumableChunkSize = parseInt(resumable.resumableChunkSize);
    resumable.resumableCurrentChunkSize = parseInt(resumable.resumableCurrentChunkSize);
    if (!((req.gridFS.chunkSize === resumable.resumableChunkSize) && (resumable.resumableCurrentChunkSize === resumable.resumableChunkSize) || ((resumable.resumableChunkNumber === resumable.resumableTotalChunks) && (resumable.resumableCurrentChunkSize < 2 * resumable.resumableChunkSize)))) {
      res.writeHead(501, {
        'Content-Type': 'text/plain'
      });
      res.end();
      return;
    }
    chunkQuery = {
      length: resumable.resumableCurrentChunkSize,
      'metadata._Resumable.resumableIdentifier': resumable.resumableIdentifier,
      'metadata._Resumable.resumableChunkNumber': resumable.resumableChunkNumber
    };
    findResult = this.findOne(chunkQuery, {
      fields: {
        _id: 1
      }
    });
    if (findResult) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      return res.end();
    } else {
      req.gridFS.metadata._Resumable = resumable;
      writeStream = this.upsertStream({
        filename: "_Resumable_" + resumable.resumableIdentifier + "_" + resumable.resumableChunkNumber + "_" + resumable.resumableTotalChunks,
        metadata: req.gridFS.metadata
      });
      if (!writeStream) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.end();
        return;
      }
      return req.multipart.fileStream.pipe(share.streamChunker(this.chunkSize)).pipe(writeStream).on('close', share.bind_env((function(_this) {
        return function(retFile) {
          if (retFile) {
            return check_order.bind(_this)(req.gridFS, function(err) {
              if (err) {
                console.error("Error reassembling chunks of resumable.js upload", err);
                res.writeHead(500, {
                  'Content-Type': 'text/plain'
                });
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                });
              }
              return res.end();
            });
          } else {
            console.error("Missing retFile on pipe close");
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            return res.end();
          }
        };
      })(this))).on('error', share.bind_env((function(_this) {
        return function(err) {
          console.error("Piping Error!", err);
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          return res.end();
        };
      })(this)));
    }
  };
  resumable_get_lookup = function(params, query) {
    var q;
    q = {
      _id: share.safeObjectID(query.resumableIdentifier)
    };
    return q;
  };
  resumable_get_handler = function(req, res, next) {
    var chunkQuery, query, result;
    query = req.query;
    chunkQuery = {
      $or: [
        {
          _id: share.safeObjectID(query.resumableIdentifier),
          length: query.resumableTotalSize
        }, {
          length: query.resumableCurrentChunkSize,
          'metadata._Resumable.resumableIdentifier': query.resumableIdentifier,
          'metadata._Resumable.resumableChunkNumber': query.resumableChunkNumber
        }
      ]
    };
    result = this.findOne(chunkQuery, {
      fields: {
        _id: 1
      }
    });
    if (result) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
    } else {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });
    }
    return res.end();
  };
  share.resumable_paths = [
    {
      method: 'post',
      path: '/_resumable',
      lookup: resumable_post_lookup,
      handler: resumable_post_handler
    }, {
      method: 'get',
      path: '/_resumable',
      lookup: resumable_get_lookup,
      handler: resumable_get_handler
    }
  ];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/vsivsi:file-collection/src/http_access_server.coffee.js                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var build_access_point, cookieParser, del, dice_multipart, dicer, express, find_mime_boundary, get, grid, gridLocks, handle_auth, lookup_userId_by_token, mongodb, post, put;

if (Meteor.isServer) {
  express = Npm.require('express');
  cookieParser = Npm.require('cookie-parser');
  mongodb = Npm.require('mongodb');
  grid = Npm.require('gridfs-locking-stream');
  gridLocks = Npm.require('gridfs-locks');
  dicer = Npm.require('dicer');
  find_mime_boundary = function(req) {
    var RE_BOUNDARY, result;
    RE_BOUNDARY = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i;
    result = RE_BOUNDARY.exec(req.headers['content-type']);
    return (result != null ? result[1] : void 0) || (result != null ? result[2] : void 0);
  };
  dice_multipart = function(req, res, next) {
    var boundary, count, d, fileName, fileStream, fileType, handleFailure, params, responseSent;
    next = share.bind_env(next);
    if (req.method !== 'POST') {
      next();
      return;
    }
    responseSent = false;
    handleFailure = function(msg, err, retCode) {
      if (err == null) {
        err = "";
      }
      if (retCode == null) {
        retCode = 500;
      }
      console.error("" + msg + " \n", err);
      if (!responseSent) {
        responseSent = true;
        res.writeHead(retCode, {
          'Content-Type': 'text/plain'
        });
        return res.end();
      }
    };
    boundary = find_mime_boundary(req);
    if (!boundary) {
      handleFailure("No MIME multipart boundary found for dicer");
      return;
    }
    params = {};
    count = 0;
    fileStream = null;
    fileType = 'text/plain';
    fileName = 'blob';
    d = new dicer({
      boundary: boundary
    });
    d.on('part', function(p) {
      p.on('header', function(header) {
        var RE_FILE, RE_PARAM, data, k, param, re, v, _ref;
        RE_FILE = /^form-data; name="file"; filename="([^"]+)"/;
        RE_PARAM = /^form-data; name="([^"]+)"/;
        for (k in header) {
          v = header[k];
          if (k === 'content-type') {
            fileType = v;
          }
          if (k === 'content-disposition') {
            if (re = RE_FILE.exec(v)) {
              fileStream = p;
              fileName = re[1];
            } else if (param = (_ref = RE_PARAM.exec(v)) != null ? _ref[1] : void 0) {
              data = '';
              count++;
              p.on('data', function(d) {
                return data += d.toString();
              });
              p.on('end', function() {
                count--;
                params[param] = data;
                if (count === 0 && fileStream) {
                  req.multipart = {
                    fileStream: fileStream,
                    fileName: fileName,
                    fileType: fileType,
                    params: params
                  };
                  responseSent = true;
                  return next();
                }
              });
            } else {
              console.warn("Dicer part", v);
            }
          }
        }
        if (count === 0 && fileStream) {
          req.multipart = {
            fileStream: fileStream,
            fileName: fileName,
            fileType: fileType,
            params: params
          };
          responseSent = true;
          return next();
        }
      });
      return p.on('error', function(err) {
        return handleFailure('Error in Dicer while parsing multipart:', err);
      });
    });
    d.on('error', function(err) {
      return handleFailure('Error in Dicer while parsing parts:', err);
    });
    d.on('finish', function() {
      if (!fileStream) {
        return handleFailure("Error in Dicer, no file found in POST");
      }
    });
    return req.pipe(d);
  };
  post = function(req, res, next) {
    var stream;
    if (req.multipart.fileType) {
      req.gridFS.contentType = req.multipart.fileType;
    }
    if (req.multipart.fileName) {
      req.gridFS.filename = req.multipart.fileName;
    }
    stream = this.upsertStream(req.gridFS);
    if (stream) {
      return req.multipart.fileStream.pipe(share.streamChunker(this.chunkSize)).pipe(stream).on('close', function(retFile) {
        if (retFile) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          return res.end();
        }
      }).on('error', function(err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        return res.end();
      });
    } else {
      res.writeHead(410, {
        'Content-Type': 'text/plain'
      });
      return res.end();
    }
  };
  get = function(req, res, next) {
    var chunksize, end, filename, headers, parts, start, statusCode, stream, _ref;
    if (req.headers['range']) {
      statusCode = 206;
      parts = req.headers["range"].replace(/bytes=/, "").split("-");
      start = parseInt(parts[0], 10);
      end = (parts[1] ? parseInt(parts[1], 10) : req.gridFS.length - 1);
      if ((start < 0) || (end >= req.gridFS.length) || (start > end) || isNaN(start) || isNaN(end)) {
        res.writeHead(416, {
          'Content-Type': 'text/plain',
          'Content-Range': 'bytes ' + '*/' + req.gridFS.length
        });
        res.end();
        return;
      }
      chunksize = (end - start) + 1;
      headers = {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + req.gridFS.length,
        'Accept-Ranges': 'bytes',
        'Content-Type': req.gridFS.contentType,
        'Content-Length': chunksize,
        'Last-Modified': req.gridFS.uploadDate.toUTCString()
      };
      stream = this.findOneStream({
        _id: req.gridFS._id
      }, {
        range: {
          start: start,
          end: end
        }
      });
    } else {
      statusCode = 200;
      headers = {
        'Content-type': req.gridFS.contentType,
        'Content-MD5': req.gridFS.md5,
        'Content-Length': req.gridFS.length,
        'Last-Modified': req.gridFS.uploadDate.toUTCString()
      };
      stream = this.findOneStream({
        _id: req.gridFS._id
      });
    }
    if ((req.query.download && req.query.download.toLowerCase() === 'true') || req.query.filename) {
      filename = encodeURIComponent((_ref = req.query.filename) != null ? _ref : req.gridFS.filename);
      headers['Content-Disposition'] = "attachment; filename=\"" + filename + "\"; filename*=UTF-8''" + filename;
    }
    if (req.query.cache && !isNaN(parseInt(req.query.cache))) {
      headers['Cache-Control'] = "max-age=" + parseInt(req.query.cache) + ", private";
    }
    if (req.method === 'HEAD') {
      res.writeHead(204, headers);
      res.end();
      return;
    }
    if (stream) {
      res.writeHead(statusCode, headers);
      return stream.pipe(res).on('close', function() {
        return res.end();
      }).on('error', function(err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        return res.end(err);
      });
    } else {
      res.writeHead(410, {
        'Content-Type': 'text/plain'
      });
      return res.end();
    }
  };
  put = function(req, res, next) {
    var stream;
    if (req.headers['content-type']) {
      req.gridFS.contentType = req.headers['content-type'];
    }
    stream = this.upsertStream(req.gridFS);
    if (stream) {
      return req.pipe(share.streamChunker(this.chunkSize)).pipe(stream).on('close', function(retFile) {
        if (retFile) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          return res.end();
        }
      }).on('error', function(err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        return res.end(err);
      });
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      return res.end("" + req.url + " Not found!");
    }
  };
  del = function(req, res, next) {
    this.remove(req.gridFS);
    res.writeHead(204, {
      'Content-Type': 'text/plain'
    });
    return res.end();
  };
  build_access_point = function(http) {
    var r, _i, _j, _len, _len1;
    for (_i = 0, _len = http.length; _i < _len; _i++) {
      r = http[_i];
      if (r.method.toUpperCase() === 'POST') {
        this.router.post(r.path, dice_multipart);
      }
      this.router[r.method](r.path, (function(_this) {
        return function(r) {
          return function(req, res, next) {
            var lookup, _ref, _ref1, _ref2;
            if (((_ref = req.params) != null ? _ref._id : void 0) != null) {
              req.params._id = share.safeObjectID(req.params._id);
            }
            if (((_ref1 = req.query) != null ? _ref1._id : void 0) != null) {
              req.query._id = share.safeObjectID(req.query._id);
            }
            lookup = (_ref2 = r.lookup) != null ? _ref2.bind(_this)(req.params || {}, req.query || {}, req.multipart) : void 0;
            if (lookup == null) {
              res.writeHead(500, {
                'Content-Type': 'text/plain'
              });
              res.end();
            } else {
              req.gridFS = _this.findOne(lookup);
              if (!req.gridFS) {
                res.writeHead(404, {
                  'Content-Type': 'text/plain'
                });
                res.end();
                return;
              }
              switch (req.method) {
                case 'HEAD':
                case 'GET':
                  if (!share.check_allow_deny.bind(_this)('read', req.meteorUserId, req.gridFS)) {
                    res.writeHead(403, {
                      'Content-Type': 'text/plain'
                    });
                    res.end();
                    return;
                  }
                  break;
                case 'POST':
                case 'PUT':
                  if (!share.check_allow_deny.bind(_this)('write', req.meteorUserId, req.gridFS)) {
                    res.writeHead(403, {
                      'Content-Type': 'text/plain'
                    });
                    res.end();
                    return;
                  }
                  break;
                case 'DELETE':
                  if (!share.check_allow_deny.bind(_this)('remove', req.meteorUserId, req.gridFS)) {
                    res.writeHead(403, {
                      'Content-Type': 'text/plain'
                    });
                    res.end();
                    return;
                  }
                  break;
                default:
                  res.writeHead(500, {
                    'Content-Type': 'text/plain'
                  });
                  res.end();
                  return;
              }
              return next();
            }
          };
        };
      })(this)(r));
    }
    this.router.route('/*').all(function(req, res, next) {
      if (!req.gridFS) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.end();
        return;
      }
      return next();
    });
    for (_j = 0, _len1 = http.length; _j < _len1; _j++) {
      r = http[_j];
      if (typeof r.handler === 'function') {
        this.router[r.method](r.path, r.handler.bind(this));
      }
    }
    return this.router.route('/*').head(get.bind(this)).get(get.bind(this)).put(put.bind(this)).post(post.bind(this))["delete"](del.bind(this)).all(function(req, res, next) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      return res.end();
    });
  };
  lookup_userId_by_token = function(authToken) {
    var userDoc, _ref;
    userDoc = (_ref = Meteor.users) != null ? _ref.findOne({
      'services.resume.loginTokens': {
        $elemMatch: {
          hashedToken: typeof Accounts !== "undefined" && Accounts !== null ? Accounts._hashLoginToken(authToken) : void 0
        }
      }
    }) : void 0;
    return (userDoc != null ? userDoc._id : void 0) || null;
  };
  handle_auth = function(req, res, next) {
    var _ref, _ref1;
    if (req.meteorUserId == null) {
      if (((_ref = req.headers) != null ? _ref['x-auth-token'] : void 0) != null) {
        req.meteorUserId = lookup_userId_by_token(req.headers['x-auth-token']);
      } else if (((_ref1 = req.cookies) != null ? _ref1['X-Auth-Token'] : void 0) != null) {
        req.meteorUserId = lookup_userId_by_token(req.cookies['X-Auth-Token']);
      } else {
        req.meteorUserId = null;
      }
    }
    return next();
  };
  share.setupHttpAccess = function(options) {
    var r;
    r = express.Router();
    r.use(express.query());
    r.use(cookieParser());
    r.use(handle_auth);
    WebApp.rawConnectHandlers.use(this.baseURL, share.bind_env(r));
    if (options.resumable) {
      options.http = share.resumable_paths.concat(options.http);
    }
    this.router = express.Router();
    build_access_point.bind(this)(options.http, this.router);
    return WebApp.rawConnectHandlers.use(this.baseURL, share.bind_env(this.router));
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['vsivsi:file-collection'] = {
  FileCollection: FileCollection
};

})();

//# sourceMappingURL=vsivsi_file-collection.js.map
