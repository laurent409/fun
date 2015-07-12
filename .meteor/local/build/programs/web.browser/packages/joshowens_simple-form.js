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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package.templating.Template;
var _ = Package.underscore._;
var _s = Package['mrt:underscore-string-latest']._s;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var SimpleForm, processClass, html_class, processRequired, processId, processPlaceHolder, placeholder, processLabel, label_words, buildLabel, buildHintBlock, hintBlock, buildBeforeAddon, addon, buildAfterAddon, processForBelongsTo, name, isAssociation, associations, processForHaBTM, buildAssociationCheckboxes, builtCheckboxes, checked, label, html, value, type, required, hint, beforeAddon, afterAddon, rows, _this, optionsValues, associationOptions, dbField, html_options, selected, klass, actionWord, html_id, array;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/joshowens:simple-form/template.fileField.js                                                          //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__checkName("simpleFormFileField");                                                                     // 2
Template["simpleFormFileField"] = new Template("Template.simpleFormFileField", (function() {                     // 3
  var view = this;                                                                                               // 4
  return [ Blaze.If(function() {                                                                                 // 5
    return Spacebars.call(view.lookup("file"));                                                                  // 6
  }, function() {                                                                                                // 7
    return [ "\n  ", Blaze.View(function() {                                                                     // 8
      return Spacebars.mustache(view.lookup("originalFileName"));                                                // 9
    }), " ", HTML.A({                                                                                            // 10
      href: function() {                                                                                         // 11
        return Spacebars.mustache(view.lookup("file"));                                                          // 12
      },                                                                                                         // 13
      "class": "remove"                                                                                          // 14
    }, " ", HTML.I({                                                                                             // 15
      "class": "fa fa-trash-o"                                                                                   // 16
    })), "\n" ];                                                                                                 // 17
  }, function() {                                                                                                // 18
    return [ "\n  ", Blaze._TemplateWith(function() {                                                            // 19
      return {                                                                                                   // 20
        settings: Spacebars.call(view.lookup("settings"))                                                        // 21
      };                                                                                                         // 22
    }, function() {                                                                                              // 23
      return Spacebars.include(view.lookupTemplate("uploader"));                                                 // 24
    }), "\n" ];                                                                                                  // 25
  }), "\n  ", HTML.INPUT({                                                                                       // 26
    type: "hidden",                                                                                              // 27
    "class": "simpleFormFile",                                                                                   // 28
    value: function() {                                                                                          // 29
      return Spacebars.mustache(view.lookup("file"));                                                            // 30
    },                                                                                                           // 31
    name: function() {                                                                                           // 32
      return [ Spacebars.mustache(Spacebars.dot(view.lookup("settings"), "name")), "Url" ];                      // 33
    }                                                                                                            // 34
  }), "\n  ", HTML.INPUT({                                                                                       // 35
    type: "hidden",                                                                                              // 36
    "class": "simpleFormFile",                                                                                   // 37
    value: function() {                                                                                          // 38
      return Spacebars.mustache(view.lookup("originalFileName"));                                                // 39
    },                                                                                                           // 40
    name: function() {                                                                                           // 41
      return [ Spacebars.mustache(Spacebars.dot(view.lookup("settings"), "name")), "OriginalFileName" ];         // 42
    }                                                                                                            // 43
  }) ];                                                                                                          // 44
}));                                                                                                             // 45
                                                                                                                 // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/joshowens:simple-form/fileField.js                                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Template.simpleFormFileField.helpers({                                                                           // 1
  originalFileName: function() {                                                                                 // 2
    if (Session.get(this.field + 'OriginalFileName')) {                                                          // 3
      return Session.get(this.field + 'OriginalFileName')                                                        // 4
    } else {                                                                                                     // 5
      return this.object[this.field + "OriginalFileName"]                                                        // 6
    }                                                                                                            // 7
  },                                                                                                             // 8
  file: function() {                                                                                             // 9
    if (Session.get(this.field + 'Url')) {                                                                       // 10
      return Session.get(this.field + 'Url')                                                                     // 11
    } else {                                                                                                     // 12
      return this.object[this.field + 'Url']                                                                     // 13
    }                                                                                                            // 14
  }                                                                                                              // 15
})                                                                                                               // 16
                                                                                                                 // 17
