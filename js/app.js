var app = angular.module("app", ["firebase"]);
// inject $firebaseArray into our controller
app.controller("LineCtrl", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    var messagesRef = new Firebase("https://arduinosound.firebaseio.com/sensorvalue2");
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.readings = $firebaseArray(messagesRef);
    
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(messagesRef.limitToLast(25));
  }
]);
