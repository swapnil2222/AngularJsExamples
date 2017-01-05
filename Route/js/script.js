var myApp=angular.module("myModule",["ngRoute"])
                 .config(function($routeProvider,$locationProvider){
                 	$routeProvider
                 	.when("/home",{
                 		templateUrl:"templates/home.html",
                 		controller:"homeController"
                 	})
                        .when("/courses",{
                                templateUrl:"templates/courses.html",
                                controller:"coursesController"
                        })
                        .when("/students",{
                                templateUrl:"templates/students.html",
                                controller:"studentsController"
                        })                        
                        .when("/contactus",{
                                templateUrl:"templates/contact_us.html",
                                controller:"contactusController"
                        })
                        .otherwise({
                            redirectTo:"/home"
                        })

                        $locationProvider.html5Mode(true);
                 })
                 .controller("homeController",function($scope){
                 	$scope.message="HomePage";
                 })
                 .controller("coursesController",function($scope){
                        $scope.courses=["C#","JAVA","PHP","AngularJS",".NET"];
                 })
                   .controller("studentsController",function($scope,$http)
                  {
                        function getData(){
                        $http.post("php/display.php").success(function(data)
                        {
                                $scope.msg=data;
                        });     
                        }
                        getData();
                        
                  })
                 .controller("contactusController",function($scope){
                        $scope.contactus_name="Swapnil Renge";
                        $scope.contactus_no="8793739446";
                        $scope.contactus_email="swaprenge2222@gmail.com";
                 })
