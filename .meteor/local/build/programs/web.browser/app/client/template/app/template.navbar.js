(function(){
Template.__checkName("navbar");
Template["navbar"] = new Template("Template.navbar", (function() {
  var view = this;
  return HTML.DIV({
    "class": "navbar navbar-inverse"
  }, "\n        ", HTML.DIV({
    "class": "container"
  }, "\n            ", HTML.Raw('<div class="navbar-header">\n                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                </button>\n                <a class="navbar-brand" href="/">Social Network</a>\n            </div>'), "\n\n\n            ", HTML.DIV({
    "class": "navbar-collapse collapse navbar-responsive-collapse"
  }, "\n                ", HTML.UL({
    "class": "nav navbar-nav navbar-right"
  }, "\n                  ", Spacebars.include(view.lookupTemplate("accountButtons")), "\n                "), "\n            "), "\n        "), "\n    ");
}));

})();
