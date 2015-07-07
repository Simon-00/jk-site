$(document).ready(function(){


	info_global = $(".information-global");
	info_slide = $(".information-slide");
	info_container = $("#info-container");

	current_slide = 1;
	createSlide(current_slide);

  	function createSlide(id) {

  		new_html = info_slide.eq(id-1).html();
    	info_global.html(new_html);

  	}

  	function loadSlide(direction) {

  		if (info_container.hasClass("open")) {

	  		info_global.addClass("hide");
			info_global.on('transitionend webkitTransitionEnd oTransitionEnd', function () {

	    		if(direction == "next") slider.goToNextSlide(); else slider.goToPrevSlide();
	    		createSlide(current_slide);
	    		
	     		info_global.off('transitionend webkitTransitionEnd oTransitionEnd');

			});

		} else {

	    		if(direction == "next") slider.goToNextSlide(); else slider.goToPrevSlide();
	    		createSlide(current_slide);

		}

  	}

  	function sizeSlide() {

  		$("#container li").css("height", $("#container").height());

  	}

  	$( window ).resize(function() {
  		sizeSlide();
	}).resize();

  	


	var slider = $('#container ul').bxSlider({

	  	controls: false,
	  	pager: false,

	  	onSlideAfter: function(){

	  		info_global.removeClass("hide");
	  	
	  	},
	  	onSlideBefore: function(currentSlide) {

	  		current_slide = currentSlide.index();

	  	}


  	});



	$(".information-close").on("click", function() {

		info_container.removeClass("open").addClass("close");

	});

	$(".information-open").on("click", function() {

		info_container.removeClass("close").addClass("open");

	});



  $("#next").on("click", function() { loadSlide("next"); });
  $("#prev").on("click", function() { loadSlide("prev"); });




















var paper = Snap('#svg');
        var tri = paper.path("M 10 100%, L 50 10, L 50 25, Z");
        tri.attr({
            id:"tri",
            fill:"#555555"
        });

       

        var sqrFunc = function(){
            tri.animate({d:"M 10 10, L 10 50, L 50 50, L50 10,Z"},1000,mina.linear);
        }

        var triFunc = function(){
            tri.animate({d:"M 10 10, L 10 150%, L 50 25, Z"},1000,mina.linear);
        }

        setTimeout(sqrFunc, 200);

        setTimeout(triFunc, 1200);



});
