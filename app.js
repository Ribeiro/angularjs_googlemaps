var app = angular.module('angular-maps', ['google-maps']);

app.controller('MainCtrl', function($scope, $document) {
  // map object
  $scope.map = {
    control: {},
    center: {
        latitude: -3.791356871611455,
        longitude:  -38.519200850000004
    },
    zoom: 14
  };
  
  // marker object
  $scope.marker = {
    center: {
        latitude: -3.791356871611455,
        longitude: -38.519200850000004
    }
  }
  
  // instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  
  // directions object -- with defaults
  $scope.directions = {
    origin: "Fortaleza,CE",
    destination: "São Paulo, SP",
    showList: false
  }
  
  // get directions using google maps api
  $scope.getDirections = function () {
    var request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
         alert('Google route unsuccesfull!');
      }
    });
  }
});
