/* -----------------------------------------------------------------------------

Skill - Modern & Creative HTML5 Template

File:           JS Core
Version:        1.1
Last change:    22/11/16
Author:         Suelo

-------------------------------------------------------------------------------- */

"use strict";

var $body = $('body'),
    $header = $('#header'),
    $mobileNavToggle = $('#mobile-nav-toggle'),
    $pageLoader = $('#page-loader'),
    $calendar = $('.calendar');

var Skill = {
    init: function() {
        this.Basic.init();
        this.Component.init();
    },
    Basic: {
        init: function() {
            this.mobileDetector();
            this.backgrounds();
            this.masonry();
            this.map();
            this.navigation();
            this.filter();
            this.stickable();
        },
        mobileDetector: function () {
            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
                }
            };

            window.trueMobile = isMobile.any();
        },
        backgrounds: function() {
            // Image
            $('.bg-image').each(function(){
                var src = $(this).children('img').attr('src');
                $(this).css('background-image','url('+src+')').children('img').hide();
            });

            // Slideshow
            $('.bg-slideshow').slick({
                dots: false,
                arrows: false,
                fade: true,
                speed: 3000,
                autoplay: true,
                autoplaySpeed: 3000,
                pauseOnHover: false
            });

            // Video
            var $bgVideo = $('.bg-video');
            if($bgVideo) {
                $bgVideo.YTPlayer();
            }
            if(trueMobile && $bgVideo) {
                $bgVideo.prev('.bg-video-placeholder').show();
                $bgVideo.remove()
            }
        },
        animations: function() {
            // Animation - appear
            $('.animated').appear(function() {
                $(this).each(function(){
                    var $target =  $(this);
                    var delay = $(this).data('animation-delay');
                    setTimeout(function() {
                        $target.addClass($target.data('animation')).addClass('visible')
                    }, delay);
                });
            });
        },
        masonry: function() {
            var $grid = $('.masonry','#content');

            $grid.masonry({
                columnWidth: '.masonry-sizer',
                itemSelector: '.masonry-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

            $grid.on('layoutComplete', Waypoint.refreshAll());
        },
        navigation: function() {
            var headerHeight = $('#header').height(),
                $mobileNav = $('#mobile-nav'),
                $section = $('.section','#content'),
                scrollOffset = 0;

            var $scrollers = $('#header, #mobile-nav, [data-local-scroll]');

            $scrollers.find('a').on('click', function(){
                $(this).blur();
            });

            $scrollers.localScroll({
                offset: scrollOffset,
                duration: 700,
                easing: 'easeInCubic'
            });

            var $mainMenu = $('#main-menu'),
                $menuItem = $('#main-menu li > a'),
                mainMenuOffset = null,
                $selector = $mainMenu.children('.selector');

            window.setMenuSelector = function() {
                var $activeItem = $mainMenu.find('a.active');
                if($activeItem.length != 0) {
                    mainMenuOffset = $mainMenu.offset().top;
                    $selector.css({
                        'height': $activeItem.outerHeight(),
                        'top': $activeItem.offset().top - mainMenuOffset + 'px'
                    });
                }
            }

            $menuItem.on('click', function(){
                if($(this).attr('href').indexOf('#') != -1 && !$(this).parent('li').hasClass('has-children') &&!$(this).hasClass('go-back')) {
                    $body.removeClass('mobile-nav-open');
                    $mobileNavToggle.removeClass('open');
                    var target = $(this).attr("href"); // Get the target element
                    var scrollToPosition = $(target).offset().top; // Position to scroll to
                    $('html /* For FF & IE */,body /* For Chrome */').animate({
                        'scrollTop': scrollToPosition
                    }, 700, function (target) {
                        window.location.hash = target;
                    });
                    e.preventDefault();
                    return false;
                }
            });

            var checkMenuItem = function(id) {
                $menuItem.each(function(){
                    var link = $(this).attr('href');
                    if(id==link) {
                        $(this).addClass('active');
                        setMenuSelector();
                    }
                    else $(this).removeClass('active');
                });
            }

            if($body.hasClass('one-page')) {
                $section.waypoint({
                    handler: function(direction) {
                        if(direction=='up') {
                            var id = '#'+this.element.id;
                            checkMenuItem(id);
                        }
                    },
                    offset: function() {
                        return -this.element.clientHeight+2;
                    }
                });
                $section.waypoint({
                    handler: function(direction) {
                        if(direction=='down') {
                            var id = '#'+this.element.id;
                            checkMenuItem(id);
                        }
                    },
                    offset: function() {
                        return 1;
                    }
                });
            }

            // Sub-Navigation
            var $mainMenuNav = $mainMenu.find('.nav-primary'),
                $menuItemParent = $mainMenu.find('.has-children > a'),
                $menuItemBack = $mainMenu.find('.go-back'),
                navPosition = 0,
                navLevel = 0;

            $menuItemParent.on('click', function(){
                $(this).addClass('children-visible').parent('li').parent('ul').addClass('ul-inactive');
                navLevel++;
                navPosition = -$mainMenu.width()*navLevel;
                $mainMenuNav.animate({
                    'left': navPosition + 'px'
                },300,'easeOutQuad');
                $mainMenu.addClass('submenu-active');
                return false;
            });
            $menuItemBack.on('click', function(){
                if(navLevel > 0) {
                    $(this).parent('li').parent('ul').siblings('a').removeClass('children-visible').parent('li').parent('ul').removeClass('ul-inactive');
                    navLevel--;
                    navPosition = -$mainMenu.width()*navLevel;
                    $mainMenuNav.animate({
                        'left': navPosition + 'px'
                    },300,'easeOutQuad');
                }
                if(navLevel == 0) {
                    $mainMenu.removeClass('submenu-active');
                }
                return false;
            });

            // Mobile Navigation Toggle
            $mobileNavToggle.on('click', function(){
                $(this).toggleClass('open');
                $body.toggleClass('mobile-nav-open');
            });
        },
        filter: function() {

            var $filterIsotope = $('.filter-isotope'),
                $list,
                filterValue;

            $filterIsotope.each(function(){
                $list = $($(this).data('filter-list'));
                if($list.hasClass('masonry')) {
                    $list.isotope({
                        itemSelector: '.masonry-item',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.masonry-sizer'
                        }
                    });
                }
                else $list.isotope();
            });

            $filterIsotope.on('click', 'a', function(){

                $list = $($(this).parents('.filter-isotope').data('filter-list'));
                filterValue = $(this).attr('data-filter');

                $list.isotope({
                    filter: filterValue
                });

                $(this).parents('ul').find('.active').removeClass('active');
                $(this).parent('li').addClass('active');

                return false;
            });

        },
        stickable: function() {

            var $stickable = $('.stickable');

            if($stickable.length) {
                var stickableEl = new Waypoint.Sticky({
                  element: $stickable,
                  stuckClass: 'sticky'
                });
            }

        },
        map: function() {

            var $googleMap = $('#google-map');

            if($googleMap.length) {

                var yourLatitude = $googleMap.data('latitude');
                var yourLongitude = $googleMap.data('longitude');

                var dark = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
                var light = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
                var dream = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
                var paper = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}];

                var pickedStyle = $googleMap.data('style');

                var mapOptions = {
                    zoom: 14,
                    center: {lat: yourLatitude, lng: yourLongitude},
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    scrollwheel: false,
                    styles: eval(pickedStyle)
                };

                var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
                var myLatLng = new google.maps.LatLng(yourLatitude,yourLongitude);
                var myLocation = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: 'assets/img/location-pin.png'
                });
            }
        }
    },
    Component: {
        init: function() {
            this.ajaxModal();
            this.buttons();
            this.calendar();
            this.carousel();
            this.forms();
            this.horizontalScroll();
            this.instagramFeed();
            this.modal();
            this.progressBar();
            this.twitterFeed();
        },
        ajaxModal: function() {
            $body.append(
                '<div id="ajax-modal"><div id="ajax-loader"><svg class="loader" width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle class="circle" fill="none" stroke-width="2" stroke-linecap="round" cx="16" cy="16" r="14"></circle></svg></div><div class="ajax-modal-wrapper"></div><a href="#" class="ajax-close close" data-dismiss="ajax-modal"><i class="ti-close"></i></a></div>'+
                '<div id="ajax-tmp"></div>'
            );

            var toLoad;

            var $ajaxLoader = $('#ajax-loader');
            var $ajaxModal = $('#ajax-modal');
            var $ajaxModalWrapper = $ajaxModal.children('.ajax-modal-wrapper');
            var $ajaxTmp = $('#ajax-tmp');

            function showNewContent() {
                $ajaxModal.fadeIn(200, function(){
                    $('html').addClass('locked-scrolling');
                });
            }

            function loadContent() {　

               $ajaxTmp.load(toLoad, function() {

                    $body.addClass('ajax-modal-open');

                    $ajaxModal.show(0).addClass('loading-started');
                    $ajaxLoader.fadeIn(200).css('display','inline-block');

                    $ajaxTmp.find('#content').removeAttr('id').addClass('ajax-content');

                    var $self = $(this);

                    $self.waitForImages({
                        finished: function() {
                            $ajaxModalWrapper.html($ajaxTmp.html());

                            setTimeout(function(){
                                $('html').addClass('locked-scrolling');
                                $ajaxModalWrapper.fadeIn(300);

                                $ajaxModal.addClass('loading-finished');
                                $ajaxLoader.fadeOut(400);

                                $ajaxTmp.html('');
                            },800);
                        },
                        waitForAll: true
                    });
               });

        　  }

            function closeDetails() {
                $('html').removeClass('locked-scrolling');
                $body.removeClass('ajax-modal-open');
                $ajaxModal.fadeOut(200, function() {
                    $(this).removeClass('loading-started loading-finished');
                    $ajaxModalWrapper.hide(0);
                })
            }

            $body.delegate('*[data-toggle="ajax-modal"]','click', function() {
                toLoad = $(this).attr('href')+' #content';　
                loadContent();
                return false;
            });

            $ajaxModal.delegate('*[data-dismiss="ajax-modal"]','click', function(){
                closeDetails();
                return false;
            });
        },
        buttons: function() {
            $('.btn:not(.btn-submit)').each(function(){
                var html = $(this).html();
                $(this).html('<span>'+html+'</span>');
            });
        },
        calendar: function() {
            var deafultCalendarView = 'month';

            if($(window).width()<768) deafultCalendarView = 'agendaDay';

            $calendar.fullCalendar({
                header: {
                    left:   'title',
                    center: 'month,agendaWeek,agendaDay',
                    right:  'today prev,next'
                },
                views: {
                    agenda: {
                        minTime: '07:00:00',
                        maxTime: '21:00:00'
                    }
                },
                eventLimit: true,
                navLinks: true,
                defaultView: deafultCalendarView,
                googleCalendarApiKey: 'AIzaSyBRMEkSrFLFkLKHyLVwT0DLLTqcUhUUZdM',
                eventSources: [
                    {
                        googleCalendarId: '480uf03upv9p68q3h755gph2mo@group.calendar.google.com'
                    },
                    {
                        googleCalendarId: '71ev00p89bpntfca1crkukmfa0@group.calendar.google.com',
                        className: 'primary'
                    }
                ],
                dayClick: function(date, allDay, jsEvent, view) {
                    $('#calendar').fullCalendar('gotoDate', date.format());
                    $('#calendar').fullCalendar('changeView', 'agendaDay');
                },
                eventClick: function(calEvent, jsEvent, view) {
                    $('#calendar').fullCalendar('gotoDate', calEvent.start.format());
                    $('#calendar').fullCalendar('changeView', 'agendaDay');
                }
            });
        },
        carousel: function() {
            $('.carousel').slick({
                dots: true,
                infinite: false,
                speed: 300,
            });
        },
        forms: function(){
            /* Notification Bar */
            var $notificationBar = $('#notification-bar'),
                $notificationClose = $('#notification-bar').find('.close');

            var showNotification = function(type,msg) {
                $notificationBar.html('<div class='+type+'>'+msg+'<a href="#" class="close"><i class="ti-close"></i></a></div>');
                setTimeout(function(){
                    $notificationBar.addClass('visible');
                }, 400);
                setTimeout(function(){
                    $notificationBar.removeClass('visible');
                }, 10000);
            };

            $body.delegate('#notification-bar .close','click', function(){
                closeNotification();
                return false;
            });

            var closeNotification = function() {
                $notificationBar.removeClass('visible');
            }

            /* Validate Form */
            $('.validate-form').each(function(){
                $(this).validate({
                    validClass: 'valid',
                    errorClass: 'error',
                    onfocusout: function(element,event) {
                        $(element).valid();
                    },
                    errorPlacement: function(error,element) {
                        return true;
                    },
                    rules: {
                        email: {
                            required    : true,
                            email       : true
                        }
                    }
                });
            });

            // Sign In
            var $signUpForm  = $('.sign-up-form');

            if($signUpForm.length>0) {

                $signUpForm.submit(function() {
                    var $btn = $(this).find('.btn-submit'),
                        $form = $(this),
                        response,
                        msgSuccess = $(this).data('message-success'),
                        msgError = $(this).data('message-error');

                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: $form.attr('method'),
                            url:  $form.attr('action'),
                            data: $form.serialize(),
                            cache       : false,
                            dataType    : 'jsonp',
                            jsonp: 'c',
                            contentType: "application/json; charset=utf-8",
                            error       : function(err) { setTimeout(function(){ $btn.addClass('error'); }, 1200); },
                            success     : function(data) {
                                if(data.result != 'success'){
                                    showNotification('error',msgError);
                                } else {
                                    showNotification('success',msgSuccess);
                                }
                                console.log(data);
                            },
                            complete: function(data) {
                                setTimeout(function(){
                                    $btn.removeClass('loading');
                                },1000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }

            // Contact Form
            var $contactForm  = $('.contact-form');

            if($contactForm.length>0) {

                $contactForm.submit(function() {
                    var $btn = $(this).find('.btn-submit'),
                        $form = $(this),
                        response,
                        msgSuccess = $(this).data('message-success'),
                        msgError = $(this).data('message-error');

                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: 'POST',
                            url:  'assets/php/contact-form.php',
                            data: $form.serialize(),
                            error       : function(err) { setTimeout(function(){ $btn.addClass('error'); }, 1200); },
                            success     : function(data) {
                                if(data != 'success'){
                                    showNotification('error',msgError);
                                } else {
                                    showNotification('success',msgSuccess);
                                }
                            },
                            complete: function(data) {
                                setTimeout(function(){
                                    $btn.removeClass('loading');
                                },1000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }
        },
        horizontalScroll: function() {
            var $horizontalScroll = $('.horizontal-scroll');
            $horizontalScroll.mCustomScrollbar({
                axis:"x",
                autoDraggerLength:false,
                advanced: {
                    autoExpandHorizontalScroll:true
                },
                mouseWheel: {
                    enable: false,
                    axis: "x"
                }
            });

            $horizontalScroll.appear(function(){
                $(this).mCustomScrollbar("scrollTo",'last',{
                    scrollInertia:3000,
                    moveDragger:true
                });
            });
        },
        instagramFeed: function(){

            var $instagramFeed = $('#instagram-feed');

            if($instagramFeed.length) {
                var limit =  $instagramFeed.data('limit'),
                    res = $instagramFeed.data('resolution') ? $instagramFeed.data('resolution') : 'thumbnail';
                var feed = new Instafeed({
                    accessToken: '2969283166.1677ed0.e859dad53f0b4f6cab807252cb20a682',
                    userId: '2969283166',
                    get: 'user',
                    target: 'instagram-feed',
                    template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
                    limit: limit,
                    resolution: res
                });
                feed.run();
            }

        },
        modal: function() {
            $('.modal[data-timeout]').each(function(){
                var timeout = $(this).data('timeout'),
                    $this = $(this);
                setTimeout(function() {
                    $this.modal('show');
                }, timeout)
            });

            $('[data-toggle="video-modal"]').on('click', function() {
                var modal = $(this).data('target'),
                    video = $(this).data('video')

                $(modal + ' iframe').attr('src', video + '?autoplay=1');
                $(modal).modal('show');

                $(modal).on('hidden.bs.modal', function () {
                    $(modal + ' iframe').removeAttr('src');
                })

                return false;
            });
        },
        progressBar: function() {
            $('.progress-wrapper').each(function(){
                var value = $(this).children('progress').attr('value');
                $(this).children('.value').html(value+'%').css('right',100-value+'%');
            });
        },
        twitterFeed: function() {
            $('.twitter-feed').each(function() {
                var count = $(this).data("count");
                $(this).twittie({
                    apiPath: 'assets/api/twitter/tweet.php',
                    count: count,
                    template: '{{tweet}} - <span class="date">{{date}}</span>'
                });
            });
        },
        tooltip: function() {
            $("[data-toggle='tooltip']").tooltip();
        }
    }
};

$(document).on('ready', function (){
    Skill.init();
});

$(window).on('load', function(){
    $body.addClass('loaded');
    if($pageLoader.length != 0) {
        $('#page-loader').fadeOut(600, function(){
            Skill.Basic.animations();
        });
    } else {
        Skill.Basic.animations();
    }
    setMenuSelector();
});

$(window).on('resize',function(){
    setMenuSelector();
    if($(window).width()<768) {
        $calendar.fullCalendar('changeView','agendaDay');
    } else {
        $calendar.fullCalendar('changeView','month');
    }
    setTimeout(function(){
        Waypoint.refreshAll()
    },600);
});


