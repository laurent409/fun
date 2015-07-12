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
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var FileCollection, __coffeescriptShare;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/vsivsi:file-collection/resumable/resumable.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/*                                                                                                                   // 1
* MIT Licensed                                                                                                       // 2
* http://www.23developer.com/opensource                                                                              // 3
* http://github.com/23/resumable.js                                                                                  // 4
* Steffen Tiedemann Christensen, steffen@23company.com                                                               // 5
*/                                                                                                                   // 6
                                                                                                                     // 7
(function(){                                                                                                         // 8
"use strict";                                                                                                        // 9
                                                                                                                     // 10
  var Resumable = function(opts){                                                                                    // 11
    if ( !(this instanceof Resumable) ) {                                                                            // 12
      return new Resumable(opts);                                                                                    // 13
    }                                                                                                                // 14
    this.version = 1.0;                                                                                              // 15
    // SUPPORTED BY BROWSER?                                                                                         // 16
    // Check if these features are support by the browser:                                                           // 17
    // - File object type                                                                                            // 18
    // - Blob object type                                                                                            // 19
    // - FileList object type                                                                                        // 20
    // - slicing files                                                                                               // 21
    this.support = (                                                                                                 // 22
                   (typeof(File)!=='undefined')                                                                      // 23
                   &&                                                                                                // 24
                   (typeof(Blob)!=='undefined')                                                                      // 25
                   &&                                                                                                // 26
                   (typeof(FileList)!=='undefined')                                                                  // 27
                   &&                                                                                                // 28
                   (!!Blob.prototype.webkitSlice||!!Blob.prototype.mozSlice||!!Blob.prototype.slice||false)          // 29
                   );                                                                                                // 30
    if(!this.support) return(false);                                                                                 // 31
                                                                                                                     // 32
                                                                                                                     // 33
    // PROPERTIES                                                                                                    // 34
    var $ = this;                                                                                                    // 35
    $.files = [];                                                                                                    // 36
    $.defaults = {                                                                                                   // 37
      chunkSize:1*1024*1024,                                                                                         // 38
      forceChunkSize:false,                                                                                          // 39
      simultaneousUploads:3,                                                                                         // 40
      fileParameterName:'file',                                                                                      // 41
      throttleProgressCallbacks:0.5,                                                                                 // 42
      query:{},                                                                                                      // 43
      headers:{},                                                                                                    // 44
      preprocess:null,                                                                                               // 45
      method:'multipart',                                                                                            // 46
      prioritizeFirstAndLastChunk:false,                                                                             // 47
      target:'/',                                                                                                    // 48
      parameterNamespace:'',                                                                                         // 49
      testChunks:true,                                                                                               // 50
      generateUniqueIdentifier:null,                                                                                 // 51
      maxChunkRetries:undefined,                                                                                     // 52
      chunkRetryInterval:undefined,                                                                                  // 53
      permanentErrors:[400, 404, 415, 500, 501],                                                                     // 54
      maxFiles:undefined,                                                                                            // 55
      withCredentials:false,                                                                                         // 56
      xhrTimeout:0,                                                                                                  // 57
      maxFilesErrorCallback:function (files, errorCount) {                                                           // 58
        var maxFiles = $.getOpt('maxFiles');                                                                         // 59
        alert('Please upload ' + maxFiles + ' file' + (maxFiles === 1 ? '' : 's') + ' at a time.');                  // 60
      },                                                                                                             // 61
      minFileSize:1,                                                                                                 // 62
      minFileSizeErrorCallback:function(file, errorCount) {                                                          // 63
        alert(file.fileName||file.name +' is too small, please upload files larger than ' + $h.formatSize($.getOpt('minFileSize')) + '.');
      },                                                                                                             // 65
      maxFileSize:undefined,                                                                                         // 66
      maxFileSizeErrorCallback:function(file, errorCount) {                                                          // 67
        alert(file.fileName||file.name +' is too large, please upload files less than ' + $h.formatSize($.getOpt('maxFileSize')) + '.');
      },                                                                                                             // 69
      fileType: [],                                                                                                  // 70
      fileTypeErrorCallback: function(file, errorCount) {                                                            // 71
        alert(file.fileName||file.name +' has type not allowed, please upload files of type ' + $.getOpt('fileType') + '.');
      }                                                                                                              // 73
    };                                                                                                               // 74
    $.opts = opts||{};                                                                                               // 75
    $.getOpt = function(o) {                                                                                         // 76
      var $opt = this;                                                                                               // 77
      // Get multiple option if passed an array                                                                      // 78
      if(o instanceof Array) {                                                                                       // 79
        var options = {};                                                                                            // 80
        $h.each(o, function(option){                                                                                 // 81
          options[option] = $opt.getOpt(option);                                                                     // 82
        });                                                                                                          // 83
        return options;                                                                                              // 84
      }                                                                                                              // 85
      // Otherwise, just return a simple option                                                                      // 86
      if ($opt instanceof ResumableChunk) {                                                                          // 87
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                            // 88
        else { $opt = $opt.fileObj; }                                                                                // 89
      }                                                                                                              // 90
      if ($opt instanceof ResumableFile) {                                                                           // 91
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                            // 92
        else { $opt = $opt.resumableObj; }                                                                           // 93
      }                                                                                                              // 94
      if ($opt instanceof Resumable) {                                                                               // 95
        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }                                            // 96
        else { return $opt.defaults[o]; }                                                                            // 97
      }                                                                                                              // 98
    };                                                                                                               // 99
                                                                                                                     // 100
    // EVENTS                                                                                                        // 101
    // catchAll(event, ...)                                                                                          // 102
    // fileSuccess(file), fileProgress(file), fileAdded(file, event), fileRetry(file), fileError(file, message),     // 103
    // complete(), progress(), error(message, file), pause()                                                         // 104
    $.events = [];                                                                                                   // 105
    $.on = function(event,callback){                                                                                 // 106
      $.events.push(event.toLowerCase(), callback);                                                                  // 107
    };                                                                                                               // 108
    $.fire = function(){                                                                                             // 109
      // `arguments` is an object, not array, in FF, so:                                                             // 110
      var args = [];                                                                                                 // 111
      for (var i=0; i<arguments.length; i++) args.push(arguments[i]);                                                // 112
      // Find event listeners, and support pseudo-event `catchAll`                                                   // 113
      var event = args[0].toLowerCase();                                                                             // 114
      for (var i=0; i<=$.events.length; i+=2) {                                                                      // 115
        if($.events[i]==event) $.events[i+1].apply($,args.slice(1));                                                 // 116
        if($.events[i]=='catchall') $.events[i+1].apply(null,args);                                                  // 117
      }                                                                                                              // 118
      if(event=='fileerror') $.fire('error', args[2], args[1]);                                                      // 119
      if(event=='fileprogress') $.fire('progress');                                                                  // 120
    };                                                                                                               // 121
                                                                                                                     // 122
                                                                                                                     // 123
    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)                                         // 124
    var $h = {                                                                                                       // 125
      stopEvent: function(e){                                                                                        // 126
        e.stopPropagation();                                                                                         // 127
        e.preventDefault();                                                                                          // 128
      },                                                                                                             // 129
      each: function(o,callback){                                                                                    // 130
        if(typeof(o.length)!=='undefined') {                                                                         // 131
          for (var i=0; i<o.length; i++) {                                                                           // 132
            // Array or FileList                                                                                     // 133
            if(callback(o[i])===false) return;                                                                       // 134
          }                                                                                                          // 135
        } else {                                                                                                     // 136
          for (i in o) {                                                                                             // 137
            // Object                                                                                                // 138
            if(callback(i,o[i])===false) return;                                                                     // 139
          }                                                                                                          // 140
        }                                                                                                            // 141
      },                                                                                                             // 142
      generateUniqueIdentifier:function(file){                                                                       // 143
        var custom = $.getOpt('generateUniqueIdentifier');                                                           // 144
        if(typeof custom === 'function') {                                                                           // 145
          return custom(file);                                                                                       // 146
        }                                                                                                            // 147
        var relativePath = file.webkitRelativePath||file.fileName||file.name; // Some confusion in different versions of Firefox
        var size = file.size;                                                                                        // 149
        return(size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));                                          // 150
      },                                                                                                             // 151
      contains:function(array,test) {                                                                                // 152
        var result = false;                                                                                          // 153
                                                                                                                     // 154
        $h.each(array, function(value) {                                                                             // 155
          if (value == test) {                                                                                       // 156
            result = true;                                                                                           // 157
            return false;                                                                                            // 158
          }                                                                                                          // 159
          return true;                                                                                               // 160
        });                                                                                                          // 161
                                                                                                                     // 162
        return result;                                                                                               // 163
      },                                                                                                             // 164
      formatSize:function(size){                                                                                     // 165
        if(size<1024) {                                                                                              // 166
          return size + ' bytes';                                                                                    // 167
        } else if(size<1024*1024) {                                                                                  // 168
          return (size/1024.0).toFixed(0) + ' KB';                                                                   // 169
        } else if(size<1024*1024*1024) {                                                                             // 170
          return (size/1024.0/1024.0).toFixed(1) + ' MB';                                                            // 171
        } else {                                                                                                     // 172
          return (size/1024.0/1024.0/1024.0).toFixed(1) + ' GB';                                                     // 173
        }                                                                                                            // 174
      },                                                                                                             // 175
      getTarget:function(params){                                                                                    // 176
        var target = $.getOpt('target');                                                                             // 177
        if(target.indexOf('?') < 0) {                                                                                // 178
          target += '?';                                                                                             // 179
        } else {                                                                                                     // 180
          target += '&';                                                                                             // 181
        }                                                                                                            // 182
        return target + params.join('&');                                                                            // 183
      }                                                                                                              // 184
    };                                                                                                               // 185
                                                                                                                     // 186
    var onDrop = function(event){                                                                                    // 187
      $h.stopEvent(event);                                                                                           // 188
                                                                                                                     // 189
      //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)                // 190
      if (event.dataTransfer && event.dataTransfer.items) {                                                          // 191
        loadFiles(event.dataTransfer.items, event);                                                                  // 192
      }                                                                                                              // 193
      //else handle them as files                                                                                    // 194
      else if (event.dataTransfer && event.dataTransfer.files) {                                                     // 195
        loadFiles(event.dataTransfer.files, event);                                                                  // 196
      }                                                                                                              // 197
    };                                                                                                               // 198
    var preventDefault = function(e) {                                                                               // 199
      e.preventDefault();                                                                                            // 200
    };                                                                                                               // 201
                                                                                                                     // 202
    // INTERNAL METHODS (both handy and responsible for the heavy load)                                              // 203
    /**                                                                                                              // 204
     * @summary This function loops over the files passed in from a drag and drop operation and gets them ready for appendFilesFromFileList
     *            It attempts to use FileSystem API calls to extract files and subfolders if the dropped items include folders
     *            That capability is only currently available in Chrome, but if it isn't available it will just pass the items along to
     *            appendFilesFromFileList (via enqueueFileAddition to help with asynchronous processing.)            // 208
     * @param files {Array} - the File or Entry objects to be processed depending on your browser support            // 209
     * @param event {Object} - the drop event object                                                                 // 210
     * @param [queue] {Object} - an object to keep track of our progress processing the dropped items                // 211
     * @param [path] {String} - the relative path from the originally selected folder to the current files if extracting files from subfolders
     */                                                                                                              // 213
    var loadFiles = function (files, event, queue, path){                                                            // 214
      //initialize the queue object if it doesn't exist                                                              // 215
      if (!queue) {                                                                                                  // 216
        queue = {                                                                                                    // 217
          total: 0,                                                                                                  // 218
          files: [],                                                                                                 // 219
          event: event                                                                                               // 220
        };                                                                                                           // 221
      }                                                                                                              // 222
                                                                                                                     // 223
      //update the total number of things we plan to process                                                         // 224
      updateQueueTotal(files.length, queue);                                                                         // 225
                                                                                                                     // 226
      //loop over all the passed in objects checking if they are files or folders                                    // 227
      for (var i = 0; i < files.length; i++) {                                                                       // 228
        var file = files[i];                                                                                         // 229
        var entry, reader;                                                                                           // 230
                                                                                                                     // 231
        if (file.isFile || file.isDirectory) {                                                                       // 232
          //this is an object we can handle below with no extra work needed up front                                 // 233
          entry = file;                                                                                              // 234
        }                                                                                                            // 235
        else if (file.getAsEntry) {                                                                                  // 236
          //get the file as an entry object if we can using the proposed HTML5 api (unlikely to get implemented by anyone)
          entry = file.getAsEntry();                                                                                 // 238
        }                                                                                                            // 239
        else if (file.webkitGetAsEntry) {                                                                            // 240
          //get the file as an entry object if we can using the Chrome specific webkit implementation                // 241
          entry = file.webkitGetAsEntry();                                                                           // 242
        }                                                                                                            // 243
        else if (typeof file.getAsFile === 'function') {                                                             // 244
          //if this is still a DataTransferItem object, get it as a file object                                      // 245
          enqueueFileAddition(file.getAsFile(), queue, path);                                                        // 246
          //we just added this file object to the queue so we can go to the next object in the loop and skip the processing below
          continue;                                                                                                  // 248
        }                                                                                                            // 249
        else if (File && file instanceof File) {                                                                     // 250
          //this is already a file object so just queue it up and move on                                            // 251
          enqueueFileAddition(file, queue, path);                                                                    // 252
          //we just added this file object to the queue so we can go to the next object in the loop and skip the processing below
          continue;                                                                                                  // 254
        }                                                                                                            // 255
        else {                                                                                                       // 256
          //we can't do anything with this object, decrement the expected total and skip the processing below        // 257
          updateQueueTotal(-1, queue);                                                                               // 258
          continue;                                                                                                  // 259
        }                                                                                                            // 260
                                                                                                                     // 261
        if (!entry) {                                                                                                // 262
          //there isn't anything we can do with this so decrement the total expected                                 // 263
          updateQueueTotal(-1, queue);                                                                               // 264
        }                                                                                                            // 265
        else if (entry.isFile) {                                                                                     // 266
          //this is handling to read an entry object representing a file, parsing the file object is asynchronous which is why we need the queue
          //currently entry objects will only exist in this flow for Chrome                                          // 268
          entry.file(function(file) {                                                                                // 269
            enqueueFileAddition(file, queue, path);                                                                  // 270
          }, function(err) {                                                                                         // 271
            console.warn(err);                                                                                       // 272
          });                                                                                                        // 273
        }                                                                                                            // 274
        else if (entry.isDirectory) {                                                                                // 275
          //this is handling to read an entry object representing a folder, parsing the directory object is asynchronous which is why we need the queue
          //currently entry objects will only exist in this flow for Chrome                                          // 277
          reader = entry.createReader();                                                                             // 278
                                                                                                                     // 279
            var newEntries = [];                                                                                     // 280
            //wrap the callback in another function so we can store the path in a closure                            // 281
            var readDir = function(path){                                                                            // 282
                reader.readEntries(                                                                                  // 283
                    //success callback: read entries out of the directory                                            // 284
                    function(entries){                                                                               // 285
                        if (entries.length>0){                                                                       // 286
                            //add these results to the array of all the new stuff                                    // 287
                            for (var i=0; i<entries.length; i++) { newEntries.push(entries[i]); }                    // 288
                            //call this function again as all the results may not have been sent yet                 // 289
                            readDir(entry.fullPath);                                                                 // 290
                        }                                                                                            // 291
                        else {                                                                                       // 292
                            //we have now gotten all the results in newEntries so let's process them recursively     // 293
                            loadFiles(newEntries, event, queue, path);                                               // 294
                            //this was a directory rather than a file so decrement the expected file count           // 295
                            updateQueueTotal(-1, queue);                                                             // 296
                        }                                                                                            // 297
                    },                                                                                               // 298
                    //error callback, most often hit if there is a directory with nothing inside it                  // 299
                    function(err) {                                                                                  // 300
                        //this was a directory rather than a file so decrement the expected file count               // 301
                        updateQueueTotal(-1, queue);                                                                 // 302
                        console.warn(err);                                                                           // 303
                    }                                                                                                // 304
                );                                                                                                   // 305
            };                                                                                                       // 306
        }                                                                                                            // 307
      }                                                                                                              // 308
    };                                                                                                               // 309
                                                                                                                     // 310
    /**                                                                                                              // 311
     * @summary Adjust the total number of files we are expecting to process                                         // 312
     *          if decrementing and the new expected total is equal to the number processed, flush the queue         // 313
     * @param addition {Number} - the number of additional files we expect to process (may be negative)              // 314
     * @param queue {Object} - an object to keep track of our progress processing the dropped items                  // 315
     */                                                                                                              // 316
    var updateQueueTotal = function(addition, queue){                                                                // 317
      queue.total += addition;                                                                                       // 318
                                                                                                                     // 319
      // If all the files we expect have shown up, then flush the queue.                                             // 320
      if (queue.files.length === queue.total) {                                                                      // 321
        appendFilesFromFileList(queue.files, queue.event);                                                           // 322
      }                                                                                                              // 323
    };                                                                                                               // 324
                                                                                                                     // 325
    /**                                                                                                              // 326
     * @summary Add a file to the queue of processed files, if it brings the total up to the expected total, flush the queue
     * @param file {Object} - File object to be passed along to appendFilesFromFileList eventually                   // 328
     * @param queue {Object} - an object to keep track of our progress processing the dropped items                  // 329
     * @param [path] {String} - the file's relative path from the originally dropped folder if we are parsing folder content (Chrome only for now)
     */                                                                                                              // 331
    var enqueueFileAddition = function(file, queue, path) {                                                          // 332
      //store the path to this file if it came in as part of a folder                                                // 333
      if (path) file.relativePath = path + '/' + file.name;                                                          // 334
      queue.files.push(file);                                                                                        // 335
                                                                                                                     // 336
      // If all the files we expect have shown up, then flush the queue.                                             // 337
      if (queue.files.length === queue.total) {                                                                      // 338
        appendFilesFromFileList(queue.files, queue.event);                                                           // 339
      }                                                                                                              // 340
    };                                                                                                               // 341
                                                                                                                     // 342
    var appendFilesFromFileList = function(fileList, event){                                                         // 343
      // check for uploading too many files                                                                          // 344
      var errorCount = 0;                                                                                            // 345
      var o = $.getOpt(['maxFiles', 'minFileSize', 'maxFileSize', 'maxFilesErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileType', 'fileTypeErrorCallback']);
      if (typeof(o.maxFiles)!=='undefined' && o.maxFiles<(fileList.length+$.files.length)) {                         // 347
        // if single-file upload, file is already added, and trying to add 1 new file, simply replace the already-added file
        if (o.maxFiles===1 && $.files.length===1 && fileList.length===1) {                                           // 349
          $.removeFile($.files[0]);                                                                                  // 350
        } else {                                                                                                     // 351
          o.maxFilesErrorCallback(fileList, errorCount++);                                                           // 352
          return false;                                                                                              // 353
        }                                                                                                            // 354
      }                                                                                                              // 355
      var files = [];                                                                                                // 356
      $h.each(fileList, function(file){                                                                              // 357
        var fileName = file.name;                                                                                    // 358
        if(o.fileType.length > 0){                                                                                   // 359
			var fileTypeFound = false;                                                                                        // 360
			for(var index in o.fileType){                                                                                     // 361
				var extension = '.' + o.fileType[index];                                                                         // 362
				if(fileName.indexOf(extension, fileName.length - extension.length) !== -1){                                      // 363
					fileTypeFound = true;                                                                                           // 364
					break;                                                                                                          // 365
				}                                                                                                                // 366
			}                                                                                                                 // 367
			if (!fileTypeFound) {                                                                                             // 368
			  o.fileTypeErrorCallback(file, errorCount++);                                                                    // 369
			  return false;                                                                                                   // 370
			}                                                                                                                 // 371
		}                                                                                                                  // 372
                                                                                                                     // 373
        if (typeof(o.minFileSize)!=='undefined' && file.size<o.minFileSize) {                                        // 374
          o.minFileSizeErrorCallback(file, errorCount++);                                                            // 375
          return false;                                                                                              // 376
        }                                                                                                            // 377
        if (typeof(o.maxFileSize)!=='undefined' && file.size>o.maxFileSize) {                                        // 378
          o.maxFileSizeErrorCallback(file, errorCount++);                                                            // 379
          return false;                                                                                              // 380
        }                                                                                                            // 381
                                                                                                                     // 382
        function addFile(uniqueIdentifier){                                                                          // 383
          if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {(function(){                                            // 384
            file.uniqueIdentifier = uniqueIdentifier;                                                                // 385
            var f = new ResumableFile($, file, uniqueIdentifier);                                                    // 386
            $.files.push(f);                                                                                         // 387
            files.push(f);                                                                                           // 388
            f.container = (typeof event != 'undefined' ? event.srcElement : null);                                   // 389
            window.setTimeout(function(){                                                                            // 390
              $.fire('fileAdded', f, event)                                                                          // 391
            },0);                                                                                                    // 392
          })()};                                                                                                     // 393
        }                                                                                                            // 394
        // directories have size == 0                                                                                // 395
        var uniqueIdentifier = $h.generateUniqueIdentifier(file)                                                     // 396
        if(uniqueIdentifier && typeof uniqueIdentifier.done === 'function' && typeof uniqueIdentifier.fail === 'function'){
          uniqueIdentifier                                                                                           // 398
          .done(function(uniqueIdentifier){                                                                          // 399
              addFile(uniqueIdentifier);                                                                             // 400
          })                                                                                                         // 401
          .fail(function(){                                                                                          // 402
              addFile();                                                                                             // 403
          });                                                                                                        // 404
        }else{                                                                                                       // 405
          addFile(uniqueIdentifier);                                                                                 // 406
        }                                                                                                            // 407
                                                                                                                     // 408
      });                                                                                                            // 409
      window.setTimeout(function(){                                                                                  // 410
        $.fire('filesAdded', files)                                                                                  // 411
      },0);                                                                                                          // 412
    };                                                                                                               // 413
                                                                                                                     // 414
    // INTERNAL OBJECT TYPES                                                                                         // 415
    function ResumableFile(resumableObj, file, uniqueIdentifier){                                                    // 416
      var $ = this;                                                                                                  // 417
      $.opts = {};                                                                                                   // 418
      $.getOpt = resumableObj.getOpt;                                                                                // 419
      $._prevProgress = 0;                                                                                           // 420
      $.resumableObj = resumableObj;                                                                                 // 421
      $.file = file;                                                                                                 // 422
      $.fileName = file.fileName||file.name; // Some confusion in different versions of Firefox                      // 423
      $.size = file.size;                                                                                            // 424
      $.relativePath = file.webkitRelativePath || file.relativePath || $.fileName;                                   // 425
      $.uniqueIdentifier = uniqueIdentifier;                                                                         // 426
      $._pause = false;                                                                                              // 427
      $.container = '';                                                                                              // 428
      var _error = uniqueIdentifier !== undefined;                                                                   // 429
                                                                                                                     // 430
      // Callback when something happens within the chunk                                                            // 431
      var chunkEvent = function(event, message){                                                                     // 432
        // event can be 'progress', 'success', 'error' or 'retry'                                                    // 433
        switch(event){                                                                                               // 434
        case 'progress':                                                                                             // 435
          $.resumableObj.fire('fileProgress', $);                                                                    // 436
          break;                                                                                                     // 437
        case 'error':                                                                                                // 438
          $.abort();                                                                                                 // 439
          _error = true;                                                                                             // 440
          $.chunks = [];                                                                                             // 441
          $.resumableObj.fire('fileError', $, message);                                                              // 442
          break;                                                                                                     // 443
        case 'success':                                                                                              // 444
          if(_error) return;                                                                                         // 445
          $.resumableObj.fire('fileProgress', $); // it's at least progress                                          // 446
          if($.isComplete()) {                                                                                       // 447
            $.resumableObj.fire('fileSuccess', $, message);                                                          // 448
          }                                                                                                          // 449
          break;                                                                                                     // 450
        case 'retry':                                                                                                // 451
          $.resumableObj.fire('fileRetry', $);                                                                       // 452
          break;                                                                                                     // 453
        }                                                                                                            // 454
      };                                                                                                             // 455
                                                                                                                     // 456
      // Main code to set up a file object with chunks,                                                              // 457
      // packaged to be able to handle retries if needed.                                                            // 458
      $.chunks = [];                                                                                                 // 459
      $.abort = function(){                                                                                          // 460
        // Stop current uploads                                                                                      // 461
        var abortCount = 0;                                                                                          // 462
        $h.each($.chunks, function(c){                                                                               // 463
          if(c.status()=='uploading') {                                                                              // 464
            c.abort();                                                                                               // 465
            abortCount++;                                                                                            // 466
          }                                                                                                          // 467
        });                                                                                                          // 468
        if(abortCount>0) $.resumableObj.fire('fileProgress', $);                                                     // 469
      };                                                                                                             // 470
      $.cancel = function(){                                                                                         // 471
        // Reset this file to be void                                                                                // 472
        var _chunks = $.chunks;                                                                                      // 473
        $.chunks = [];                                                                                               // 474
        // Stop current uploads                                                                                      // 475
        $h.each(_chunks, function(c){                                                                                // 476
          if(c.status()=='uploading')  {                                                                             // 477
            c.abort();                                                                                               // 478
            $.resumableObj.uploadNextChunk();                                                                        // 479
          }                                                                                                          // 480
        });                                                                                                          // 481
        $.resumableObj.removeFile($);                                                                                // 482
        $.resumableObj.fire('fileProgress', $);                                                                      // 483
      };                                                                                                             // 484
      $.retry = function(){                                                                                          // 485
        $.bootstrap();                                                                                               // 486
        var firedRetry = false;                                                                                      // 487
        $.resumableObj.on('chunkingComplete', function(){                                                            // 488
          if(!firedRetry) $.resumableObj.upload();                                                                   // 489
          firedRetry = true;                                                                                         // 490
        });                                                                                                          // 491
      };                                                                                                             // 492
      $.bootstrap = function(){                                                                                      // 493
        $.abort();                                                                                                   // 494
        _error = false;                                                                                              // 495
        // Rebuild stack of chunks from file                                                                         // 496
        $.chunks = [];                                                                                               // 497
        $._prevProgress = 0;                                                                                         // 498
        var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;                                             // 499
        var maxOffset = Math.max(round($.file.size/$.getOpt('chunkSize')),1);                                        // 500
        for (var offset=0; offset<maxOffset; offset++) {(function(offset){                                           // 501
            window.setTimeout(function(){                                                                            // 502
                $.chunks.push(new ResumableChunk($.resumableObj, $, offset, chunkEvent));                            // 503
                $.resumableObj.fire('chunkingProgress',$,offset/maxOffset);                                          // 504
            },0);                                                                                                    // 505
        })(offset)}                                                                                                  // 506
        window.setTimeout(function(){                                                                                // 507
            $.resumableObj.fire('chunkingComplete',$);                                                               // 508
        },0);                                                                                                        // 509
      };                                                                                                             // 510
      $.progress = function(){                                                                                       // 511
        if(_error) return(1);                                                                                        // 512
        // Sum up progress across everything                                                                         // 513
        var ret = 0;                                                                                                 // 514
        var error = false;                                                                                           // 515
        $h.each($.chunks, function(c){                                                                               // 516
          if(c.status()=='error') error = true;                                                                      // 517
          ret += c.progress(true); // get chunk progress relative to entire file                                     // 518
        });                                                                                                          // 519
        ret = (error ? 1 : (ret>0.99999 ? 1 : ret));                                                                 // 520
        ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused          // 521
        $._prevProgress = ret;                                                                                       // 522
        return(ret);                                                                                                 // 523
      };                                                                                                             // 524
      $.isUploading = function(){                                                                                    // 525
        var uploading = false;                                                                                       // 526
        $h.each($.chunks, function(chunk){                                                                           // 527
          if(chunk.status()=='uploading') {                                                                          // 528
            uploading = true;                                                                                        // 529
            return(false);                                                                                           // 530
          }                                                                                                          // 531
        });                                                                                                          // 532
        return(uploading);                                                                                           // 533
      };                                                                                                             // 534
      $.isComplete = function(){                                                                                     // 535
        var outstanding = false;                                                                                     // 536
        $h.each($.chunks, function(chunk){                                                                           // 537
          var status = chunk.status();                                                                               // 538
          if(status=='pending' || status=='uploading' || chunk.preprocessState === 1) {                              // 539
            outstanding = true;                                                                                      // 540
            return(false);                                                                                           // 541
          }                                                                                                          // 542
        });                                                                                                          // 543
        return(!outstanding);                                                                                        // 544
      };                                                                                                             // 545
      $.pause = function(pause){                                                                                     // 546
          if(typeof(pause)==='undefined'){                                                                           // 547
              $._pause = ($._pause ? false : true);                                                                  // 548
          }else{                                                                                                     // 549
              $._pause = pause;                                                                                      // 550
          }                                                                                                          // 551
      };                                                                                                             // 552
      $.isPaused = function() {                                                                                      // 553
        return $._pause;                                                                                             // 554
      };                                                                                                             // 555
                                                                                                                     // 556
                                                                                                                     // 557
      // Bootstrap and return                                                                                        // 558
      $.resumableObj.fire('chunkingStart', $);                                                                       // 559
      $.bootstrap();                                                                                                 // 560
      return(this);                                                                                                  // 561
    }                                                                                                                // 562
                                                                                                                     // 563
                                                                                                                     // 564
    function ResumableChunk(resumableObj, fileObj, offset, callback){                                                // 565
      var $ = this;                                                                                                  // 566
      $.opts = {};                                                                                                   // 567
      $.getOpt = resumableObj.getOpt;                                                                                // 568
      $.resumableObj = resumableObj;                                                                                 // 569
      $.fileObj = fileObj;                                                                                           // 570
      $.fileObjSize = fileObj.size;                                                                                  // 571
      $.fileObjType = fileObj.file.type;                                                                             // 572
      $.offset = offset;                                                                                             // 573
      $.callback = callback;                                                                                         // 574
      $.lastProgressCallback = (new Date);                                                                           // 575
      $.tested = false;                                                                                              // 576
      $.retries = 0;                                                                                                 // 577
      $.pendingRetry = false;                                                                                        // 578
      $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished                                        // 579
                                                                                                                     // 580
      // Computed properties                                                                                         // 581
      var chunkSize = $.getOpt('chunkSize');                                                                         // 582
      $.loaded = 0;                                                                                                  // 583
      $.startByte = $.offset*chunkSize;                                                                              // 584
      $.endByte = Math.min($.fileObjSize, ($.offset+1)*chunkSize);                                                   // 585
      if ($.fileObjSize-$.endByte < chunkSize && !$.getOpt('forceChunkSize')) {                                      // 586
        // The last chunk will be bigger than the chunk size, but less than 2*chunkSize                              // 587
        $.endByte = $.fileObjSize;                                                                                   // 588
      }                                                                                                              // 589
      $.xhr = null;                                                                                                  // 590
                                                                                                                     // 591
      // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
      $.test = function(){                                                                                           // 593
        // Set up request and listen for event                                                                       // 594
        $.xhr = new XMLHttpRequest();                                                                                // 595
                                                                                                                     // 596
        var testHandler = function(e){                                                                               // 597
          $.tested = true;                                                                                           // 598
          var status = $.status();                                                                                   // 599
          if(status=='success') {                                                                                    // 600
            $.callback(status, $.message());                                                                         // 601
            $.resumableObj.uploadNextChunk();                                                                        // 602
          } else {                                                                                                   // 603
            $.send();                                                                                                // 604
          }                                                                                                          // 605
        };                                                                                                           // 606
        $.xhr.addEventListener('load', testHandler, false);                                                          // 607
        $.xhr.addEventListener('error', testHandler, false);                                                         // 608
        $.xhr.addEventListener('timeout', testHandler, false);                                                       // 609
                                                                                                                     // 610
        // Add data from the query options                                                                           // 611
        var params = [];                                                                                             // 612
        var parameterNamespace = $.getOpt('parameterNamespace');                                                     // 613
        var customQuery = $.getOpt('query');                                                                         // 614
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);                                // 615
        $h.each(customQuery, function(k,v){                                                                          // 616
          params.push([encodeURIComponent(parameterNamespace+k), encodeURIComponent(v)].join('='));                  // 617
        });                                                                                                          // 618
        // Add extra data to identify chunk                                                                          // 619
        params.push([parameterNamespace+'resumableChunkNumber', encodeURIComponent($.offset+1)].join('='));          // 620
        params.push([parameterNamespace+'resumableChunkSize', encodeURIComponent($.getOpt('chunkSize'))].join('=')); // 621
        params.push([parameterNamespace+'resumableCurrentChunkSize', encodeURIComponent($.endByte - $.startByte)].join('='));
        params.push([parameterNamespace+'resumableTotalSize', encodeURIComponent($.fileObjSize)].join('='));         // 623
        params.push([parameterNamespace+'resumableType', encodeURIComponent($.fileObjType)].join('='));              // 624
        params.push([parameterNamespace+'resumableIdentifier', encodeURIComponent($.fileObj.uniqueIdentifier)].join('='));
        params.push([parameterNamespace+'resumableFilename', encodeURIComponent($.fileObj.fileName)].join('='));     // 626
        params.push([parameterNamespace+'resumableRelativePath', encodeURIComponent($.fileObj.relativePath)].join('='));
        params.push([parameterNamespace+'resumableTotalChunks', encodeURIComponent($.fileObj.chunks.length)].join('='));
        // Append the relevant chunk and send it                                                                     // 629
        $.xhr.open('GET', $h.getTarget(params));                                                                     // 630
        $.xhr.timeout = $.getOpt('xhrTimeout');                                                                      // 631
        $.xhr.withCredentials = $.getOpt('withCredentials');                                                         // 632
        // Add data from header options                                                                              // 633
        $h.each($.getOpt('headers'), function(k,v) {                                                                 // 634
          $.xhr.setRequestHeader(k, v);                                                                              // 635
        });                                                                                                          // 636
        $.xhr.send(null);                                                                                            // 637
      };                                                                                                             // 638
                                                                                                                     // 639
      $.preprocessFinished = function(){                                                                             // 640
        $.preprocessState = 2;                                                                                       // 641
        $.send();                                                                                                    // 642
      };                                                                                                             // 643
                                                                                                                     // 644
      // send() uploads the actual data in a POST call                                                               // 645
      $.send = function(){                                                                                           // 646
        var preprocess = $.getOpt('preprocess');                                                                     // 647
        if(typeof preprocess === 'function') {                                                                       // 648
          switch($.preprocessState) {                                                                                // 649
          case 0: $.preprocessState = 1; preprocess($); return;                                                      // 650
          case 1: return;                                                                                            // 651
          case 2: break;                                                                                             // 652
          }                                                                                                          // 653
        }                                                                                                            // 654
        if($.getOpt('testChunks') && !$.tested) {                                                                    // 655
          $.test();                                                                                                  // 656
          return;                                                                                                    // 657
        }                                                                                                            // 658
                                                                                                                     // 659
        // Set up request and listen for event                                                                       // 660
        $.xhr = new XMLHttpRequest();                                                                                // 661
                                                                                                                     // 662
        // Progress                                                                                                  // 663
        $.xhr.upload.addEventListener('progress', function(e){                                                       // 664
          if( (new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000 ) {                 // 665
            $.callback('progress');                                                                                  // 666
            $.lastProgressCallback = (new Date);                                                                     // 667
          }                                                                                                          // 668
          $.loaded=e.loaded||0;                                                                                      // 669
        }, false);                                                                                                   // 670
        $.loaded = 0;                                                                                                // 671
        $.pendingRetry = false;                                                                                      // 672
        $.callback('progress');                                                                                      // 673
                                                                                                                     // 674
        // Done (either done, failed or retry)                                                                       // 675
        var doneHandler = function(e){                                                                               // 676
          var status = $.status();                                                                                   // 677
          if(status=='success'||status=='error') {                                                                   // 678
            $.callback(status, $.message());                                                                         // 679
            $.resumableObj.uploadNextChunk();                                                                        // 680
          } else {                                                                                                   // 681
            $.callback('retry', $.message());                                                                        // 682
            $.abort();                                                                                               // 683
            $.retries++;                                                                                             // 684
            var retryInterval = $.getOpt('chunkRetryInterval');                                                      // 685
            if(retryInterval !== undefined) {                                                                        // 686
              $.pendingRetry = true;                                                                                 // 687
              setTimeout($.send, retryInterval);                                                                     // 688
            } else {                                                                                                 // 689
              $.send();                                                                                              // 690
            }                                                                                                        // 691
          }                                                                                                          // 692
        };                                                                                                           // 693
        $.xhr.addEventListener('load', doneHandler, false);                                                          // 694
        $.xhr.addEventListener('error', doneHandler, false);                                                         // 695
        $.xhr.addEventListener('timeout', doneHandler, false);                                                       // 696
                                                                                                                     // 697
        // Set up the basic query data from Resumable                                                                // 698
        var query = {                                                                                                // 699
          resumableChunkNumber: $.offset+1,                                                                          // 700
          resumableChunkSize: $.getOpt('chunkSize'),                                                                 // 701
          resumableCurrentChunkSize: $.endByte - $.startByte,                                                        // 702
          resumableTotalSize: $.fileObjSize,                                                                         // 703
          resumableType: $.fileObjType,                                                                              // 704
          resumableIdentifier: $.fileObj.uniqueIdentifier,                                                           // 705
          resumableFilename: $.fileObj.fileName,                                                                     // 706
          resumableRelativePath: $.fileObj.relativePath,                                                             // 707
          resumableTotalChunks: $.fileObj.chunks.length                                                              // 708
        };                                                                                                           // 709
        // Mix in custom data                                                                                        // 710
        var customQuery = $.getOpt('query');                                                                         // 711
        if(typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);                                // 712
        $h.each(customQuery, function(k,v){                                                                          // 713
          query[k] = v;                                                                                              // 714
        });                                                                                                          // 715
                                                                                                                     // 716
        var func   = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice'))),
        bytes  = $.fileObj.file[func]($.startByte,$.endByte),                                                        // 718
        data   = null,                                                                                               // 719
        target = $.getOpt('target');                                                                                 // 720
                                                                                                                     // 721
        var parameterNamespace = $.getOpt('parameterNamespace');                                                     // 722
        if ($.getOpt('method') === 'octet') {                                                                        // 723
          // Add data from the query options                                                                         // 724
          data = bytes;                                                                                              // 725
          var params = [];                                                                                           // 726
          $h.each(query, function(k,v){                                                                              // 727
            params.push([encodeURIComponent(parameterNamespace+k), encodeURIComponent(v)].join('='));                // 728
          });                                                                                                        // 729
          target = $h.getTarget(params);                                                                             // 730
        } else {                                                                                                     // 731
          // Add data from the query options                                                                         // 732
          data = new FormData();                                                                                     // 733
          $h.each(query, function(k,v){                                                                              // 734
            data.append(parameterNamespace+k,v);                                                                     // 735
          });                                                                                                        // 736
          data.append(parameterNamespace+$.getOpt('fileParameterName'), bytes);                                      // 737
        }                                                                                                            // 738
                                                                                                                     // 739
        $.xhr.open('POST', target);                                                                                  // 740
        $.xhr.timeout = $.getOpt('xhrTimeout');                                                                      // 741
        $.xhr.withCredentials = $.getOpt('withCredentials');                                                         // 742
        // Add data from header options                                                                              // 743
        $h.each($.getOpt('headers'), function(k,v) {                                                                 // 744
          $.xhr.setRequestHeader(k, v);                                                                              // 745
        });                                                                                                          // 746
        $.xhr.send(data);                                                                                            // 747
      };                                                                                                             // 748
      $.abort = function(){                                                                                          // 749
        // Abort and reset                                                                                           // 750
        if($.xhr) $.xhr.abort();                                                                                     // 751
        $.xhr = null;                                                                                                // 752
      };                                                                                                             // 753
      $.status = function(){                                                                                         // 754
        // Returns: 'pending', 'uploading', 'success', 'error'                                                       // 755
        if($.pendingRetry) {                                                                                         // 756
          // if pending retry then that's effectively the same as actively uploading,                                // 757
          // there might just be a slight delay before the retry starts                                              // 758
          return('uploading');                                                                                       // 759
        } else if(!$.xhr) {                                                                                          // 760
          return('pending');                                                                                         // 761
        } else if($.xhr.readyState<4) {                                                                              // 762
          // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening            // 763
          return('uploading');                                                                                       // 764
        } else {                                                                                                     // 765
          if($.xhr.status==200) {                                                                                    // 766
            // HTTP 200, perfect                                                                                     // 767
            return('success');                                                                                       // 768
          } else if($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
            // HTTP 415/500/501, permanent error                                                                     // 770
            return('error');                                                                                         // 771
          } else {                                                                                                   // 772
            // this should never happen, but we'll reset and queue a retry                                           // 773
            // a likely case for this would be 503 service unavailable                                               // 774
            $.abort();                                                                                               // 775
            return('pending');                                                                                       // 776
          }                                                                                                          // 777
        }                                                                                                            // 778
      };                                                                                                             // 779
      $.message = function(){                                                                                        // 780
        return($.xhr ? $.xhr.responseText : '');                                                                     // 781
      };                                                                                                             // 782
      $.progress = function(relative){                                                                               // 783
        if(typeof(relative)==='undefined') relative = false;                                                         // 784
        var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);                                         // 785
        if($.pendingRetry) return(0);                                                                                // 786
        var s = $.status();                                                                                          // 787
        switch(s){                                                                                                   // 788
        case 'success':                                                                                              // 789
        case 'error':                                                                                                // 790
          return(1*factor);                                                                                          // 791
        case 'pending':                                                                                              // 792
          return(0*factor);                                                                                          // 793
        default:                                                                                                     // 794
          return($.loaded/($.endByte-$.startByte)*factor);                                                           // 795
        }                                                                                                            // 796
      };                                                                                                             // 797
      return(this);                                                                                                  // 798
    }                                                                                                                // 799
                                                                                                                     // 800
    // QUEUE                                                                                                         // 801
    $.uploadNextChunk = function(){                                                                                  // 802
      var found = false;                                                                                             // 803
                                                                                                                     // 804
      // In some cases (such as videos) it's really handy to upload the first                                        // 805
      // and last chunk of a file quickly; this let's the server check the file's                                    // 806
      // metadata and determine if there's even a point in continuing.                                               // 807
      if ($.getOpt('prioritizeFirstAndLastChunk')) {                                                                 // 808
        $h.each($.files, function(file){                                                                             // 809
          if(file.chunks.length && file.chunks[0].status()=='pending' && file.chunks[0].preprocessState === 0) {     // 810
            file.chunks[0].send();                                                                                   // 811
            found = true;                                                                                            // 812
            return(false);                                                                                           // 813
          }                                                                                                          // 814
          if(file.chunks.length>1 && file.chunks[file.chunks.length-1].status()=='pending' && file.chunks[file.chunks.length-1].preprocessState === 0) {
            file.chunks[file.chunks.length-1].send();                                                                // 816
            found = true;                                                                                            // 817
            return(false);                                                                                           // 818
          }                                                                                                          // 819
        });                                                                                                          // 820
        if(found) return(true);                                                                                      // 821
      }                                                                                                              // 822
                                                                                                                     // 823
      // Now, simply look for the next, best thing to upload                                                         // 824
      $h.each($.files, function(file){                                                                               // 825
        if(file.isPaused()===false){                                                                                 // 826
         $h.each(file.chunks, function(chunk){                                                                       // 827
           if(chunk.status()=='pending' && chunk.preprocessState === 0) {                                            // 828
             chunk.send();                                                                                           // 829
             found = true;                                                                                           // 830
             return(false);                                                                                          // 831
           }                                                                                                         // 832
          });                                                                                                        // 833
        }                                                                                                            // 834
        if(found) return(false);                                                                                     // 835
      });                                                                                                            // 836
      if(found) return(true);                                                                                        // 837
                                                                                                                     // 838
      // The are no more outstanding chunks to upload, check is everything is done                                   // 839
      var outstanding = false;                                                                                       // 840
      $h.each($.files, function(file){                                                                               // 841
        if(!file.isComplete()) {                                                                                     // 842
          outstanding = true;                                                                                        // 843
          return(false);                                                                                             // 844
        }                                                                                                            // 845
      });                                                                                                            // 846
      if(!outstanding) {                                                                                             // 847
        // All chunks have been uploaded, complete                                                                   // 848
        $.fire('complete');                                                                                          // 849
      }                                                                                                              // 850
      return(false);                                                                                                 // 851
    };                                                                                                               // 852
                                                                                                                     // 853
                                                                                                                     // 854
    // PUBLIC METHODS FOR RESUMABLE.JS                                                                               // 855
    $.assignBrowse = function(domNodes, isDirectory){                                                                // 856
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];                                                // 857
                                                                                                                     // 858
      $h.each(domNodes, function(domNode) {                                                                          // 859
        var input;                                                                                                   // 860
        if(domNode.tagName==='INPUT' && domNode.type==='file'){                                                      // 861
          input = domNode;                                                                                           // 862
        } else {                                                                                                     // 863
          input = document.createElement('input');                                                                   // 864
          input.setAttribute('type', 'file');                                                                        // 865
          input.style.display = 'none';                                                                              // 866
          domNode.addEventListener('click', function(){                                                              // 867
            input.style.opacity = 0;                                                                                 // 868
            input.style.display='block';                                                                             // 869
            input.focus();                                                                                           // 870
            input.click();                                                                                           // 871
            input.style.display='none';                                                                              // 872
          }, false);                                                                                                 // 873
          domNode.appendChild(input);                                                                                // 874
        }                                                                                                            // 875
        var maxFiles = $.getOpt('maxFiles');                                                                         // 876
        if (typeof(maxFiles)==='undefined'||maxFiles!=1){                                                            // 877
          input.setAttribute('multiple', 'multiple');                                                                // 878
        } else {                                                                                                     // 879
          input.removeAttribute('multiple');                                                                         // 880
        }                                                                                                            // 881
        if(isDirectory){                                                                                             // 882
          input.setAttribute('webkitdirectory', 'webkitdirectory');                                                  // 883
        } else {                                                                                                     // 884
          input.removeAttribute('webkitdirectory');                                                                  // 885
        }                                                                                                            // 886
        // When new files are added, simply append them to the overall list                                          // 887
        input.addEventListener('change', function(e){                                                                // 888
          appendFilesFromFileList(e.target.files,e);                                                                 // 889
          e.target.value = '';                                                                                       // 890
        }, false);                                                                                                   // 891
      });                                                                                                            // 892
    };                                                                                                               // 893
    $.assignDrop = function(domNodes){                                                                               // 894
      if(typeof(domNodes.length)=='undefined') domNodes = [domNodes];                                                // 895
                                                                                                                     // 896
      $h.each(domNodes, function(domNode) {                                                                          // 897
        domNode.addEventListener('dragover', preventDefault, false);                                                 // 898
        domNode.addEventListener('dragenter', preventDefault, false);                                                // 899
        domNode.addEventListener('drop', onDrop, false);                                                             // 900
      });                                                                                                            // 901
    };                                                                                                               // 902
    $.unAssignDrop = function(domNodes) {                                                                            // 903
      if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];                                             // 904
                                                                                                                     // 905
      $h.each(domNodes, function(domNode) {                                                                          // 906
        domNode.removeEventListener('dragover', preventDefault);                                                     // 907
        domNode.removeEventListener('dragenter', preventDefault);                                                    // 908
        domNode.removeEventListener('drop', onDrop);                                                                 // 909
      });                                                                                                            // 910
    };                                                                                                               // 911
    $.isUploading = function(){                                                                                      // 912
      var uploading = false;                                                                                         // 913
      $h.each($.files, function(file){                                                                               // 914
        if (file.isUploading()) {                                                                                    // 915
          uploading = true;                                                                                          // 916
          return(false);                                                                                             // 917
        }                                                                                                            // 918
      });                                                                                                            // 919
      return(uploading);                                                                                             // 920
    };                                                                                                               // 921
    $.upload = function(){                                                                                           // 922
      // Make sure we don't start too many uploads at once                                                           // 923
      if($.isUploading()) return;                                                                                    // 924
      // Kick off the queue                                                                                          // 925
      $.fire('uploadStart');                                                                                         // 926
      for (var num=1; num<=$.getOpt('simultaneousUploads'); num++) {                                                 // 927
        $.uploadNextChunk();                                                                                         // 928
      }                                                                                                              // 929
    };                                                                                                               // 930
    $.pause = function(){                                                                                            // 931
      // Resume all chunks currently being uploaded                                                                  // 932
      $h.each($.files, function(file){                                                                               // 933
        file.abort();                                                                                                // 934
      });                                                                                                            // 935
      $.fire('pause');                                                                                               // 936
    };                                                                                                               // 937
    $.cancel = function(){                                                                                           // 938
      for(var i = $.files.length - 1; i >= 0; i--) {                                                                 // 939
        $.files[i].cancel();                                                                                         // 940
      }                                                                                                              // 941
      $.fire('cancel');                                                                                              // 942
    };                                                                                                               // 943
    $.progress = function(){                                                                                         // 944
      var totalDone = 0;                                                                                             // 945
      var totalSize = 0;                                                                                             // 946
      // Resume all chunks currently being uploaded                                                                  // 947
      $h.each($.files, function(file){                                                                               // 948
        totalDone += file.progress()*file.size;                                                                      // 949
        totalSize += file.size;                                                                                      // 950
      });                                                                                                            // 951
      return(totalSize>0 ? totalDone/totalSize : 0);                                                                 // 952
    };                                                                                                               // 953
    $.addFile = function(file, event){                                                                               // 954
      appendFilesFromFileList([file], event);                                                                        // 955
    };                                                                                                               // 956
    $.removeFile = function(file){                                                                                   // 957
      for(var i = $.files.length - 1; i >= 0; i--) {                                                                 // 958
        if($.files[i] === file) {                                                                                    // 959
          $.files.splice(i, 1);                                                                                      // 960
        }                                                                                                            // 961
      }                                                                                                              // 962
    };                                                                                                               // 963
    $.getFromUniqueIdentifier = function(uniqueIdentifier){                                                          // 964
      var ret = false;                                                                                               // 965
      $h.each($.files, function(f){                                                                                  // 966
        if(f.uniqueIdentifier==uniqueIdentifier) ret = f;                                                            // 967
      });                                                                                                            // 968
      return(ret);                                                                                                   // 969
    };                                                                                                               // 970
    $.getSize = function(){                                                                                          // 971
      var totalSize = 0;                                                                                             // 972
      $h.each($.files, function(file){                                                                               // 973
        totalSize += file.size;                                                                                      // 974
      });                                                                                                            // 975
      return(totalSize);                                                                                             // 976
    };                                                                                                               // 977
                                                                                                                     // 978
    return(this);                                                                                                    // 979
  };                                                                                                                 // 980
                                                                                                                     // 981
                                                                                                                     // 982
  // Node.js-style export for Node and Component                                                                     // 983
  if (typeof module != 'undefined') {                                                                                // 984
    module.exports = Resumable;                                                                                      // 985
  } else if (typeof define === "function" && define.amd) {                                                           // 986
    // AMD/requirejs: Define the module                                                                              // 987
    define(function(){                                                                                               // 988
      return Resumable;                                                                                              // 989
    });                                                                                                              // 990
  } else {                                                                                                           // 991
    // Browser: Expose to window                                                                                     // 992
    window.Resumable = Resumable;                                                                                    // 993
  }                                                                                                                  // 994
                                                                                                                     // 995
})();                                                                                                                // 996
                                                                                                                     // 997
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/vsivsi:file-collection/src/gridFS.coffee.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/vsivsi:file-collection/src/resumable_client.coffee.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      var aArgs, fBound, fNOP, fToBind;
      if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
      aArgs = Array.prototype.slice.call(arguments, 1);
      fToBind = this;
      fNOP = function() {};
      fBound = function() {
        var func;
        func = this instanceof fNOP && oThis ? this : oThis;
        return fToBind.apply(func, aArgs.concat(Array.prototype.slice.call(arguments)));
      };
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  }
  share.setup_resumable = function() {
    var r;
    r = new Resumable({
      target: "" + this.baseURL + "/_resumable",
      generateUniqueIdentifier: function(file) {
        return "" + (new Meteor.Collection.ObjectID());
      },
      fileParameterName: 'file',
      chunkSize: this.chunkSize,
      testChunks: true,
      permanentErrors: [204, 404, 415, 500, 501],
      simultaneousUploads: 3,
      maxFiles: void 0,
      maxFilesErrorCallback: void 0,
      prioritizeFirstAndLastChunk: false,
      query: void 0,
      headers: {}
    });
    if (!r.support) {
      console.error("resumable.js not supported by this Browser, uploads will be disabled");
      return this.resumable = null;
    } else {
      return this.resumable = r;
    }
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/vsivsi:file-collection/src/gridFS_client.coffee.js                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (Meteor.isClient) {
  FileCollection = (function(_super) {
    __extends(FileCollection, _super);

    function FileCollection(root, options) {
      var _ref, _ref1;
      this.root = root != null ? root : share.defaultRoot;
      if (options == null) {
        options = {};
      }
      if (!(this instanceof FileCollection)) {
        return new FileCollection(root, options);
      }
      if (!(this instanceof Mongo.Collection)) {
        throw new Error('The global definition of Mongo.Collection has changed since the file-collection package was loaded. Please ensure that any packages that redefine Mongo.Collection are loaded before file-collection.');
      }
      if (typeof this.root === 'object') {
        options = this.root;
        this.root = share.defaultRoot;
      }
      this.base = this.root;
      this.baseURL = (_ref = options.baseURL) != null ? _ref : "/gridfs/" + this.root;
      this.chunkSize = (_ref1 = options.chunkSize) != null ? _ref1 : share.defaultChunkSize;
      FileCollection.__super__.constructor.call(this, this.root + '.files', {
        idGeneration: 'MONGO'
      });
      if (options.resumable) {
        share.setup_resumable.bind(this)();
      }
    }

    FileCollection.prototype.insert = function(file, callback) {
      if (callback == null) {
        callback = void 0;
      }
      file = share.insert_func(file, this.chunkSize);
      return FileCollection.__super__.insert.call(this, file, callback);
    };

    FileCollection.prototype.allow = function() {
      throw new Error("File Collection Allow rules may not be set in client code.");
    };

    FileCollection.prototype.deny = function() {
      throw new Error("File Collection Deny rules may not be set in client code.");
    };

    FileCollection.prototype.upsert = function() {
      throw new Error("File Collections do not support 'upsert'");
    };

    FileCollection.prototype.update = function() {
      throw new Error("File Collections do not support 'update' on client, use method calls instead");
    };

    FileCollection.prototype.findOneStream = function() {
      throw new Error("File Collections do not support 'findOneStream' in client code.");
    };

    FileCollection.prototype.upsertStream = function() {
      throw new Error("File Collections do not support 'upsertStream' in client code.");
    };

    FileCollection.prototype.importFile = function() {
      throw new Error("File Collections do not support 'importFile' in client code.");
    };

    FileCollection.prototype.exportFile = function() {
      throw new Error("File Collections do not support 'exportFile' in client code.");
    };

    return FileCollection;

  })(Mongo.Collection);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['vsivsi:file-collection'] = {
  FileCollection: FileCollection
};

})();
