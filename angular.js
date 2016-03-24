
<!-- http://runjs.cn/code/h2rmymsw -->


//angular内部指令


//ng-app指令
//ng-app 指令启动一个AngularJS应用，它定义根元素。它会自动初始化或启动加载包含AngularJS应用程序的Web页面。
<div ng-app="">
...
</div>
//ng-init 指令
//ng-init 指令初始化一个AngularJS应用程序的数据。它被用来把值在应用程序中使用的变量。
<div ng-app="" ng-init="countries=[{locale:'en-US',name:'United States'},
                                    {locale:'en-GB',name:'United Kingdom'},
                                    {locale:'en-FR',name:'France'}]">

...
</div>
//ng-model指令
//ng-model指令定义在AngularJS应用中使用的模型/变量。
<div ng-app="">
    ...
    <p>Enter your Name: <input type="text" ng-model="name"></p>
</div>
//ng-repeat 指令
//ng-repeat 指令重复html元素集合中的每个项目。
<div ng-app="">
   <p>List of Countries with locale:</p>
   <ol>
      <li ng-repeat="country in countries">
         {{ 'Country: ' + country.name + ', Locale: ' + country.locale }}
      </li>
   </ol>
</div>

//控制器

<div ng-app="myApp" ng-controller="personCtrl">

    名: <input type="text" ng-model="firstName"><br>
    姓: <input type="text" ng-model="lastName"><br>
    <br>
    姓名: {{fullName()}}

</div>

<script>
    var app = angular.module('myApp', []);
    app.controller('personCtrl', function($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
        $scope.fullName = function() {
            return $scope.firstName + " " + $scope.lastName;
        }
    });
</script>

//factory()让我们通过返回一个包含service方法和数据的对象来定义一个service。在service方法里面我们可以注入services，比如 $http 和 $q等

angular.module('myApp.services')
.factory('User', function($http) { // injectables go here
  var backendUrl = "http://localhost:3000";
  var service = {    // our factory definition
    user: {},
    setName: function(newName) { 
      service.user['name'] = newName; 
    },
    setEmail: function(newEmail) {
      service.user['email'] = newEmail;
    },
    save: function() {
      return $http.post(backendUrl + '/users', {
        user: service.user
      });
    }
  };
  return service;
});

//service()通过构造函数的方式让我们创建service，我们可以使用原型模式替代javaScript原始的对象来定义service。

angular.module('myApp.services')
.service('User', function($http) { // injectables go here
  var self = this; // Save reference
  var backendUrl = "http://localhost:3000";

  this.user = {};

  this.setName = function(newName) {
    self.user['name'] = newName;
  }
  this.setEmail = function(newEmail) {
    self.user['email'] = newEmail;
  },
  save: function() {
    return $http.post(backendUrl + '/users', {
      user: service.user
    });
  }

});

//provider()是创建service最底层的方式，这也是唯一一个可以使用.config()方法配置创建service的方法

angular.module('myApp.services')
.provider('User', function() {

  this.backendUrl = "http://localhost:3000";
  this.setBackendUrl = function(newUrl) {
    if (url) this.backendUrl = newUrl;
  }

  this.$get = function($http) { // injectables go here
    var self = this;
    var service = {
      user: {},
      setName: function(newName) {
        service.user['name'] = newName;
      },
      setEmail: function(newEmail) {
        service.user['email'] = newEmail;
      },
      save: function() {
        return $http.post(self.backendUrl + '/users', {
          user: service.user
        })
      }
    };
    return service;
  }
});