Template.simpleFormFileField.events({                                                                            // 18
  'click .remove': function(event) {                                                                             // 19
    event.preventDefault()                                                                                       // 20
    Meteor.call("uploaderDelete", $(event.target).parent().attr('href'), function() {                            // 21
      Session.set(this.field+ 'OriginalFileName', undefined)                                                     // 22
      Session.set(this.field + 'Url', undefined)                                                                 // 23
      $('input[name="'+ this.field +'Url"').val(undefined)                                                       // 24
      $('input[name="'+ this.field +'OriginalFileName"').val(undefined)                                          // 25
      this.object[this.field + 'Url'] = undefined                                                                // 26
      this.object[this.field + 'OriginalFileName'] = undefined                                                   // 27
    }.bind(this))                                                                                                // 28
  }                                                                                                              // 29
})                                                                                                               // 30
                                                                                                                 // 31
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/joshowens:simple-form/helper.js                                                                      //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
processClass = function(optionsHash) {                                                                           // 1
  if (!optionsHash) {                                                                                            // 2
    return                                                                                                       // 3
  }                                                                                                              // 4
  if (optionsHash['class']) {                                                                                    // 5
    html_class = " " + optionsHash['class']                                                                      // 6
  } else {                                                                                                       // 7
    html_class = ""                                                                                              // 8
  }                                                                                                              // 9
  return html_class                                                                                              // 10
}                                                                                                                // 11
                                                                                                                 // 12
processRequired = function(optionHash) {                                                                         // 13
  if (optionHash['required']) {                                                                                  // 14
    return " required"                                                                                           // 15
  } else {                                                                                                       // 16
    return ""                                                                                                    // 17
  }                                                                                                              // 18
}                                                                                                                // 19
                                                                                                                 // 20
processId = function(optionsHash) {                                                                              // 21
  if (!optionsHash) {                                                                                            // 22
    return                                                                                                       // 23
  }                                                                                                              // 24
  if (optionsHash['id']) {                                                                                       // 25
    return " id='" + optionsHash['id'] + "'";                                                                    // 26
  } else {                                                                                                       // 27
    return ""                                                                                                    // 28
  }                                                                                                              // 29
}                                                                                                                // 30
                                                                                                                 // 31
processPlaceHolder = function(optionsHash) {                                                                     // 32
  if (optionsHash['placeholder']) {                                                                              // 33
    placeholder = " placeholder='" + optionsHash['placeholder'] + "' "                                           // 34
  } else {                                                                                                       // 35
    placeholder = ""                                                                                             // 36
  }                                                                                                              // 37
  return placeholder                                                                                             // 38
}                                                                                                                // 39
                                                                                                                 // 40
processLabel = function(optionsHash, field) {                                                                    // 41
  if (_.isString(optionsHash['label'])) {                                                                        // 42
    label_words = optionsHash['label']                                                                           // 43
  } else {                                                                                                       // 44
    label_words = _.humanize(field)                                                                              // 45
  }                                                                                                              // 46
  return label_words                                                                                             // 47
}                                                                                                                // 48
                                                                                                                 // 49
buildLabel = function(optionsHash, field) {                                                                      // 50
  if (optionsHash['label'] === false) {                                                                          // 51
    return ''                                                                                                    // 52
  } else {                                                                                                       // 53
    label_words = processLabel(optionsHash, field)                                                               // 54
    return "<label for='"+ field +"'>" + label_words + "</label>"                                                // 55
  }                                                                                                              // 56
}                                                                                                                // 57
                                                                                                                 // 58
buildHintBlock = function(optionsHash) {                                                                         // 59
  if (optionsHash['hint']) {                                                                                     // 60
    hintBlock = "<span class='help-block'>" + optionsHash['hint'] + "</span>";                                   // 61
  } else {                                                                                                       // 62
    hintBlock = "";                                                                                              // 63
  }                                                                                                              // 64
  return hintBlock;                                                                                              // 65
}                                                                                                                // 66
                                                                                                                 // 67
