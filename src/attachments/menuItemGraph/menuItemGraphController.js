
var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);


angular.module('mealAppeal', 
               ['application.filters', 
                'application.services', 
                'application.directives', 
                'application.constants', 
                'application.controllers']);

Application.Controllers.controller('menuItemGraphController' , ['$scope', '_', function($scope, _){
  console.log("menuItemGraphController");
  function random_menu_item(){
    function take_random(list,amount){
      var take = (amount || _.size(list));
      var take_rand = _.random(1,take);
      return _.chain(list).shuffle().first(take_rand).value();
    }
    function pick_random(list){
      return _.first(take_random(list,1));
    }
    function random_categories(){
      var categories = [
        {
          name:'vegan',
          img:"images/legend-vegan.png"
        },
        {
          name:'local',
          img:"images/legend-local.png"
        },
        {
          name:'light',
          img:"images/legend-light-meals.png"
        },
        {
          name:'organic',
          img:"images/legend-organic.png"
        }];
      return take_random(categories); 
    }
    function random_place(){
      var places = [
        "Mayette's Fine Int'l. Cuisine",
        "Sneaky Dee's",
        "The Keg Steakhouse & Bar",
        "Mercatto"
      ];
      return pick_random(places);
    }
    function random_title(){
      var titles = [
        "Kachin Pounded Beef with Herbs",
        "Bacon Cheese Burger w/ fries or salad",
        "Sirloin with Jumbo Shrimp & Scallop",
        "Sticky Balsamic Lamb Ribs"
      ];
      return pick_random(titles);
    }
    function random_image(){
      var images = [
        "food/sneeky_dee.jpg",
        "food/steak.jpg",
        "food/keg.jpg",
        "food/sample.jpg",
        "food/featured.jpg"
      ];
      return pick_random(images);
    }
    var menuItem = {
      img:random_image()
      ,title:random_title()
      ,place:random_place()
      ,categories:random_categories()
    }
    return menuItem;
  }
  var allMenuItems = _.times(30, random_menu_item);
  console.log("allMenuIteams", allMenuItems);
  $scope.menuItemList = allMenuItems;
}]);

Application.Constants
  .constant('_', _)
  .constant('jQuery',$);

Application.Directives.directive('masonry', function ($parse) {
  return {
    restrict: 'AC',
    link: function (scope, elem, attrs) {
      elem.masonry({ itemSelector: '.masonry-item', columnWidth: $parse(attrs.masonry)(scope) });
    }
  };        
});

Application.Directives.directive('masonryItem', function ($compile) {
  return {
    restrict: 'AC',
    link: function (scope, elem, attrs) {
      elem.html($compile(elem.html())(scope));
      console.log(elem.html());
      elem.imagesLoaded(function () {      
        console.log(elem.html());
        elem.parents('.masonry').masonry('reload');
      });
    }
  };        
});
