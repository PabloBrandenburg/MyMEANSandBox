//Routes for SandBox
myApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : '../pages/home.html',
        controller : "HomeCtrl",
        controllerAs: 'home'
      })

      .when('/uploadImage', {
        templateUrl : '../pages/uploadForm.html',
        controller : "UploadCtrl",
        controllerAs: 'uploadC'
      })

      .when('/getImage', {
        templateUrl : '../pages/imagePage.html',
        controller : "ImageCtrl",
        controllerAs: 'imgC'
      })
  });