buildBeforeAddon = function(optionsHash) {                                                                       // 68
  addon = ""                                                                                                     // 69
  if (optionsHash['before'] || optionsHash['after']) {                                                           // 70
    addon = "<div class='input-group'>"                                                                          // 71
    if (optionsHash['before']) {                                                                                 // 72
      addon = addon + "<span class='input-group-addon'>" + optionsHash['before'] + "</span>"                     // 73
    }                                                                                                            // 74
  }                                                                                                              // 75
  return addon                                                                                                   // 76
}                                                                                                                // 77
                                                                                                                 // 78
buildAfterAddon = function(optionsHash) {                                                                        // 79
  addon = ""                                                                                                     // 80
  if (optionsHash['before'] || optionsHash['after']) {                                                           // 81
    if (optionsHash['after']) {                                                                                  // 82
      addon = "<span class='input-group-addon'>" + optionsHash['after'] + "</span>"                              // 83
    }                                                                                                            // 84
    addon = addon + "</div>"                                                                                     // 85
  }                                                                                                              // 86
  return addon                                                                                                   // 87
}                                                                                                                // 88
                                                                                                                 // 89
processForBelongsTo = function(field, object) {                                                                  // 90
  name = object.constructor.name                                                                                 // 91
  if (!window[name]) {                                                                                           // 92
    return false                                                                                                 // 93
  }                                                                                                              // 94
  isAssociation = _.contains(_.pluck(window[name].belongs_to, 'name'), field)                                    // 95
  if (isAssociation) {                                                                                           // 96
    associations = window[_.classify(field)].all()                                                               // 97
    var array = [];                                                                                              // 98
    _.each(associations, function(association) {                                                                 // 99
      array.push({value: association._id, name: association.name})                                               // 100
    })                                                                                                           // 101
    return array                                                                                                 // 102
  } else {                                                                                                       // 103
    return false                                                                                                 // 104
  }                                                                                                              // 105
}                                                                                                                // 106
                                                                                                                 // 107
processForHaBTM = function(field, object) {                                                                      // 108
  name = object.constructor.name                                                                                 // 109
  if (!window[name]) {                                                                                           // 110
    return false                                                                                                 // 111
  }                                                                                                              // 112
  isAssociation = _.contains(_.pluck(window[name].has_and_belongs_to_many, 'name'), field)                       // 113
  if (isAssociation) {                                                                                           // 114
    associations = window[_.classify(_.singularize(field))].all()                                                // 115
    var array = [];                                                                                              // 116
    _.each(associations, function(association) {                                                                 // 117
      array.push({value: association._id, name: association.name})                                               // 118
    })                                                                                                           // 119
    return array                                                                                                 // 120
  } else {                                                                                                       // 121
    return false                                                                                                 // 122
  }                                                                                                              // 123
}                                                                                                                // 124
                                                                                                                 // 125
buildAssociationCheckboxes = function(field, object, checkboxes, options) {                                      // 126
  return false                                                                                                   // 127
  builtCheckboxes = _.map(checkboxes, function(checkbox) {                                                       // 128
    html_class = processClass(options.hash)                                                                      // 129
    checked = _.contains(object[_.singularize(field) + '_ids'], checkbox.value) === true ? ' checked' : '';      // 130
    label = processLabel(options.hash, checkbox.name)                                                            // 131
    html = "<label for='"+ checkbox.name +"'><input id='"+ checkbox.name +"' name='" + checkbox.name + "' type='hidden' value='false'><input name='" + checkbox.name + "' class='"+ html_class +"' type='checkbox' value='" + checkbox.value + "' " + checked + ">" + label + "</label>";
    return html;                                                                                                 // 133
  });                                                                                                            // 134
  return new Spacebars.SafeString(builtCheckboxes.join(' '));                                                    // 135
}                                                                                                                // 136
                                                                                                                 // 137
/*----- HELPERS ------*/                                                                                         // 138
                                                                                                                 // 139
