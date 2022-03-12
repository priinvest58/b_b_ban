var betApp = angular.module('betApp', ['angularMoment']);

betApp.run([
    '$rootScope',
    '$window',
    function($rootScope, $window) {
        var firebaseConfig = {
            apiKey: "AIzaSyDQ-XsLfNOsUt1n2gxarhSGoKeYv0PpU1A",
            authDomain: "pt-service.firebaseapp.com",
            projectId: "pt-service",
            storageBucket: "pt-service.appspot.com",
            messagingSenderId: "273176508220",
            appId: "1:273176508220:web:6a5a88626e886c7e20d039",
            measurementId: "G-NXKBCSSX9R"
        };
        // Initialize Firebase
        try {
            $window.firebase.initializeApp(firebaseConfig);
            $window.firebase.analytics();
            $rootScope.db = firebase.firestore();
            $rootScope.storage = firebase.storage();
        } catch (error) {}
    },
]);

betApp.controller('MainController', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {

    var status = $window.localStorage.getItem("hasLogin");
    $scope.user = {

    };

    if (status === "1") {
        $scope.user = JSON.parse($window.localStorage.getItem("user"));
        console.log($scope.user);

    } else {
        $window.location.href = "index.html";
    }











    ///  Entry form
});
betApp.controller('LoginController', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {

    $window.localStorage.setItem("hasLogin", "0");

    $scope.user = {
        username: "",
        password: "",
    };

    $scope.result = [];



    $scope.login = function() {


        try {
            $rootScope.db.collection('accounts').where("username", "==", $scope.user.username).where("password", "==", $scope.user.password).get().then(result => {
                const data = result.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                $scope.result = data[0];

                if (data.length > 0) {
                    console.log("Correct");
                    $window.localStorage.setItem("hasLogin", "1");
                    $window.localStorage.setItem("user", JSON.stringify($scope.result));
                    $window.location.href = "a-dashboard.html";
                } else {
                    console.log("Error");
                    alert("Invalid username or password!");
                }

            });
        } catch (error) {

        }

    }






    ///  Entry form
});