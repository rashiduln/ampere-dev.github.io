$( document ).ready(function() {
    $('.box-carousel').slick({
     dots: false,
     arrows: false,
     infinite: false,
     centerMode: false,
     slidesToShow: 20,
     prevArrow: "<button type='button' class='mission-prev-arrow'><i class='fa fa-3x fa-chevron-circle-left'></i></button>",
     nextArrow: "<button type='button' class='mission-next-arrow'><i class='fa fa-3x fa-chevron-circle-right'></i></button>"
 });

 $(".menuToggler").click(function(){
     $(this).toggleClass("active");
     $("#header").toggleClass("active"); 
 });



});
