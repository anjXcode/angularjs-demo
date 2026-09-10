/**
 * TopicService
 * Demonstrates:
 * 1. AngularJS Factory / Service creation
 * 2. Dependency Injection ($http, $q)
 * 3. Asynchronous Data Fetching & Promises
 */
(function() {
    'use strict';

    angular.module('angularLearnApp')
        .factory('TopicService', ['$http', '$q', function($http, $q) {
            
            // Local fallback data if API or server is unreachable
            var fallbackData = {
                profile: {
                    name: "AngularJS Essentials",
                    role: "Interactive Concept Guide (Offline Mode)",
                    bio: "Exploring AngularJS core concepts: two-way data binding, dependency injection, directives, and $http data fetching."
                },
                sections: [
                    {
                        group: "2026 Core Concepts",
                        items: [
                            {
                                id: "two-way-binding",
                                date: "Feb 10",
                                title: "Two-Way Data Binding & Scope",
                                tag: "Basics",
                                description: "AngularJS automatically synchronizes data between the Model ($scope) and the View (DOM).",
                                code: "<input type=\"text\" ng-model=\"username\">\n<p>Hello, {{ username }}!</p>"
                            },
                            {
                                id: "http-service",
                                date: "Feb 05",
                                title: "Data Fetching with $http",
                                tag: "Networking",
                                description: "The $http service enables communicating with HTTP servers using promises.",
                                code: "$http.get('/api/data').then(res => $scope.data = res.data);"
                            }
                        ]
                    }
                ]
            };

            return {
                /**
                 * Fetches curriculum data from the Python server API endpoint
                 * @returns {Promise}
                 */
                fetchData: function() {
                    return $http.get('/api/data')
                        .then(function(response) {
                            return response.data;
                        })
                        .catch(function(error) {
                            console.warn('API fetch failed, attempting ../db.json fallback...', error);
                            // Secondary attempt: load db.json directly for static file serving
                            return $http.get('../db.json')
                                .then(function(res) {
                                    return res.data;
                                })
                                .catch(function() {
                                    console.info('Using embedded fallback data.');
                                    return fallbackData;
                                });
                        });
                }
            };
        }]);
})();

