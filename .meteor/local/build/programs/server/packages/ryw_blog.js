(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Accounts = Package['accounts-base'].Accounts;
var moment = Package['mrt:moment'].moment;
var FileCollection = Package['vsivsi:file-collection'].FileCollection;
var Roles = Package['alanning:roles'].Roles;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var SubsManager = Package['meteorhacks:subs-manager'].SubsManager;
var Iron = Package['iron:core'].Iron;
var FS = Package['cfs:base-package'].FS;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/config.coffee.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Config = (function(_super) {
  __extends(Config, _super);

  function Config() {
    return Config.__super__.constructor.apply(this, arguments);
  }

  Config._collection = new Meteor.Collection('blog_config');

  return Config;

})(Minimongoid);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/server/boot.coffee.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Blog;

Blog = {
  settings: {
    adminRole: null,
    adminGroup: null,
    authorRole: null,
    authorGroup: null,
    rss: {
      title: '',
      description: ''
    }
  },
  config: function(appConfig) {
    return this.settings = _.extend(this.settings, appConfig);
  }
};

this.Blog = Blog;

Meteor.startup(function() {
  var arr, classPattern, html, i, index, obj, para;
  Post._collection._ensureIndex({
    'slug': 1
  });
  Comment._collection._ensureIndex({
    'slug': 1
  });
  if (Post.where({
    excerpt: {
      $exists: 0
    }
  }).length) {
    arr = Post.where({
      excerpt: {
        $exists: 0
      }
    });
    i = 0;
    while (i < arr.length) {
      obj = arr[i++];
      obj.update({
        excerpt: Post.excerpt(obj.body)
      });
    }
  }
  if (!Config.first()) {
    Config.create({
      versions: ['0.5.0']
    });
  } else {
    Config.first().push({
      versions: '0.5.0'
    });
  }
  arr = Post.all();
  i = 0;
  while (i < arr.length) {
    obj = arr[i++];
    html = obj.body;
    para = /<p[^>]*>/g;
    classPattern = /class=[\"|\'].*[\"|\']/g;
    if ((html != null ? html.indexOf('commentable-section') : void 0) < 0) {
      index = 0;
      html = html.replace(para, function(ele) {
        var newEle;
        if (classPattern.test(ele)) {
          newEle = ele.replace('class=\"', 'class=\"commentable-section');
        } else {
          newEle = ele.replace('>', ' class=\"commentable-section\">');
        }
        newEle = newEle.replace('>', " data-section-id=\"" + index + "\">");
        index++;
        return newEle;
      });
      obj.update({
        body: html
      });
    }
  }
  if (Tag.count() === 0) {
    return Tag.create({
      tags: ['meteor']
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/server/rss.coffee.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({
  serveRSS: function() {
    var RSS, feed, host, posts;
    RSS = Npm.require('rss');
    host = _.trim(Meteor.absoluteUrl(), '/');
    feed = new RSS({
      title: Blog.settings.rss.title,
      description: Blog.settings.rss.description,
      feed_url: host + '/rss/posts',
      site_url: host,
      image_url: host + '/favicon.ico'
    });
    posts = Post.where({
      published: true
    }, {
      sort: {
        publishedAt: -1
      },
      limit: 20
    });
    posts.forEach(function(post) {
      return feed.item({
        title: post.title,
        description: post.excerpt,
        author: post.authorName(),
        date: post.publishedAt,
        url: "" + host + "/blog/" + post.slug,
        guid: post._id
      });
    });
    return feed.xml();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/server/publications.coffee.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish('commentsBySlug', function(slug) {
  check(slug, String);
  return Comment.find({
    slug: slug
  });
});

Meteor.publish('singlePostBySlug', function(slug) {
  check(slug, String);
  return Post.find({
    slug: slug
  });
});

Meteor.publish('posts', function(limit) {
  check(limit, Match.OneOf(Number, null));
  if (limit === null) {
    return this.ready();
  }
  return Post.find({
    published: true
  }, {
    fields: {
      body: 0
    },
    sort: {
      publishedAt: -1
    },
    limit: limit
  });
});

Meteor.publish('taggedPosts', function(tag) {
  check(tag, String);
  return Post.find({
    published: true,
    tags: tag
  }, {
    fields: {
      body: 0
    },
    sort: {
      publishedAt: -1
    }
  });
});

Meteor.publish('authors', function() {
  var ids;
  ids = _.uniq(_.pluck(Post.all({
    fields: {
      userId: 1
    }
  }), 'userId'));
  return Author.find({
    _id: {
      $in: ids
    }
  }, {
    fields: {
      profile: 1,
      username: 1,
      emails: 1
    }
  });
});

Meteor.publish('singlePostById', function(id) {
  check(id, String);
  if (!this.userId) {
    return this.ready();
  }
  return Post.find({
    _id: id
  });
});

Meteor.publish('postTags', function() {
  var handle, initializing, tags;
  if (!this.userId) {
    return this.ready();
  }
  initializing = true;
  tags = Tag.first().tags;
  handle = Post.find({}, {
    fields: {
      tags: 1
    }
  }).observeChanges({
    added: (function(_this) {
      return function(id, fields) {
        var doc;
        if (fields.tags) {
          doc = Tag.first();
          tags = _.uniq(doc.tags.concat(Post.splitTags(fields.tags)));
          doc.update({
            tags: tags
          });
          if (!initializing) {
            return _this.changed('blog_tags', 42, {
              tags: tags
            });
          }
        }
      };
    })(this),
    changed: (function(_this) {
      return function(id, fields) {
        var doc;
        if (fields.tags) {
          doc = Tag.first();
          tags = _.uniq(doc.tags.concat(Post.splitTags(fields.tags)));
          doc.update({
            tags: tags
          });
          if (!initializing) {
            return _this.changed('blog_tags', 42, {
              tags: tags
            });
          }
        }
      };
    })(this)
  });
  initializing = false;
  this.added('blog_tags', 42, {
    tags: tags
  });
  this.ready();
  return this.onStop(function() {
    return handle.stop();
  });
});

Meteor.publish('postForAdmin', function() {
  var sel;
  if (!this.userId) {
    return this.ready();
  }
  sel = {};
  if (Blog.settings.authorRole && Roles.userIsInRole(this.userId, Blog.settings.authorRole)) {
    sel = {
      userId: this.userId
    };
  }
  return Post.find(sel, {
    fields: {
      body: 0
    },
    sort: {
      publishedAt: -1
    }
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/author.coffee.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Author = (function(_super) {
  __extends(Author, _super);

  function Author() {
    return Author.__super__.constructor.apply(this, arguments);
  }

  Author._collection = Meteor.users;

  Author.has_many = [
    {
      name: 'posts',
      foreign_key: 'userId'
    }
  ];

  Author.current = function() {
    if (Meteor.userId()) {
      return Author.init(Meteor.user());
    }
  };

  return Author;

})(Minimongoid);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/post.coffee.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Post = (function(_super) {
  __extends(Post, _super);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post._collection = new Meteor.Collection('blog_posts');

  Post.belongs_to = [
    {
      name: 'author',
      identifier: 'userId'
    }
  ];

  Post.after_save = function(post) {
    post.tags = Post.splitTags(post.tags);
    if (post.body) {
      post.excerpt = Post.excerpt(post.body);
    }
    return this._collection.update({
      _id: post.id
    }, {
      $set: {
        tags: post.tags,
        excerpt: post.excerpt
      }
    });
  };

  Post.slugify = function(str) {
    return str.toLowerCase().replace(/[^\w ]+/g, "").replace(RegExp(" +", "g"), "-");
  };

  Post.splitTags = function(str) {
    if (str && typeof str === 'string') {
      return str.split(/,\s*/);
    }
    return str;
  };

  Post.prototype.validate = function() {
    if (!this.title) {
      this.error('title', "Blog title is required");
    }
    if (!this.slug) {
      return this.error('slug', "Blog slug is required");
    }
  };

  Post.prototype.html = function() {
    return this.body;
  };

  Post.prototype.thumbnail = function() {
    var match, regex, _ref, _ref1, _ref2;
    if (this.featuredImage != null) {
      if ((_ref = Meteor.settings) != null ? (_ref1 = _ref["public"]) != null ? (_ref2 = _ref1.blog) != null ? _ref2.useS3 : void 0 : void 0 : void 0) {
        return this.featuredImage;
      } else {
        return Meteor.absoluteUrl() + this.featuredImage;
      }
    } else {
      regex = new RegExp(/img src=[\'"]([^\'"]+)/ig);
      while (match = regex.exec(this.body)) {
        return match[1];
      }
    }
  };

  Post.excerpt = function(html) {
    var i, matches, ret;
    if (Blog.settings.excerptFunction != null) {
      return Blog.settings.excerptFunction(html);
    } else {
      matches = html != null ? html.split(/<\/div>|<\/p>|<\/blockquote>|<br><br>|\\n\\n|\\r\\n\\r\\n/m) : void 0;
      i = 0;
      ret = '';
      while (!ret && (matches != null ? matches[i] : void 0)) {
        ret += matches[i++].replace(/(<([^>]+)>)/ig, ' ').replace(/(\s\.)/, '.').replace('&nbsp;', ' ').trim();
      }
      return ret;
    }
  };

  Post.prototype.authorName = function() {
    var author;
    author = this.author();
    if (author) {
      if (author.profile && author.profile.name) {
        return author.profile.name;
      } else if (author.profile && author.profile.firstName && author.profile.lastName) {
        return "" + author.profile.firstName + " " + author.profile.lastName;
      } else if (author.profile && author.profile.twitter) {
        return "<a href=\"http://twitter.com/" + author.profile.twitter + "\">" + author.profile.twitter + "</a>";
      } else if (author.username) {
        return author.username;
      } else if (author.emails && author.emails[0]) {
        return author.emails[0].address;
      }
    }
    return 'Mystery blogger';
  };

  return Post;

})(Minimongoid);

if (Meteor.isServer) {
  Meteor.methods({
    doesBlogExist: function(slug) {
      check(slug, String);
      return !!Post.first({
        slug: slug
      });
    },
    isBlogAuthorized: function() {
      var post;
      check(arguments[0], Match.OneOf(Object, Number, String, null, void 0));
      if (!Meteor.user()) {
        return false;
      }
      if (!Blog.settings.adminRole && !Blog.settings.authorRole) {
        return true;
      }
      if (Blog.settings.adminRole) {
        if (Blog.settings.adminGroup) {
          if (Roles.userIsInRole(this.userId, Blog.settings.adminRole, Blog.settings.adminGroup)) {
            return true;
          }
        } else if (Roles.userIsInRole(this.userId, Blog.settings.adminRole)) {
          return true;
        }
      }
      if (Blog.settings.authorRole) {
        if (_.isObject(arguments[0])) {
          post = arguments[0];
        } else if (_.isNumber(arguments[0]) || _.isString(arguments[0])) {
          post = Post.first(arguments[0]);
        } else {
          post = null;
        }
        if (Blog.settings.authorGroup) {
          if (Roles.userIsInRole(this.userId, Blog.settings.authorRole, Blog.settings.authorGroup)) {
            if (post) {
              if (Meteor.userId() === post.userId) {
                return true;
              }
            } else {
              return true;
            }
          }
        } else if (Roles.userIsInRole(this.userId, Blog.settings.authorRole)) {
          if (post) {
            if (Meteor.userId() === post.userId) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    }
  });
}

Post._collection.allow({
  insert: function(userId, item) {
    return Meteor.call('isBlogAuthorized', item);
  },
  update: function(userId, item, fields) {
    return Meteor.call('isBlogAuthorized', item);
  },
  remove: function(userId, item) {
    return Meteor.call('isBlogAuthorized', item);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/comment.coffee.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Comment = (function(_super) {
  __extends(Comment, _super);

  function Comment() {
    return Comment.__super__.constructor.apply(this, arguments);
  }

  Comment._collection = new Meteor.Collection('blog_comments');

  Comment.belongs_to = [
    {
      name: 'post',
      identifier: 'postId'
    }
  ];

  return Comment;

})(Minimongoid);

Comment._collection.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc, fields, modifier) {
    return doc.comment.authorId === userId;
  },
  remove: function(userId, doc) {
    return doc.comment.authorId === userId;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/tag.coffee.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Tag = (function(_super) {
  __extends(Tag, _super);

  function Tag() {
    return Tag.__super__.constructor.apply(this, arguments);
  }

  Tag._collection = new Meteor.Collection('blog_tags');

  return Tag;

})(Minimongoid);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/collections/files.coffee.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var s3Config, useS3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;

this.FilesLocal = FileCollection({
  resumable: false,
  baseURL: '/fs',
  http: [
    {
      method: 'get',
      path: '/:id',
      lookup: function(params, query) {
        return {
          _id: new Meteor.Collection.ObjectID(params.id)
        };
      }
    }, {
      method: 'post',
      path: '/:id',
      lookup: function(params, query) {
        return {
          _id: new Meteor.Collection.ObjectID(params.id)
        };
      }
    }
  ]
});

if (Meteor.isServer) {
  FilesLocal.allow({
    insert: function(userId, file) {
      return !!userId;
    },
    remove: function(userId, file) {
      return file.metadata && file.metadata.userId && file.metadata.userId === userId;
    },
    write: function() {
      return true;
    },
    read: function(userId, file) {
      return true;
    }
  });
}

useS3 = (_ref = Meteor.settings) != null ? (_ref1 = _ref["public"]) != null ? (_ref2 = _ref1.blog) != null ? _ref2.useS3 : void 0 : void 0 : void 0;

if (Meteor.isClient && useS3) {
  this.s3ImportStore = new FS.Store.S3("s3Imports");
  this.S3Files = new FS.Collection("s3Imports", {
    stores: [s3ImportStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    },
    onInvalid: function(message) {
      return console.log(message);
    }
  });
  Meteor.subscribe("s3Imports");
}

if (Meteor.isServer && useS3) {
  s3Config = (_ref3 = Meteor.settings) != null ? (_ref4 = _ref3["private"]) != null ? (_ref5 = _ref4.blog) != null ? _ref5.s3Config : void 0 : void 0 : void 0;
  this.s3ImportStore = new FS.Store.S3("s3Imports", {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
    bucket: s3Config.bucket,
    ACL: s3Config.s3ACL,
    maxTries: s3Config.s3MaxTries,
    region: s3Config.region
  });
  this.S3Files = new FS.Collection("s3Imports", {
    stores: [s3ImportStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    },
    onInvalid: function(message) {
      return console.log(message);
    }
  });
  Meteor.publish('s3Imports', function() {
    return S3Files.find();
  });
  S3Files.allow({
    insert: function(userId, file) {
      return userId;
    },
    remove: function(userId, file) {
      return file.metadata && file.metadata.userId && file.metadata.userId === userId;
    },
    update: function() {
      return true;
    },
    download: function(userId, file) {
      return true;
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ryw:blog/router.coffee.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var subs;

subs = new SubsManager({
  cacheLimit: 10,
  expireIn: 5
});

if (Meteor.isClient) {
  Router.onBeforeAction(function() {
    this.notFoundTemplate = Blog.settings.blogNotFoundTemplate ? Blog.settings.blogNotFoundTemplate : 'blogNotFound';
    return Iron.Router.hooks.dataNotFound.call(this);
  }, {
    only: ['blogShow']
  });
}

Router.route('/rss/posts', {
  name: 'rss',
  where: 'server',
  action: function() {
    this.response.write(Meteor.call('serveRSS'));
    return this.response.end();
  }
});

Router.route('/blog', {
  name: 'blogIndex',
  template: 'custom',
  onRun: function() {
    if (!Session.get('postLimit') && Blog.settings.pageSize) {
      Session.set('postLimit', Blog.settings.pageSize);
    }
    return this.next();
  },
  waitOn: function() {
    if (typeof Session !== 'undefined') {
      return [subs.subscribe('posts', Session.get('postLimit')), subs.subscribe('authors')];
    }
  },
  fastRender: true,
  data: function() {
    return {
      posts: Post.where({}, {
        sort: {
          publishedAt: -1
        }
      })
    };
  }
});

Router.route('/blog/tag/:tag', {
  name: 'blogTagged',
  template: 'custom',
  waitOn: function() {
    return [subs.subscribe('taggedPosts', this.params.tag), subs.subscribe('authors')];
  },
  fastRender: true,
  data: function() {
    return {
      posts: Post.where({
        tags: this.params.tag
      }, {
        sort: {
          publishedAt: -1
        }
      })
    };
  }
});

Router.route('/blog/:slug', {
  name: 'blogShow',
  template: 'custom',
  onRun: function() {
    Session.set('slug', this.params.slug);
    return this.next();
  },
  onBeforeAction: function() {
    var pkgFunc, tpl, userFunc, _ref;
    if (Blog.settings.blogShowTemplate) {
      tpl = Blog.settings.blogShowTemplate;
      pkgFunc = Template.blogShowBody.rendered;
      userFunc = Template[tpl].rendered;
      if (userFunc) {
        Template[tpl].rendered = function() {
          pkgFunc.call(this);
          return userFunc.call(this);
        };
      } else {
        Template[tpl].rendered = pkgFunc;
      }
    }
    if (!Blog.settings.publicDrafts && !Post.first().published) {
      Meteor.call('isBlogAuthorized', (function(_this) {
        return function(err, authorized) {
          if (!authorized) {
            return _this.redirect('/blog');
          }
        };
      })(this));
    }
    Session.set('postHasFeaturedImage', ((_ref = Post.first({
      slug: this.params.slug
    }).featuredImage) != null ? _ref.length : void 0) > 0);
    return this.next();
  },
  action: function() {
    if (this.ready()) {
      return this.render();
    }
  },
  waitOn: function() {
    return [Meteor.subscribe('singlePostBySlug', this.params.slug), subs.subscribe('commentsBySlug', this.params.slug), subs.subscribe('authors')];
  },
  data: function() {
    return Post.first({
      slug: this.params.slug
    });
  }
});

Router.route('/admin/blog', {
  name: 'blogAdmin',
  template: 'custom',
  onBeforeAction: function() {
    if (Meteor.loggingIn()) {
      return;
    }
    Deps.autorun(function() {
      if (!Meteor.userId()) {
        return Router.go('blogIndex');
      }
    });
    Meteor.call('isBlogAuthorized', (function(_this) {
      return function(err, authorized) {
        if (!authorized) {
          return _this.redirect('/blog');
        }
      };
    })(this));
    return this.next();
  },
  waitOn: function() {
    return [Meteor.subscribe('postForAdmin'), Meteor.subscribe('authors')];
  }
});

Router.route('/admin/blog/edit/:id', {
  name: 'blogAdminEdit',
  template: 'custom',
  onBeforeAction: function() {
    if (Meteor.loggingIn()) {
      return;
    }
    Deps.autorun(function() {
      if (!Meteor.userId()) {
        return Router.go('blogIndex');
      }
    });
    Meteor.call('isBlogAuthorized', this.params.id, (function(_this) {
      return function(err, authorized) {
        if (!authorized) {
          return _this.redirect('/blog');
        }
      };
    })(this));
    Session.set('postId', this.params.id);
    if (Session.get("postId").length != null) {
      return this.next();
    }
  },
  action: function() {
    if (this.ready()) {
      return this.render();
    }
  },
  waitOn: function() {
    return [Meteor.subscribe('singlePostById', this.params.id), Meteor.subscribe('authors'), Meteor.subscribe('postTags')];
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ryw:blog'] = {};

})();

//# sourceMappingURL=ryw_blog.js.map
