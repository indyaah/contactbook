var contactBook = angular.module('contactbookapp', ['ngRoute', 'ngResource']);

contactBook.factory('Contacts', ['$resource',function($resource){
 return $resource('/contacts.json', {},{
 query: { method: 'GET', isArray: true },
 create: { method: 'POST' }
 })
}]);
 
contactBook.factory('Contact', ['$resource', function($resource){
 return $resource('/contacts/:id.json', {}, {
 show: { method: 'GET' },
 update: { method: 'PUT', params: {id: '@id'} },
 delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);

contactBook.controller("addController", ['$scope', '$resource', 'Contacts', '$location', function($scope, $resource, Contacts, $location) {
  $scope.save = function () {
    if ($scope.contactForm.$valid){
      Contacts.create({contact: $scope.contact}, function(){
      $location.path('/');
    }, function(error){
      console.log(error)
    });
  }
 }
}]);

contactBook.controller("listController", ['$scope', '$http', '$resource', 'Contacts', 'Contact', '$location', function($scope, $http, $resource, Contacts, Contact, $location) {
 
  $scope.contacts = Contacts.query();
 
  $scope.deleteContact = function (contactId) {
    if (confirm("Are you sure you want to delete this contact?")){
      Contact.delete({ id: contactId }, function(){
        $scope.contacts = Contacts.query();   // after delete contact get contacts collection.
        $location.path('/');
      });
    }
  };
}]);

contactBook.controller("updateController", ['$scope', '$resource', 'Contact', '$location', '$routeParams', function($scope, $resource, Contact, $location, $routeParams) {
   $scope.contact = Contact.get({id: $routeParams.id})
   $scope.update = function(){
     if ($scope.contactForm.$valid){
       Contact.update($scope.contact,function(){
         $location.path('/');
       }, function(error) {
         console.log(error)
      });
     }
   };
}]);

contactBook.config([
 '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
 $routeProvider.when('/contacts',{
    templateUrl: '/templates/contacts/index.html',
    controller: 'listController'
 });
 $routeProvider.when('/contacts/new', {
   templateUrl: '/templates/contacts/new.html',
   controller: 'addController'
 });
 $routeProvider.when('/contacts/:id/edit', {
   templateUrl: '/templates/contacts/edit.html',
   controller: "updateController"
 });
 $routeProvider.otherwise({
   redirectTo: '/contacts'
 });
 }
]);