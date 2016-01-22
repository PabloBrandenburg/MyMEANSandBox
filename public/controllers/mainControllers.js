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