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
                        .when("/contactus",{
                                templateUrl:"templates/contact_us.html",
                                controller:"contactusController"
                        })
                        .when("/students/:id",{
                                templateUrl:"templates/studentDetail.html",
                                controller:"studentDetailController"
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
                   .controller("studentsController",function($http,$route,$scope)
                  {
                    var vm=this;
                    //function to reload the data from database without refreshing entire project
                        vm.reloadData=function(){
                            $route.reload();
                        }
                        //code to leave this site

                            $scope.$on("$routeChangeStart",function(event,next,current){
                                if(!confirm("Are you want to leave")){
                                    event.preventDefault(); 
                                }    
                            })
                            //to display student name in students.html
                        function getData(){
                        $http.post("php/display.php").success(function(data)
                        {
                                vm.msg=data;
                        });     
                        }
                        getData();
                        
                  })
                 .controller("contactusController",function($scope){
                        $scope.contactus_name="Swapnil Renge";
                        $scope.contactus_no="8793739446";
                        $scope.contactus_email="swaprenge2222@gmail.com";
                 })
                
                //to display studentDetails in studentDetail.html
                .controller("studentDetailController",function($scope,$http,$routeParams){
                        function getDetail(){
                            $http({
                        url:"php/studentDetail.php",
                        //params:{id:$routeParams.id},
            data:{id:$routeParams.id},          //use data instead of params while using post request
            method:"POST"
                    }).success(function(response){
                        $scope.students=response[0];
          //$scope.students=response.data;
                    });
                        }
                        getDetail();
                        
                 })