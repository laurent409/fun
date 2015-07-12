(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("navbar")), "\n    ", HTML.DIV({
    "class": "wrapper"
  }, "\n        ", HTML.DIV({
    "class": "box"
  }, "\n            ", HTML.DIV({
    id: "main"
  }, "\n                ", HTML.DIV("\n                  ", Spacebars.include(view.lookupTemplate("yield")), "\n                "), "\n            "), "\n        "), "\n    "), "\n    ", Spacebars.include(view.lookupTemplate("sticky")) ];
}));

})();
