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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var ShareIt, __coffeescriptShare;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/shareit.coffee.js                                                  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
            

ShareIt = {
  settings: {
    autoInit: true,
    buttons: 'responsive',
    sites: {
      'facebook': {
        'appId': null,
        'version': 'v2.1',
        'message': ''
      },
      'twitter': {
        'message': ''
      },
      'googleplus': {
        'message': ''
      },
      'pinterest': {
        'message': ''
      },
      'instagram': {
        'message': ''
      }
    },
    siteOrder: ['facebook', 'twitter', 'pinterest', 'googleplus', 'instagram'],
    classes: "large btn",
    iconOnly: false,
    faSize: '',
    faClass: '',
    applyColors: true
  },
  configure: function(hash) {
    return this.settings = $.extend(true, this.settings, hash);
  },
  helpers: {
    classes: function() {
      return ShareIt.settings.classes;
    },
    showText: function() {
      return !ShareIt.settings.iconOnly;
    },
    applyColors: function() {
      return ShareIt.settings.applyColors;
    },
    faSize: function() {
      return ShareIt.settings.faSize;
    },
    faClass: function() {
      if (!!ShareIt.settings.faClass) {
        return '-' + ShareIt.settings.faClass;
      } else {
        return '';
      }
    }
  }
};

this.ShareIt = ShareIt;

