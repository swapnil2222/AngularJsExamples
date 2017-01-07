var myApp=angular.module("myModule",["ui.router"])
                 .config(function($stateProvider){
                 	$stateProvider
                 	.state("home",{
                    url:"/home",
                 		templateUrl:"templates/home.html",
                 		controller:"homeController"
                 	})
                        .state("courses",{
                                url:"/courses",
                                templateUrl:"templates/courses.html",
                                controller:"coursesController"
                        })
                        .state("students",{
                                url:"/students",
                                templateUrl:"templates/students.html",
                                controller:"studentsController as studCtrl"
                        })
                        .state("studentDetail",{
                                url:"/students/:id",
                                templateUrl:"templates/studentDetail.html",
                                controller:"studentDetailController"
                        })  
                        //route for passing name as parameter for searching student by name                      
               /*         .when("/studentSearch/:name?",{
                                templateUrl:"templates/studentSearch.html",
                                controller:"studentSearchController as studentSearchCtrl"
                        })                        
                 */                               
                        .state("contactus",{
                                url:"/contactus",
                                templateUrl:"templates/contact_us.html",
                                controller:"contactusController"
                        })
                       /* .otherwise({
                            redirectTo:"/home"
                        })*/

                   //     $locationProvider.html5Mode(true);
                 })
                 .controller("homeController",function($scope){
                 	$scope.message="HomePage";
                 })
                 .controller("coursesController",function($scope){
                        $scope.courses=["C#","JAVA","PHP","AngularJS",".NET"];
                 })
                 //displays list of students
                   .controller("studentsController",function($http,$scope,$log,$location)
                  {
                    var vm=this;
                       
                      //add studentSearch function
                      //searches student by name 
                      vm.studentSearch=function(){
                        if(vm.name){
                          $location.url("/studentSearch/" +vm.name);
                        }
                        else
                          $location.url("/studentSearch");
                      }

                        function getData(){
                        $http.post("php/display.php").success(function(data)
                        {
                                vm.msg=data;
                        });     
                        }
                        getData();
                        //leave this page code
                        /*
                        $scope.$on("$routeChangeStart",function(event,next,current){
                            if(!confirm("Do you want to leave this page")){
                                event.preventDefault();
                            }
                        })
                        */
                        
                          /*  $scope.$on("$routeChangeStart",function(event,next,current){
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
                          */
                         
                  })
                 .controller("contactusController",function($scope){
                        $scope.contactus_name="Swapnil Renge";
                        $scope.contactus_no="8793739446";
                        $scope.contactus_email="swaprenge2222@gmail.com";
                 })
                .controller("studentDetailController",function($http,$scope,$stateParams){

                        function getDetail(){
                            $http({
                                url:"php/studentDetail.php",
                                data:{id:$stateParams.id},
                                method:"POST"
                            }).success(function(response){
                                $scope.students=response[0];
                            });
                        }
                        getDetail();

                })
                
                //controller for searching student by name
/*                .controller("studentSearchController",function($http,$routeParams){
                    var vm=this;
                    if($routeParams.name){
                          $http({
                                url:"php/studentSearch.php",
                                data:{name:$routeParams.name},
                                method:"POST"
                            }).success(function(response){
                                vm.students=response;
                            });

                    }
                    else{
                       $http.post("php/display.php").success(function(data)
                        {
                                vm.students=data;
                        });
                    }
                        

                })

*/