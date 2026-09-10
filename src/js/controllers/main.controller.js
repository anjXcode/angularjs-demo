/**
 * MainController
 * Demonstrates:
 * 1. Scope binding ($scope)
 * 2. Controller-Service communication via Dependency Injection
 * 3. Reactive UI states (loading, errors, selection)
 * 4. Filtering and user interaction functions
 */
(function() {
    'use strict';

    angular.module('angularLearnApp')
        .controller('MainController', ['$scope', 'TopicService', function($scope, TopicService) {
            
            // State variables
            $scope.loading = true;
            $scope.errorMessage = null;
            $scope.profile = {};
            $scope.sections = [];
            $scope.selectedTopic = null;
            $scope.searchTerm = '';

            /**
             * Loads topic curriculum from the backend service
             */
            $scope.loadData = function() {
                $scope.loading = true;
                $scope.errorMessage = null;

                TopicService.fetchData()
                    .then(function(data) {
                        $scope.profile = data.profile;
                        $scope.sections = data.sections;
                    })
                    .catch(function(err) {
                        $scope.errorMessage = 'Could not load topics. Please ensure the server is running.';
                    })
                    .finally(function() {
                        $scope.loading = false;
                    });
            };

            /**
             * Selects a topic to display its detailed lesson and code
             */
            $scope.selectTopic = function(topic) {
                if ($scope.selectedTopic && $scope.selectedTopic.id === topic.id) {
                    $scope.selectedTopic = null; // Toggle off if clicked again
                } else {
                    $scope.selectedTopic = topic;
                }
            };

            /**
             * Closes active detail card
             */
            $scope.closeTopic = function() {
                $scope.selectedTopic = null;
            };

            // Initial load
            $scope.loadData();
        }]);
})();