ShareIt.init = function(hash) {
  this.settings = $.extend(true, this.settings, hash);
  window.twttr = (function(d, s, id) {
    var fjs, js, t;
    t = void 0;
    js = void 0;
    fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = {
      _e: [],
      ready: function(f) {
        return t._e.push(f);
      }
    });
  })(document, 'script', 'twitter-wjs');
  $('<div id="fb-root"></div>').appendTo('body');
  if (ShareIt.settings.autoInit) {
    window.fbAsyncInit = function() {
      return FB.init(ShareIt.settings.sites.facebook);
    };
  }
  return (function(d, s, id) {
    var fjs, js;
    js = void 0;
    fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/template.social.js                                    //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
                                                                                                    // 1
Template.__checkName("shareit");                                                                    // 2
Template["shareit"] = new Template("Template.shareit", (function() {                                // 3
  var view = this;                                                                                  // 4
  return HTML.DIV({                                                                                 // 5
    "class": "share-buttons"                                                                        // 6
  }, "\n  ", Blaze.Each(function() {                                                                // 7
    return Spacebars.call(view.lookup("siteTemplates"));                                            // 8
  }, function() {                                                                                   // 9
    return [ "\n    ", Blaze._TemplateWith(function() {                                             // 10
      return {                                                                                      // 11
        template: Spacebars.call(view.lookup(".")),                                                 // 12
        data: Spacebars.call(view.lookup(".."))                                                     // 13
      };                                                                                            // 14
    }, function() {                                                                                 // 15
      return Spacebars.include(function() {                                                         // 16
        return Spacebars.call(Template.__dynamic);                                                  // 17
      });                                                                                           // 18
    }), "\n  " ];                                                                                   // 19
  }), "\n");                                                                                        // 20
}));                                                                                                // 21
                                                                                                    // 22
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/social.coffee.js                                      //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.shareit.helpers({
  siteTemplates: function() {
    var site, templates, _i, _len, _ref;
    templates = [];
    _ref = ShareIt.settings.siteOrder;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      site = _ref[_i];
      if (ShareIt.settings.sites[site] != null) {
        templates.push('shareit_' + site);
      }
    }
    return templates;
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/facebook/template.facebook.js                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
                                                                                                    // 1
Template.__checkName("shareit_facebook");                                                           // 2
Template["shareit_facebook"] = new Template("Template.shareit_facebook", (function() {              // 3
  var view = this;                                                                                  // 4
  return HTML.A({                                                                                   // 5
    target: "_blank",                                                                               // 6
    "class": function() {                                                                           // 7
      return [ Spacebars.mustache(view.lookup("classes")), Blaze.If(function() {                    // 8
        return Spacebars.call(view.lookup("applyColors"));                                          // 9
      }, function() {                                                                               // 10
        return " shareit-facebook-colors";                                                          // 11
      }), " fb-share" ];                                                                            // 12
    },                                                                                              // 13
    href: "#"                                                                                       // 14
  }, "\n    ", HTML.I({                                                                             // 15
    "class": function() {                                                                           // 16
      return [ "fa fa-facebook", Spacebars.mustache(view.lookup("faClass")), " ", Spacebars.mustache(view.lookup("faSize")) ];
    }                                                                                               // 18
  }), "\n    ", Blaze.If(function() {                                                               // 19
    return Spacebars.call(view.lookup("showText"));                                                 // 20
  }, function() {                                                                                   // 21
    return " Share on Facebook";                                                                    // 22
  }), "\n  ");                                                                                      // 23
}));                                                                                                // 24
                                                                                                    // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/facebook/facebook.coffee.js                           //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.shareit_facebook.rendered = function() {
  if (!this.data) {
    return;
  }
  this.autorun(function() {
    var base, data, description, href, img, summary, template, title, url, _ref;
    template = Template.instance();
    data = Template.currentData();
    $('meta[property^="og:"]').remove();
    description = ((_ref = data.facebook) != null ? _ref.description : void 0) || data.excerpt || data.description || data.summary;
    url = data.url || location.origin + location.pathname;
    title = data.title;
    $('<meta>', {
      property: 'og:type',
      content: 'article'
    }).appendTo('head');
    $('<meta>', {
      property: 'og:site_name',
      content: location.hostname
    }).appendTo('head');
    $('<meta>', {
      property: 'og:url',
      content: url
    }).appendTo('head');
    $('<meta>', {
      property: 'og:title',
      content: title
    }).appendTo('head');
    $('<meta>', {
      property: 'og:description',
      content: description
    }).appendTo('head');
    if (data.thumbnail) {
      if (typeof data.thumbnail === "function") {
        img = data.thumbnail();
      } else {
        img = data.thumbnail;
      }
    }
    if (img) {
      if (!/^http(s?):\/\/+/.test(img)) {
        img = location.origin + img;
      }
    }
    $('<meta>', {
      property: 'og:image',
      content: img
    }).appendTo('head');
    if (ShareIt.settings.sites.facebook.appId != null) {
      return template.$('.fb-share').click(function(e) {
        e.preventDefault();
        return FB.ui({
          method: 'share',
          display: 'popup',
          href: url
        }, function(response) {});
      });
    } else {
      url = encodeURIComponent(url);
      base = "https://www.facebook.com/sharer/sharer.php";
      title = encodeURIComponent(title);
      summary = encodeURIComponent(description);
      href = base + "?s=100&p[url]=" + url + "&p[title]=" + title + "&p[summary]=" + summary;
      if (img) {
        href += "&p[images][0]=" + encodeURIComponent(img);
      }
      return template.$(".fb-share").attr("href", href);
    }
  });
};

Template.shareit_facebook.helpers(ShareIt.helpers);
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/twitter/template.twitter.js                           //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
                                                                                                    // 1
Template.__checkName("shareit_twitter");                                                            // 2
Template["shareit_twitter"] = new Template("Template.shareit_twitter", (function() {                // 3
  var view = this;                                                                                  // 4
  return HTML.A({                                                                                   // 5
    "class": function() {                                                                           // 6
      return [ Spacebars.mustache(view.lookup("classes")), Blaze.If(function() {                    // 7
        return Spacebars.call(view.lookup("applyColors"));                                          // 8
      }, function() {                                                                               // 9
        return " shareit-twitter-colors";                                                           // 10
      }), " tw-share" ];                                                                            // 11
    },                                                                                              // 12
    href: function() {                                                                              // 13
      return [ "https://twitter.com/intent/tweet?url=", Spacebars.mustache(view.lookup("url")), "&text=", Spacebars.mustache(view.lookup("text")) ];
    }                                                                                               // 15
  }, "\n    ", HTML.I({                                                                             // 16
    "class": function() {                                                                           // 17
      return [ "fa fa-twitter", Spacebars.mustache(view.lookup("faClass")), " ", Spacebars.mustache(view.lookup("faSize")) ];
    }                                                                                               // 19
  }), Blaze.If(function() {                                                                         // 20
    return Spacebars.call(view.lookup("showText"));                                                 // 21
  }, function() {                                                                                   // 22
    return " Share on Twitter";                                                                     // 23
  }), "\n  ");                                                                                      // 24
}));                                                                                                // 25
                                                                                                    // 26
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/twitter/twitter.coffee.js                             //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.shareit_twitter.rendered = function() {
  if (!this.data) {
    return;
  }
  return this.autorun(function() {
    var base, data, description, href, img, preferred_url, template, text, url, _ref;
    template = Template.instance();
    data = Template.currentData();
    $('meta[property^="twitter:"]').remove();
    if (data.thumbnail) {
      if (typeof data.thumbnail === "function") {
        img = data.thumbnail();
      } else {
        img = data.thumbnail;
      }
      if (img) {
        if (!/^http(s?):\/\/+/.test(img)) {
          img = location.origin + img;
        }
      }
    }
    $('<meta>', {
      property: 'twitter:card',
      content: 'summary'
    }).appendTo('head');
    if (data.author) {
      $('<meta>', {
        property: 'twitter:creator',
        content: data.author
      }).appendTo('head');
    }
    description = data.excerpt || data.description || data.summary;
    $('<meta>', {
      property: 'twitter:url',
      content: location.origin + location.pathname
    }).appendTo('head');
    $('<meta>', {
      property: 'twitter:title',
      content: "" + data.title
    }).appendTo('head');
    $('<meta>', {
      property: 'twitter:description',
      content: description
    }).appendTo('head');
    $('<meta>', {
      property: 'twitter:image',
      content: img
    }).appendTo('head');
    preferred_url = data.url || location.origin + location.pathname;
    url = encodeURIComponent(preferred_url);
    base = "https://twitter.com/intent/tweet";
    text = encodeURIComponent(((_ref = data.twitter) != null ? _ref.title : void 0) || data.title);
    href = base + "?url=" + url + "&text=" + text;
    if (data.author) {
      href += "&via=" + data.author;
    }
    return template.$(".tw-share").attr("href", href);
  });
};

