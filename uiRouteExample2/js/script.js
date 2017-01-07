var App=angular.module("myModule",["ui.router"])
				.config(function($stateProvider,$urlMatcherFactoryProvider,$urlRouterProvider){
					$urlRouterProvider.otherwise("/home");
					$urlMatcherFactoryProvider.caseInsensitive(true);
					$stateProvider
					.state("home",{
						url:"/home",
						templateUrl:"templates/home.html",
						controller:"homeController as homeCtrl"
						
					})
					.state("courses",{
						url:"/courses",
						templateUrl:"templates/courses.html",
						controller:"coursesController as coursesCtrl"
						
					})

					//displays list of students
					.state("students",{
						url:"/students",
						templateUrl:"templates/students.html",
						controller:"studentsController as studCtrl"
					})
					//used to show student by id
					.state("studentDetails",{
						url:"/students/:id",
						templateUrl:"templates/studentDetail.html",
						controller:"studentDetailController as studDetailCtrl"
					})
					.state("studentDetailsByName",{
						url:"/searchStudent/:name",
						templateUrl:"templates/studentDetailByName.html",
						controller:"studentDetailByNameController as studDetailNameCtrl"
					})
					
					/*
					//default state if no other url found
					$stateProvider.state('notFound', {
					  	url: '{path:.*}',
					    templateUrl: '/sampleAngular/UiRouteExample2/templates/home.html',
					    controller:'homeController as homeCtrl'
					})
					*/
										
				})
				//home controller to set HomePage msg
				.controller("homeController",function(){
						var vm=this;
						vm.message="HomePage";

				})
				//coursescontroller to show courses
				.controller("coursesController",function(){
					
					this.courses=["C#",".NET","Java","AngularJs"];
				})
				//display students from database

				.controller("studentsController",function($http,$state){

					var vm=this;
						vm.searchStudent=function(){
							$state.go("studentDetailsByName",{name:vm.name});
						}
					function getStudents(){
						$http.post("php/display_students.php").success(function(response){
							vm.students=response;
						})
					}
					getStudents();
				})
				//get student details by id
				.controller("studentDetailController",function($http,$stateParams){
					var vm=this;
					$http({
						method:"POST",
						url:"php/getStudentDetail.php",
						data:{id:$stateParams.id}
					}).success(function(response){
						vm.students=response[0];
					})
				})

				.controller("studentDetailByNameController",function($http,$stateParams){
					var vm=this;
					if($stateParams.name){
						$http({
							method:"POST",
							url:"php/searchStudentByName.php",
							data:{name:$stateParams.name}
						}).success(function(response){
								vm.students=response;
						});
					}
					else{
						$http.post("php/display_students.php").success(function(response){
							vm.students=response;
						})

					}
				})
