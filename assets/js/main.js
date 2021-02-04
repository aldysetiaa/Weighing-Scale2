/**
 * Created by Renzo on 08/03/2017.
 */
var app = angular.module('myApp' );

// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyC9eEzn_dxuxJWOw_WMTuP3yNWaMQCpYv4",
//     authDomain: "my-website-bf8d6.firebaseapp.com",
//     databaseURL: "https://my-website-bf8d6.firebaseio.com",
//     storageBucket: "my-website-bf8d6.appspot.com",
//     messagingSenderId: "220805098203"
// };


// firebase.initializeApp(config);

app.controller('mainCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$timeout', '$rootScope' , function($scope, $firebaseObject, $firebaseArray, $timeout, $rootScope) {

    $scope.info = {}
    $scope.info.current_year = new Date().getFullYear();
    $scope.posts = []
    var refPosts = firebase.database().ref().child("posts")
    var temp = $firebaseArray(refPosts.limitToLast(6));
    temp.$loaded()
        .then(function() {
            temp.reverse()
            angular.forEach(temp, function (post) {
                var localeDate = post.date
                var extension = ".png";
                if (post.image_url.includes(".jpg")){
                    extension = ".jpg";
                }else if (post.image_url.includes(".jpeg")){
                    extension = ".jpeg";
                }
                var imageUrl = "https://firebasestorage.googleapis.com/v0/b/my-website-bf8d6.appspot.com/o/blog_images%2F"+localeDate+extension+"?alt=media"
                post.image = imageUrl;
                post.date = moment(localeDate, 'YYYYMMDDHHmm').locale('en').format('DD MMMM YYYY')
            })

            $scope.posts = []
            for (var i = 0; i < temp.length; i++) {
                $scope.posts.push(temp[i])
            }
            // var old_html = $("#slick").html();
            // $("#slick").slick('slick');
            $timeout(function() {
                $("#slick").slick('unslick')
                $("#slick").slick({
                    "slidesToShow": 2,
                    "slidesToScroll": 2,
                    "dots": true,
                    "infinite": false,

                    "responsive": [
                        {
                            "breakpoint": 991,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2
                            }
                        },
                        {
                            "breakpoint": 575,
                            "settings": {
                                "slidesToShow": 1,
                                "slidesToScroll": 1
                            }
                        }
                    ]
                });
            }, 10);

        });
    $("#role").typed({
        strings: ["Software Engineer", "Mobile Developer", "Mobile Designer", "Web Developer", "Digital Designer"],
        typeSpeed: 100,
        backDelay: 2000,
        loop: true,
        loopCount: false,
        cursorChar: "|",
    });
}]);

app.controller('blogPageCtrl', ['$scope','$firebaseArray', function ($scope, $firebaseArray) {
        $scope.posts = []
        $scope.sliderPosts = []
        var allPosts = []
        var myFirebaseRef = firebase.database().ref().child("posts")
        var temp = $firebaseArray(myFirebaseRef);
        var loaded = false
        temp.$loaded()
            .then(function() {
                temp.reverse()
                loaded = true
                angular.forEach(temp, function (post) {
                    var localeDate = post.date
                    var extension = ".png";
                    if (post.image_url.includes(".jpg")){
                        extension = ".jpg";
                    }else if (post.image_url.includes(".jpeg")){
                        extension = ".jpeg";
                    }
                    var imageUrl = "https://firebasestorage.googleapis.com/v0/b/my-website-bf8d6.appspot.com/o/blog_images%2F"+localeDate+extension+"?alt=media"
                    post.image = imageUrl;
                    post.date = moment(localeDate, 'YYYYMMDDHHmm').locale('en').format('DD MMMM YYYY')
                })
                $scope.posts = []
                var maxNumber = 12
                if (temp.length<12){
                    maxNumber=temp.length
                }
                for (var i=0; i<maxNumber; i++){
                    $scope.posts.push(temp[i])
                }
                for (var i=0; i<6; i++){
                    $scope.sliderPosts.push(temp[i])
                }
                for (var i=0; i<temp.length; i++){
                    allPosts.push(temp[i])
                }
                pag.simplePaginator('setTotalPages', Math.ceil(temp.length/12));
                temp.$destroy()
            });


        var pag = $('#paginator').simplePaginator({

            // the number of total pages
            totalPages: 7,
            // maximum of visible buttons
            maxButtonsVisible: 3,
            // page selected
            currentPage: 1,
            // text labels for buttons
            nextLabel: '>',
            prevLabel: '<',
            // specify if the paginator click in the currentButton
            clickCurrentPage: true,
            // called when a page is changed.
            pageChange: function(page) {
                if (loaded){
                    $scope.$apply(function () {
                        $scope.posts = []
                        for (var i=(page-1)*12; i<page*12; i++){
                            if (i<allPosts.length){
                                $scope.posts.push(allPosts[i])
                            }
                        }
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    });
                }
            }

        });
    }
]);
