var DUBAI = DUBAI || {};

(function($){

	// USE STRICT
	"use strict";

    DUBAI.header = {
        init: function () {
            DUBAI.header.slickNav();
        },
        
        activeMenuItem: function($links) {
            var top = $(window).scrollTop(),
                windowHeight = $(window).height(),
                documentHeight = $(document).height(),
                cur_pos = top + (windowHeight / 4),
                sections = $("[data-scroll-spy]"),
                nav = $links,
                nav_height = nav.outerHeight();
    
            sections.each(function() {
                var top = $(this).offset().top - nav_height - 40,
                    bottom = top + $(this).outerHeight();
    
                if (cur_pos >= top && cur_pos <= bottom) {
                    nav.find("> ul > li > a").parent().removeClass("active");
                    nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("active");
                } else if ($(window).scrollTop() + windowHeight > documentHeight - 400) {
                    nav.find("> ul > li > a").parent().removeClass("active");
                }
            });
        },

        slickNav: function () {
            $('ul#nav_menu').slicknav({
                prependTo: ".responsive-menu-wrap",
            });
        },

        fadeSlideShow: function () {
            if(!isMobile) {
                var scrolled = $(window).scrollTop();
                $(".slider-area").css({
                    'transform': 'translate3d(0, ' + -(scrolled * 0.40) + 'px, 0)',
                    'opacity': 1.25 - scrolled / 600
                });
            }
        },

        stickyNavbar: function () {
            if ( $( window ).scrollTop() > 200 ) {  
                $(".navbar-area").addClass( 'active' );
            }
            else {
                $(".navbar-area").removeClass( 'active' );
            }
        }


    }

    DUBAI.widget = {

        init: function () {

            DUBAI.widget.BackgroundImage();

            DUBAI.widget.prealoaderSetup();
            
            DUBAI.widget.wowSetup();

            DUBAI.widget.sliderFixed();

            DUBAI.widget.progressBar();
            
            DUBAI.widget.typed();

            DUBAI.widget.ajaxContactForm();

        },

        wowSetup: function () {
            new WOW({
                offset:       100,
                mobile:       false,
                live:         false
            }).init();
        },

        BackgroundImage: function () {
            pageSection.each(function () {
                if ($(this).attr("data-background")) {
                    $(this).css("background", "url(" + $(this).data("background") + ") no-repeat center");
                    $(this).css("backgroundSize", "cover");
                }
            });
        },

        sliderFixed: function () {
            var slidHeight = $(".slider-area").outerHeight();
            $(".main-content").css({
                marginTop: slidHeight
            });
        },

        progressBar: function () {

            $(".progress-bar").appear();
            $(document.body).on("appear", ".progress-bar", function () {
                
                if($(".progress-bar").hasClass("appeard")) {
                    return false
                } else {
                    $(".progress-bar").find(".chart").each(function () {

                        var options = {
                            strokeWidth: 4,
                            easing: 'easeInOut',
                            duration: 1400,
                            color: 'var(--neutral-color-2)',
                            trailColor: 'transaprent',
                            trailWidth: 4,
                            svgStyle: {width: "100%", height: '10px'},
                            text: {
                                style: {
                                  color: 'var(--header-color)',
                                  position: 'absolute',
                                  right: '0',
                                  bottom: '5px',
                                  padding: 0,
                                  margin: 0,
                                  fontSize: "13px",
                                  transform: "skew(-20deg) translateY(-50%)"
                                },
                                autoStyleContainer: false
                            },
                            step: (state, bar) => {
                                bar.setText(Math.round(bar.value() * 100) + ' %');
                            }
                        }
                
                        var bar = new ProgressBar.Line(this, options);
                        bar.animate($(this).data("percent"))
                    })
                    $(".progress-bar").addClass("appeard")
                }
            });

        },

        typed: function () {
            var typed = new Typed('.typed-text', {
                strings: ["developer.", "Freelancer.", "Designer."],
                typeSpeed: 60,
                backSpeed: 60,
                loop: true,
                backDelay: 1000
            });
        },

        prealoaderSetup: function() {
            if (!isMobile) {
                setTimeout(function() {
                    preloader.addClass('preloaded');
                }, 800);
                setTimeout(function() {
                    preloader.remove();
                    var animate = elLoaderWait.data('loader-wait');
                    elLoaderWait.addClass(animate)
                    elLoaderWait.css({opacity: 1})
                }, 1700);
                setTimeout(function() {
                    elSliderWait.each(function () {
                        var animate = $(this).data('slider-wait')
                        $(this).addClass(animate)
                        $(this).css({opacity: 1})
                    })
                }, 2300);
    
            } else {
                preloader.remove();
                elLoaderWait.css({opacity: 1});
                elSliderWait.css({opacity: 1});
            }
        },
        
        ajaxContactForm: function () {
            $('.form-response').hide();
            $('.contact-area form').on('submit', function() {
                var name = $('#contact-form-name').val();
                var email = $('#contact-form-email').val();
                var message = $('#contact-form-message').val();
                name = $.trim(name);
                email = $.trim(email);
                message = $.trim(message);
        
                if (name != '' && email != '' && message != '') {
                    var values = "name=" + name + "&email=" + email + " &message=" + message;
                    $.ajax({
                        type: "POST",
                        url: "./mail.php",
                        data: values,
                        success: function() {
                            $('#contact-form-name').val('');
                            $('#contact-form-email').val('');
                            $('#contact-form-message').val('');
        
                            $('.form-response').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                            setTimeout(function() {
                                $('.form-response').fadeOut('slow');
                            }, 4000);
                        },
                        error: function(e) {
                            $('.form-response').fadeIn().html('<div class="alert alert-danger"><strong>Warning! ' + e.statusText + '</div>')
                            setTimeout(function() {
                                $('.form-response').fadeOut('slow');
                            }, 4000);
                        }
                    });
                } else {
                    $('.form-response').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
                    setTimeout(function() {
                        $('.form-response').fadeOut('slow');
                    }, 4000);
                }
                return false;
            });
        }        

    }

    DUBAI.documentOnReady = {
            
        init: function() {

            DUBAI.header.init();

            DUBAI.widget.init();

            DUBAI.documentOnReady.windowscroll();

            DUBAI.documentOnReady.smoothScrolling($("[data-smooth]"), headerHeight);
            
        },
        
        windowscroll: function() {             
            
            $( window ).on( 'scroll', function() {
                 
                DUBAI.header.stickyNavbar();

                DUBAI.header.fadeSlideShow();

                DUBAI.header.activeMenuItem($(".nav-menu"));

            });
        },

        smoothScrolling: function($links, $topGap) {
            var links = $links;
            var topGap = $topGap;

            links.on("click", function() {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                    if(target.length && this.hash === "#home") {
                        $("html, body").animate({
                            scrollTop: 2
                        }, 1500, "easeInOutExpo");
                        return false;
                    } else if (target.length) {
                        $("html, body").animate({
                            scrollTop: target.offset().top - topGap
                        }, 1500, "easeInOutExpo");
                        return false;
                    }
                }
                return false;
            });
        }

    };


    var headerHeight = $('.navbar-area').innerHeight();
    var pageSection = $(".bg-area");
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    var preloader = $('#preloader');
    var elLoaderWait = $("[data-loader-wait]")
    var elSliderWait = $("[data-slider-wait]")

    $("html, body").animate({scrollTop: 0});
    
    $( document ).ready( DUBAI.documentOnReady.init );

})(jQuery);
