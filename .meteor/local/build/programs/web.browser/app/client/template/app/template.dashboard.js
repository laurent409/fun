(function(){
Template.__checkName("dashboard");
Template["dashboard"] = new Template("Template.dashboard", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n      ", HTML.H1("Welcome back ", Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  })), "\n    ");
}));

})();
