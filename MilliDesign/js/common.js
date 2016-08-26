
$(document).ready(function() {

    $(".toggle-mnu").click(function() {
        $(this).toggleClass("on");
        $(".main-menu").slideToggle();
        return false;
    });

    $('.colback-phone , .sendRequest').click( function(event){
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function(){
                $('.mainForm')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '5%'}, 200);
            });
    });

    $('#overlay, .wrapClose').click( function(){
        $('.mainForm')
            .animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('#overlay').fadeOut(400);
                }
            );
    });

    $(".top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $("#slider").owlCarousel({
        items : 1,
        nav : true,
        navText : "",
        loop : true,
        autoplay : true,
        autoplayHoverPause : true,
        fluidSpeed : 600,
        autoplaySpeed : 600,
        navSpeed : 600,
        dotsSpeed : 600,
        dragEndSpeed : 600,
        navigation : true,

    });

    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    };

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

    $('.overlay').click(function() {
        $(this).remove();
    });

    $(".main-menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);

    });

    $(".arrow-bottom").click(function() {
        $("html, body").animate({ scrollTop: $(".section3").height()+200 }, "slow");
        return false;
    });

    $(".example").animated("bounceInRight");

    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
    $("#form").submit(function(e) {
        e.preventDefault;
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("Спасибо за заявку!");
            setTimeout(function() {
                $.fancybox.close();
            }, 1000);
        });
    });

    //Цели для Яндекс.Метрики и Google Analytics
    $(".count_element").on("click", (function() {
        ga("send", "event", "goal", "goal");
        yaCounterXXXXXXXX.reachGoal("goal");
        return true;
    }));

    $(".price").waypoint(function() {

        $(".wrapCards").each(function(index) {
            var ths = $(this);
            setInterval(function() {
                ths.removeClass("card-off").addClass("card-on");
            }, 200*index);
        });

    }, {
        offset : "20%"
    });

    $('.animation')
        .waypoint( function(dir) {
            if ( dir === 'down' )
                $(this)
                    .removeClass('fadeOutDown')
                    .addClass('fadeInUp');
            else
                $(this)
                    .removeClass('fadeInUp')
                    .addClass('fadeOutDown');
        }, {
            offset: '60%'
        })

        .waypoint( function(dir) {
            if ( dir === 'down' )
                $(this)
                    .removeClass('fadeInUp')
                    .addClass('fadeOutDown');
            else
                $(this)
                    .removeClass('fadeOutDown')
                    .addClass('fadeInUp');
        }, {
            offset: -10
        });

    $('.wrapForm')
        .waypoint( function(dir) {
            if ( dir === 'down' )
                $(this)
                    .removeClass('fadeOutDown')
                    .addClass('tada')
                    .addClass('show');
        }, {
            offset: '10%'
        })
    //

});



