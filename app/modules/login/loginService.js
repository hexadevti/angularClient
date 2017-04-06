﻿/*==========================================================
   Author      : Ranjithprabhu K
   Date Created: 24 Dec 2015
   Description : To handle the service for Login module
   
   Change Log
   s.no      date    author     description     
===========================================================*/


login.service('loginService', ['$http', '$q', '$cookieStore', 'Flash', 'apiService',  function ($http, $q, $cookieStore ,Flash, apiService) {

    var loginService = {};


    //service to communicate with users model to verify login credentials
    var accessLogin = function (parameters) {
        var deferred = $q.defer();
        apiService.post("auth", parameters).then(function (response) {
            if (response) {
                if (response.success) {
                    $cookieStore.put('token', response.return);
                    deferred.resolve(response);
                }
                else {
                    deferred.reject(response);
                }

            }
            else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    //service to communicate with users to include a new user
    var registerUser = function (parameters) {
        var deferred = $q.defer();
        apiService.create("users", parameters).then(function (response) {
            if (response)
                if (response.success) {
                    deferred.resolve(response);
                }
                else {
                    deferred.reject(response);
                }
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    loginService.accessLogin = accessLogin;
    loginService.registerUser = registerUser;

    return loginService;

}]);