Template.shareit_twitter.helpers(ShareIt.helpers);
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/googleplus/template.googleplus.js                     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
                                                                                                    // 1
Template.__checkName("shareit_googleplus");                                                         // 2
Template["shareit_googleplus"] = new Template("Template.shareit_googleplus", (function() {          // 3
  var view = this;                                                                                  // 4
  return HTML.A({                                                                                   // 5
    "class": function() {                                                                           // 6
      return [ Spacebars.mustache(view.lookup("classes")), Blaze.If(function() {                    // 7
        return Spacebars.call(view.lookup("applyColors"));                                          // 8
      }, function() {                                                                               // 9
        return " shareit-google-colors";                                                            // 10
      }), " googleplus-share" ];                                                                    // 11
    },                                                                                              // 12
    href: "https://plus.google.com/share?url=#{url}",                                               // 13
    onclick: "javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
  }, "\n    ", HTML.I({                                                                             // 15
    "class": function() {                                                                           // 16
      return [ "fa fa-google-plus", Spacebars.mustache(view.lookup("faClass")), " ", Spacebars.mustache(view.lookup("faSize")) ];
    }                                                                                               // 18
  }), Blaze.If(function() {                                                                         // 19
    return Spacebars.call(view.lookup("showText"));                                                 // 20
  }, function() {                                                                                   // 21
    return " Share on Google+";                                                                     // 22
  }), "\n");                                                                                        // 23
}));                                                                                                // 24
                                                                                                    // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/googleplus/googleplus.coffee.js                       //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.shareit_googleplus.rendered = function() {
  if (!this.data) {
    return;
  }
  return this.autorun(function() {
    var data, description, href, img, itemtype, template, title, url, _ref, _ref1;
    template = Template.instance();
    data = Template.currentData();
    $('meta[itemscope]').remove();
    description = ((_ref = data.googleplus) != null ? _ref.description : void 0) || data.excerpt || data.description || data.summary;
    url = data.url || location.origin + location.pathname;
    title = data.title;
    itemtype = ((_ref1 = data.googleplus) != null ? _ref1.itemtype : void 0) || 'Article';
    $('html').attr('itemscope', '').attr('itemtype', "http://schema.org/" + itemtype);
    $('<meta>', {
      itemprop: 'name',
      content: location.hostname
    }).appendTo('head');
    $('<meta>', {
      itemprop: 'url',
      content: url
    }).appendTo('head');
    $('<meta>', {
      itemprop: 'description',
      content: description
    }).appendTo('head');
    if (data.thumbnail) {
      if (typeof data.thumbnail === "function") {
        img = data.thumbnail();
      } else {
        img = data.thumbnail;
      }
    }
    if (img) {
      if (!/^http(s?):\/\/+/.test(img)) {
        img = location.origin + img;
      }
    }
    $('<meta>', {
      itemprop: 'image',
      content: img
    }).appendTo('head');
    href = "https://plus.google.com/share?url=" + url;
    return template.$(".googleplus-share").attr("href", href);
  });
};

