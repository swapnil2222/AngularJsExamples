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
 				 		templateUrl:"templates/contactus.html",
 				 		controller:"contactusController"
 				 	})
 				 	.when("/students/:id",{
 				 		templateUrl:"templates/studentDetail.html",
 				 		controller:"studentDetailController"
 				 	})
 				 	$locationProvider.html5Mode(true);
 				 })
 				 .controller("homeController",function($scope){
 				 	$scope.message="HomePage"
 				 })
 				 .controller("coursesController",function($scope){
 				 	$scope.courses=["C#","JAVA",".NET","PHP","MYSQL"];
 				 })
 				 .controller("studentsController",function($scope,$http){
 				 		function getData(){
 				 			$http.post("php/display.php")
 				 			.success(function(response){
 				 				$scope.students=response;
 				 			})
 				 		}
 				 		getData();
 				 })
 				 .controller("contactusController",function($scope){
 				 	$scope.name="Swapnil Renge";
 				 	$scope.no="8793739446";
 				 	$scope.email="swaprenge2222@gmail.com";
 				 })
 				 .controller("studentDetailController",function($scope,$http,$routeParams){
 				 		function getDetail(){
 				 			$http({
 				 		url:"php/studentDetail.php",
 				 		//params:{id:$routeParams.id},
            data:{id:$routeParams.id},
            method:"POST"
 				 	}).success(function(response){
 				 		$scope.students=response[0];
          //$scope.students=response.data;
 				 	});
 				 		}
 				 		getDetail();
 				 		
 				 })