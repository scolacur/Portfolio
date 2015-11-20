app.controller('projectCtrl', function($scope){
	var theWindow = $(window);

	function initializeSkew(){
		$(document).ready(function() {

			var curPage = 1;
			var numOfPages = $(".skw-page").length;
			var animTime = 1000;
			var scrolling = false;
			var pgPrefix = ".skw-page-";
			var progPrefix = "#p";

			function pagination() {
				scrolling = true;

				$(pgPrefix + curPage).removeClass("inactive").addClass("active");
				// $(progPrefix + curPage).addClass("current");
				setTimeout(function() {
					scrolling = false;
				}, animTime);
			}

			function navigateUp() {
				if (curPage === 1) return;
				curPage--;
				$(pgPrefix + (curPage + 1)).removeClass("active");
				// $(progPrefix + (curPage + 1)).removeClass("current");

				pagination();
			}

			function navigateDown() {
				if (curPage === numOfPages) return;
				curPage++;
				$(pgPrefix + (curPage - 1)).addClass("inactive");
				// $(progPrefix + (curPage -1)).removeClass("current");
				pagination();
			}

			$(document).on("mousewheel DOMMouseScroll", function(e) {
				if (scrolling) return;
				if (e.originalEvent.wheelDelta > 0  || e.originalEvent.detail < 0) {
					navigateUp();
				} else {
					navigateDown();
				}
			});

			$(document).on("keydown", function(e) {
				if (scrolling) return;
				if (e.which === 38) {
					navigateUp();
				} else if (e.which === 40) {
					navigateDown();
				}
			});
		});
	}
	if (theWindow.width() > 768) {
		initializeSkew();
	}
});