Template.shareit_googleplus.helpers(ShareIt.helpers);
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/pinterest/template.pinterest.js                       //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
                                                                                                    // 1
Template.__checkName("shareit_pinterest");                                                          // 2
Template["shareit_pinterest"] = new Template("Template.shareit_pinterest", (function() {            // 3
  var view = this;                                                                                  // 4
  return HTML.A({                                                                                   // 5
    "class": function() {                                                                           // 6
      return [ Spacebars.mustache(view.lookup("classes")), Blaze.If(function() {                    // 7
        return Spacebars.call(view.lookup("applyColors"));                                          // 8
      }, function() {                                                                               // 9
        return " shareit-pinterest-colors";                                                         // 10
      }), " pinterest-share" ];                                                                     // 11
    },                                                                                              // 12
    href: function() {                                                                              // 13
      return [ "https://www.pinterest.com/pin/create/button/?url=", Spacebars.mustache(view.lookup("url")), "&media=", Spacebars.mustache(view.lookup("media")), "&description=", Spacebars.mustache(view.lookup("description")) ];
    }                                                                                               // 15
  }, "\n    ", HTML.I({                                                                             // 16
    "class": function() {                                                                           // 17
      return [ "fa fa-pinterest", Spacebars.mustache(view.lookup("faClass")), " ", Spacebars.mustache(view.lookup("faSize")) ];
    }                                                                                               // 19
  }), Blaze.If(function() {                                                                         // 20
    return Spacebars.call(view.lookup("showText"));                                                 // 21
  }, function() {                                                                                   // 22
    return " Share on Pinterest";                                                                   // 23
  }), "\n  ");                                                                                      // 24
}));                                                                                                // 25
                                                                                                    // 26
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/lovetostrike:shareit/client/views/pinterest/pinterest.coffee.js                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.shareit_pinterest.rendered = function() {
  if (!this.data) {
    return;
  }
  return this.autorun(function() {
    var data, description, href, preferred_url, template, url, _ref;
    template = Template.instance();
    data = Template.currentData();
    preferred_url = data.url || location.origin + location.pathname;
    url = encodeURIComponent(preferred_url);
    description = encodeURIComponent(((_ref = data.pinterest) != null ? _ref.description : void 0) || data.description);
    href = "http://www.pinterest.com/pin/create/button/?url=" + url + "&media=" + data.media + "&description=" + description;
    return template.$('.pinterest-share').attr('href', href);
  });
};

Template.shareit_pinterest.events({
  'click a': function(event, template) {
    event.preventDefault();
    return window.open($(template.find('.pinterest-share')).attr('href'), 'pinterest_window', 'width=750, height=650');
  }
});

Template.shareit_pinterest.helpers(ShareIt.helpers);
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['lovetostrike:shareit'] = {
  ShareIt: ShareIt
};

})();
