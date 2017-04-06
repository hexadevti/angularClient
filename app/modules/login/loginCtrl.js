/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Controller to handle Login module
    Change Log
    s.no      date    author     description     


 ===========================================================*/

login.controller("loginCtrl", ['$rootScope', '$scope', '$state', '$location', 'loginService', 'Flash','apiService',
function ($rootScope, $scope, $state, $location, loginService, Flash, apiService) {
        var vm = this;

        vm.getUser = {};
        vm.setUser = {};
        vm.signIn = true;

        //access login
        vm.login = function (data) {
            loginService.accessLogin(data).then(function (response) {
                $state.go('app.dashboard'); 
            },
            function(response) {
                Flash.create('danger', response.return, 'large-text');
            });
        };

        //get registration details
        vm.register = function () {
            if (vm.setUser.confirmPassword == vm.setUser.password){
                loginService.registerUser(vm.setUser).then(function (response) {
                $state.go('app.dashboard'); 
            },
            function(response) {
                Flash.create('danger', response.return, 'large-text');
            });
            }
        };

    }]);

