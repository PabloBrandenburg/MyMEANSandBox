myApp.controller('HomeCtrl', ['$scope','$route', '$rootScope', '$location',' Upload',
  function($scope, $route, $rootScope, $location, $upload) {
  
  var _this = this;


  
}]);// end of HomeCrtl controller

myApp.controller('UploadCtrl', ['$scope','$route', '$rootScope', '$location', 'Upload',
  function($scope, $route, $rootScope, $location, $upload) {
  
  var _this = this;

//image upload section
  var d = new Date();
  $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
  _this.temp_images = [];

  $scope.uploadFiles = function(files){
    $scope.files = files;
    if (!$scope.files) return;
    angular.forEach(files, function(file){
      if (file && !file.$error) {
        file.upload = $upload.upload({
           url  : "/uploads/imageUpload",
           method: 'POST',
            data : { 
            user_id : $scope.userid,
            filename: file.name,
            file: file
           }
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
        }).success(function (data, status, headers, config) {
          _this.temp_images.push({ source : data.result });
          file.status = "Upload Successful.";
        }).error(function (data, status, headers, config) {
          file.status = "Error Uploading to server.";
        });
      }
    });
  };//end of image upload section 
  
  
}]);// end of UploadCtrl controller

myApp.controller('ImageCtrl', ['$scope','$route', '$rootScope', '$location', 'Upload',
  function($scope, $route, $rootScope, $location, $upload) {
  
  var _this = this;


  
}]);// end of ImageCtrl controller

myApp.controller('gmapCtrl', ['$scope','$route', '$rootScope', '$location','NgMap','$http',
  function($scope, $route, $rootScope, $location, NgMap, $http) {
  
  var _this = this;
  
  var vm = this;
    vm.cities = {
      chicago: {population:2714856, position: [41.878113, -87.629798]},
      newyork: {population:8405837, position: [40.714352, -74.005973]},
      losangeles: {population:3857799, position: [34.052234, -118.243684]},
      vancouver: {population:603502, position: [49.25, -123.1]},
    }
    
    vm.getRadius = function(num) {
      return Math.sqrt(num) * 100;
    }
    
   $http.get('./assets/location_sample.json')
    .then(function(res){
         vm.address =res.data;
         
    },function(res){
        vm.address_error="failure";
    });
    
  
  /*

    var locations = [
        ['Location 1 Name', 'New York, NY', 'Location 1 URL'],
        ['Location 2 Name', 'Newark, NJ', 'Location 2 URL'],
        ['Location 3 Name', 'Philadelphia, PA', 'Location 3 URL']
    ];

    var geocoder;
    var map;
    var bounds = new google.maps.LatLngBounds();

    function initialize() {
        map = new google.maps.Map(
        document.getElementById("MapContainer"), {
            center: new google.maps.LatLng(37.4419, -122.1419),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        geocoder = new google.maps.Geocoder();

        for (i = 0; i < locations.length; i++) {


            geocodeAddress(locations, i);
        }
    }
    google.maps.event.addDomListener(window, "load", initialize);

    function geocodeAddress(locations, i) {
        var title = locations[i][0];
        var address = locations[i][1];
        var url = locations[i][2];
        geocoder.geocode({
            'address': locations[i][1]
        },

        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                    map: map,
                    position: results[0].geometry.location,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    address: address,
                    url: url
                })
                infoWindow(marker, map, title, address, url);
                bounds.extend(marker.getPosition());
                map.fitBounds(bounds);
            } else {
                alert("geocode of " + address + " failed:" + status);
            }
        });
    }

    function infoWindow(marker, map, title, address, url) {
        google.maps.event.addListener(marker, 'click', function () {
            var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
            iw = new google.maps.InfoWindow({
                content: html,
                maxWidth: 350
            });
            iw.open(map, marker);
        });
    }

    function createMarker(results) {
        var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
            map: map,
            position: results[0].geometry.location,
            title: title,
            animation: google.maps.Animation.DROP,
            address: address,
            url: url
        })
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
        infoWindow(marker, map, title, address, url);
        return marker;
    }

*/
  
}]);// end of gmapCtrl controller 