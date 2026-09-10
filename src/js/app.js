// 1. Create the AngularJS application module
var app = angular.module("myApp", []);

// 2. Create the Controller
// - $scope: bridges JavaScript data with the HTML view
// - $http: built-in tool to fetch data from our JSON file or server
app.controller("MainController", function($scope, $http) {

    // Load data from data.json
    $http.get("data.json").then(function(response) {
        // response.data holds the contents of our data.json file
        $scope.profile = response.data.profile;
        $scope.sections = response.data.sections;
    });

});
