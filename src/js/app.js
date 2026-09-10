// 1. Create the AngularJS application module
var app = angular.module("myApp", []);

// 2. Create the Controller
// - $scope: connects our JavaScript variables to the HTML
// - $http: loads data from data.json or a server
app.controller("MainController", function($scope, $http) {

    // Initial data: ensures the page works even if double-clicked directly in a browser
    var defaultData = {
        profile: {
            name: "Alex Morgan",
            role: "Biotech Student",
            bio: "Exploring biology, tech, and simple web development. Writing about learning notes, lab experiments, and basic code."
        },
        sections: [
            {
                year: "2026",
                items: [
                    {
                        date: "Oct 9",
                        title: "Intro to AngularJS: What is $scope?",
                        content: "$scope is like a bridge or glue between your HTML and your JavaScript controller. Any variable attached to $scope in JavaScript can be immediately displayed in HTML using {{ variable }}."
                    },
                    {
                        date: "Oct 8",
                        title: "Displaying Lists with ng-repeat",
                        content: "ng-repeat works just like a 'for loop' in HTML. It repeats an HTML element for every single item inside an array, making it easy to display lists of data."
                    },
                    {
                        date: "Oct 7",
                        title: "Fetching JSON data using $http.get()",
                        content: "$http.get() sends a request to load a JSON file or API from the server. Once the response arrives, we store it into $scope to display it on the screen."
                    },
                    {
                        date: "Oct 6",
                        title: "Two-Way Data Binding with ng-model",
                        content: "ng-model connects an input field directly to a variable. If you type in the text box, the variable updates in real-time without reloading the page."
                    },
                    {
                        date: "Oct 5",
                        title: "Using Filters like uppercase and lowercase",
                        content: "Filters format text for display without altering the original data. For example, writing {{ 'hello' | uppercase }} shows HELLO on the page."
                    }
                ]
            },
            {
                year: "2025",
                items: [
                    {
                        date: "Oct 4",
                        title: "DNA Sequence Data in JSON format",
                        content: "In bioinformatics, JSON is often used to structure gene information, organism names, and DNA base sequences (A, T, C, G) so web apps can read them easily."
                    },
                    {
                        date: "Oct 3",
                        title: "Simple HTML and CSS for Lab Reports",
                        content: "HTML provides the skeleton of your webpage (headings, tables, paragraphs), while CSS controls the visual layout (colors, margins, and typography)."
                    },
                    {
                        date: "Oct 2",
                        title: "Running a Local Python Web Server",
                        content: "Modern browsers block loading local JSON files directly from file:/// paths for security. Running a local server provides a proper http:// address."
                    }
                ]
            }
        ]
    };

    // Put initial data on $scope so it displays right away
    $scope.profile = defaultData.profile;
    $scope.sections = defaultData.sections;

    // Fetch live data from data.json using $http
    $http.get("data.json").then(function(response) {
        $scope.profile = response.data.profile;
        $scope.sections = response.data.sections;
    }).catch(function(err) {
        // If opened directly via file://, browser blocks $http. Default data remains visible!
        console.log("Using initial data (run local server to test live $http fetching).");
    });

});