UI.registerHelper('text_field', function(field, options){                                                        // 140
  var _this = this;                                                                                              // 141
  if (!field) {                                                                                                  // 142
    return;                                                                                                      // 143
  }                                                                                                              // 144
  value = _this[field] || ""                                                                                     // 145
  html_class = processClass(options.hash)                                                                        // 146
  type = options.hash['type'] || "text"                                                                          // 147
  if (value && type === "date" && value.constructor === Date) {                                                  // 148
    value = value.getFullYear() + '-' + ('0' + (value.getMonth()+1)).slice(-2) + "-" + ('0' + value.getDate()).slice(-2)
  }                                                                                                              // 150
  placeholder = processPlaceHolder(options.hash)                                                                 // 151
  required = processRequired(options.hash)                                                                       // 152
  html = "<input type='"+ type +"' id='" + field + "' name='"+ field +"' value='"+ value +"' class='form-control"+ html_class +"'"+ placeholder + required + " >"
  label = buildLabel(options.hash, field)                                                                        // 154
  hint = buildHintBlock(options.hash)                                                                            // 155
  beforeAddon = buildBeforeAddon(options.hash)                                                                   // 156
  afterAddon = buildAfterAddon(options.hash)                                                                     // 157
  return new Spacebars.SafeString(label + beforeAddon + html + afterAddon + hint);                               // 158
});                                                                                                              // 159
                                                                                                                 // 160
UI.registerHelper('text_area', function(field, options){                                                         // 161
  var _this = this;                                                                                              // 162
  if (!field) {                                                                                                  // 163
    return;                                                                                                      // 164
  }                                                                                                              // 165
  value = _this[field] || ""                                                                                     // 166
  html_class = processClass(options.hash)                                                                        // 167
  if (options.hash['rows']) {                                                                                    // 168
    rows = "rows='"+ options.hash['rows'] +"' "                                                                  // 169
  } else {                                                                                                       // 170
    rows = ""                                                                                                    // 171
  }                                                                                                              // 172
                                                                                                                 // 173
  required = processRequired(options.hash)                                                                       // 174
  html = "<textarea id='" + field + "' "+ rows +"name='"+ field +"' class='form-control"+ html_class +"'" + required + ">"+ value +"</textarea>"
  label = buildLabel(options.hash, field)                                                                        // 176
  hint = buildHintBlock(options.hash)                                                                            // 177
  return new Spacebars.SafeString(label + html + hint);                                                          // 178
});                                                                                                              // 179
                                                                                                                 // 180
UI.registerHelper('select_box', function(field, options) {                                                       // 181
  _this = this;                                                                                                  // 182
  optionsValues = undefined                                                                                      // 183
  if (!field) {                                                                                                  // 184
    return;                                                                                                      // 185
  }                                                                                                              // 186
                                                                                                                 // 187
  associationOptions = processForBelongsTo(field, _this)                                                         // 188
  html_class = processClass(options.hash)                                                                        // 189
                                                                                                                 // 190
  if (associationOptions) {                                                                                      // 191
    optionsValues = associationOptions                                                                           // 192
    dbField = field + "_id"                                                                                      // 193
  } else {                                                                                                       // 194
    dbField = field                                                                                              // 195
    if (options.hash.optionValues && options.hash.optionValues.length > 0) {                                     // 196
      optionsValues = options.hash.optionValues                                                                  // 197
    } else {                                                                                                     // 198
      optionsValues = _this["" + field + "Options"]();                                                           // 199
    }                                                                                                            // 200
  }                                                                                                              // 201
                                                                                                                 // 202
  required = processRequired(options.hash)                                                                       // 203
  html_options = [];                                                                                             // 204
  _.each(optionsValues, function(option) {                                                                       // 205
    name = option.name || _.humanize(option)                                                                     // 206
    value = option.value || option                                                                               // 207
    selected = _this[field] === value ? ' selected' : '';                                                        // 208
    return html_options.push("<option value='" + value + "'" + selected + ">" + name + "</option>");             // 209
  });                                                                                                            // 210
  html = "<select class='form-control" + html_class + "' name='" + dbField + "'" + required + ">" + (html_options.join('')) + "</select>"
  label = buildLabel(options.hash, dbField)                                                                      // 212
  hint = buildHintBlock(options.hash)                                                                            // 213
  return new Spacebars.SafeString(label + html + hint);                                                          // 214
});                                                                                                              // 215
                                                                                                                 // 216
                                                                                                                 // 217
