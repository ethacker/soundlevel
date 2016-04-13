angular.module("app", ["chart.js"]) // here i couldn't understand about chart.js fil
  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }])
  .controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.labels = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00","7:00","8:00","9:00","10:00","11:00",
"12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","24:00"];
  $scope.series = ['Sound Levels'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40,28, 48, 40, 19, 86, 27, 90, 45, 46, 47, 59, 60, 49, 140, 30, 25, 50]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
//  $timeout(function () {
//    $scope.data = [
//      [28, 48, 40, 19, 86, 27, 90],
//      [65, 59, 80, 81, 56, 55, 40]
//    ];
//  }, 3000);
}]);
