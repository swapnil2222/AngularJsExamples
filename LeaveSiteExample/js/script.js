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
                                controller:"studentsController as studCtrl"
                        })
                        .when("/students/:id",{
                                templateUrl:"templates/studentDetail.html",
                                controller:"studentDetailController"
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
                 //displays list of students
                   .controller("studentsController",function($http,$scope,$log)
                  {
                    var vm=this;
                        function getData(){
                        $http.post("php/display.php").success(function(data)
                        {
                                vm.msg=data;
                        });     
                        }
                        getData();
                        //leave this page code

                        $scope.$on("$routeChangeStart",function(event,next,current){
                            if(!confirm("Do you want to leave this page")){
                                event.preventDefault();
                            }
                        })
                        
                            $scope.$on("$routeChangeStart",function(event,next,current){
                                $log.debug("$routeChangeStart event fired");
                                $log.debug(event);
                                $log.debug(next);
                                $log.debug(current);
                            });
                            $scope.$on("$locationChangeStart",function(event,next,current){
                                $log.debug("$locationChangeStart event fired");
                                $log.debug(event);
                                $log.debug(next);
                                $log.debug(current);

                            });

                         
                  })
                 .controller("contactusController",function($scope){
                        $scope.contactus_name="Swapnil Renge";
                        $scope.contactus_no="8793739446";
                        $scope.contactus_email="swaprenge2222@gmail.com";
                 })
                .controller("studentDetailController",function($http,$scope,$routeParams){

                        function getDetail(){
                            $http({
                                url:"php/studentDetail.php",
                                data:{id:$routeParams.id},
                                method:"POST"
                            }).success(function(response){
                                $scope.students=response[0];
                            });
                        }
                        getDetail();

                })