UI.registerHelper('check_box', function(field, options) {                                                        // 218
  var capitalizedField, checked;                                                                                 // 219
  if (!field) {                                                                                                  // 220
    return;                                                                                                      // 221
  }                                                                                                              // 222
  associationOptions = null//processForHaBTM(field, this)                                                        // 223
  if (associationOptions) {                                                                                      // 224
    return buildAssociationCheckboxes(field, this, associationOptions, options)                                  // 225
  } else {                                                                                                       // 226
    html_class = processClass(options.hash)                                                                      // 227
    checked = this[field] === 'true' ? ' checked' : '';                                                          // 228
    label = processLabel(options.hash, field)                                                                    // 229
    required = processRequired(options.hash)                                                                     // 230
    html = "<label for='"+ field +"'><input id='"+ field +"' name='" + field + "' type='hidden' value='false'><input name='" + field + "' class='"+ html_class +"' type='checkbox' value='true' " + checked + required + ">" + label + "</label>";
    hint = buildHintBlock(options.hash)                                                                          // 232
    return new Spacebars.SafeString(html + hint);                                                                // 233
  }                                                                                                              // 234
});                                                                                                              // 235
                                                                                                                 // 236
UI.registerHelper('file_field', function(){                                                                      // 237
  if (Package['schnie:uploader']) {                                                                              // 238
    this.settings = {                                                                                            // 239
      name: this.field,                                                                                          // 240
      onUpload: function(error, result) {                                                                        // 241
        if (result) {                                                                                            // 242
          $('input[name="'+ this.name +'Url"').val(result.url)                                                   // 243
          $('input[name="'+ this.name +'OriginalFileName"').val(result.originalFileName)                         // 244
          Session.set(this.name + 'OriginalFileName', result.originalFileName)                                   // 245
          Session.set(this.name + 'Url', result.url)                                                             // 246
        } else {                                                                                                 // 247
          console.log(error)                                                                                     // 248
        }                                                                                                        // 249
      }                                                                                                          // 250
    }                                                                                                            // 251
    return Template['simpleFormFileField']                                                                       // 252
  }                                                                                                              // 253
});                                                                                                              // 254
                                                                                                                 // 255
UI.registerHelper('submit_button', function(text, options){                                                      // 256
  var _this = this;                                                                                              // 257
  if (!text && !options) {                                                                                       // 258
    options = {};                                                                                                // 259
  }                                                                                                              // 260
  if (text && text.hash) {                                                                                       // 261
    options = text;                                                                                              // 262
    text = undefined;                                                                                            // 263
  }                                                                                                              // 264
  klass = _this.constructor.name;                                                                                // 265
  if (_this._id) {                                                                                               // 266
    actionWord = "Update "                                                                                       // 267
  } else {                                                                                                       // 268
    actionWord = "Add "                                                                                          // 269
  }                                                                                                              // 270
  value = text || actionWord + klass;                                                                            // 271
  html_class = processClass(options.hash);                                                                       // 272
  html_id = processId(options.hash);                                                                             // 273
  if (options.hash && options.hash['button']) {                                                                  // 274
    html = "<button type='submit' class='btn btn-default"+ html_class + "'"+ html_id +">" + value + "</button>"; // 275
  } else {                                                                                                       // 276
    html = "<input type='submit' value='"+ value +"' class='btn btn-default"+ html_class + "'"+ html_id +">";    // 277
  }                                                                                                              // 278
  return new Spacebars.SafeString(html);                                                                         // 279
});                                                                                                              // 280
                                                                                                                 // 281
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/joshowens:simple-form/simpleform.js                                                                  //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
SimpleForm = {                                                                                                   // 1
  processForm: function(target) {                                                                                // 2
    var form = {};                                                                                               // 3
    array = $(target).serializeArray();                                                                          // 4
    _.each(array, function(formItem) {                                                                           // 5
      type = $(target).find("input[name='" + formItem.name + "']").attr('type')                                  // 6
      if (type === 'date' && !!formItem.value) {                                                                 // 7
        return form[formItem.name] = new Date(formItem.value + " 00:00");                                        // 8
      } else {                                                                                                   // 9
        return form[formItem.name] = formItem.value;                                                             // 10
      }                                                                                                          // 11
    });                                                                                                          // 12
    return form;                                                                                                 // 13
  },                                                                                                             // 14
  resetForm: function(target){                                                                                   // 15
    $(target).trigger('reset')                                                                                   // 16
  }                                                                                                              // 17
};                                                                                                               // 18
                                                                                                                 // 19
                                                                                                                 // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['joshowens:simple-form'] = {
  SimpleForm: SimpleForm
};

})();
