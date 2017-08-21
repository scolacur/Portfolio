'use strict';

// window.app = angular.module('portfolio', ['ui.router', 'ngAnimate']);
window.app = angular.module('portfolio', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

	// this makes the '/stores/' route correctly redirect to '/stores'
	$urlRouterProvider.rule(function ($injector, $location) {

		var re = /(.+)(\/+)(\?.*)?$/;
		var path = $location.url();

		if (re.test(path)) {
			return path.replace(re, '$1$3');
		}

		return false;
	});
	// This turns off hashbang urls (/#about) and changes it to something normal (/about)
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
	// If we go to a URL that ui-router doesn't have registered, go to the "/" url.
	$urlRouterProvider.otherwise('/');
});

app.controller('aboutCtrl', function ($scope) {
	var theWindow = $(window);
	var force = d3.layout.force();
	var stopped = true;

	// angular.element(document).ready(function(){
	$scope.skills = [

	//Basic stuff
	{ name: "JavaScript", level: 3 }, { name: "CSS", level: 3 }, { name: "HTML", level: 3 }, { name: "Node.js", level: 3 }, { name: "Express.js", level: 3 }, { name: "Angular.js", level: 3 }, { name: "MongoDB", level: 3 },

	//Build tools
	{ name: "Webpack", level: 3 }, { name: "Gulp", level: 3 }, { name: "Grunt", level: 3 }, { name: "Responsive Design", level: 3 }, { name: "Agile Methodologies", level: 3 },

	//Testing
	{ name: "Mocha / Chai", level: 3 }, { name: "TDD", level: 3 }, { name: "Karma", level: 3 }, { name: "Jasmine", level: 3 }, { name: "Continuous Integration", level: 2 }, { name: "HLS Video", level: 2 }, { name: "React.js", level: 2 }, { name: "Redux", level: 2 }, { name: "Web-Audio", level: 1 }, { name: "Chrome Extensions", level: 1 }, { name: "SQL", level: 1 }, { name: "MIDI", level: 1 }, { name: "Java", level: 1 }, { name: "C++", level: 1 }, { name: "Python", level: 1 }, { name: "Django", level: 1 }, { name: "AWS", level: 1 }, { name: "D3.js", level: 1 }];

	$scope.colors = ['#7FFFD4', '#E0FFFF', '#33CCFF', '#C688E8', '#FF807D', '#FF8EB2'];

	$scope.skills.map(function (e, i) {
		e.color = $scope.colors[i % 6];
	});

	function initializeSkillsCloud() {
		console.log('skills: ', $scope.skills);
		var skillsCloud = $("#skills-cloud");
		var width = skillsCloud.width();
		var height = skillsCloud.height();
		var svg = d3.select("#skills-cloud").append("svg");

		//create nodes
		var nodes = d3.range($scope.skills.length).map(function (i) {
			return {
				radius: $scope.skills[i].level * 18 + 14,
				label: $scope.skills[i].name,
				skillLevel: $scope.skills[i].level,
				bgColor: $scope.skills[i].color
			};
		});

		var root = nodes[0];
		root.radius = 0;
		root.fixed = true;

		var groups = svg.selectAll("g").data(nodes.slice(1)).enter().append("g");

		var circles = groups.append('circle').data(nodes.slice(1)).attr("r", function (d) {
			return d.radius;
		}).style("fill", function (d, i) {
			return d.bgColor;
		});

		var label = groups.append("text").text(function (d) {
			return d.label;
		}).attr({
			"alignment-baseline": "middle",
			"text-anchor": "middle"
		});

		force.gravity(0.05).charge(function (d, i) {
			return i ? 0 : -3000;
		}).nodes(nodes);

		if (navigator.userAgent.split("Chrome").length < 2) {
			force.size([width - 100, height + 600]); //safari
		} else {
			force.size([width - 200, height - 300]); //chrome
		}

		force.start();
		stopped = false;

		force.on("tick", function (e) {
			var q = d3.geom.quadtree(nodes),
			    i = 0,
			    n = nodes.length;

			while (++i < n) {
				q.visit(collide(nodes[i]));
			} //move circles
			svg.selectAll("circle").attr("cx", function (d) {
				return d.x;
			}).attr("cy", function (d) {
				return d.y;
			});

			//move labels
			svg.selectAll("text").attr("x", function (d) {
				return d.x;
			}).attr("y", function (d) {
				return d.y;
			});
		});

		svg.on("mousemove", function () {
			var p1 = d3.mouse(this);
			root.px = p1[0];
			root.py = p1[1];
			force.resume();
		});

		//So they don't all start out in a straight line
		root.px = 1;
		root.py = 1;

		function collide(node) {
			var r = node.radius + 16,
			    nx1 = node.x - r,
			    nx2 = node.x + r,
			    ny1 = node.y - r,
			    ny2 = node.y + r;
			return function (quad, x1, y1, x2, y2) {
				if (quad.point && quad.point !== node) {
					var x = node.x - quad.point.x,
					    y = node.y - quad.point.y,
					    l = Math.sqrt(x * x + y * y),
					    r = node.radius + quad.point.radius;

					if (l < r) {
						l = (l - r) / l * 0.5;
						node.x -= x *= l;
						node.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					}
				}
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			};
		}
	}
	// });

	var firefox;
	if (navigator.userAgent.split("Safari").length < 2 && navigator.userAgent.split("Chrome").length < 2) {
		firefox = true;
	}

	if (firefox) {
		$('#skills-cloud').css({ 'display': 'none' });
		$('#skills-mobile').css({ 'display': 'block', 'margin-top': '24px', 'margin-bottom': '44px', 'height': '700px' });

		setTimeout(function () {
			$('.skill-circle').css({ 'padding': '1px', 'padding-right': '32%', 'font-family': 'Oxygen', 'font-size': '19px', 'font-weight': '300', 'float': 'right' });
		}, 500);
	}

	if (theWindow.width() > 1074 && !firefox) {
		initializeSkillsCloud();
	}

	theWindow.resize(function () {
		if (theWindow.width() > 1074 && !firefox) {
			$('html,body').scrollTop(0);
			//start / restart mouseover listener if stopped
			if (stopped) {
				initializeSkillsCloud();
			}
		} else {
			force.stop();
		}
	});
});

app.controller('contactCtrl', function ($scope, $http) {
	$scope.formData = {};

	$scope.sendMail = function () {
		$scope.waiting = true;
		$scope.sent = false;
		$scope.success = false;
		$http.post('/api/contact', $scope.formData).then(function (successResponse) {
			$scope.waiting = false;
			$scope.sent = true;
			$scope.success = successResponse.data;
			$scope.formData = {};
		});
	};

	var resumeLabel = $('#resume');
	var overlay = $('#overlay');
	var resume = $('#resume-container');

	resumeLabel.click(function () {
		overlay.css({ 'opacity': '.7', 'z-index': '1' });
		resume.css({ 'display': 'block' });
	});
	overlay.click(function () {
		overlay.css({ 'opacity': '0', 'z-index': '-1' });
		resume.css({ 'display': 'none' });
	});

	// function explode() {
	//
	// 	$('#canvas').css({'display' : 'initial'});
	//
	// 	var requestId;
	//
	// 	var canvas = document.getElementById("canvas"),
	// 		context = canvas.getContext("2d"),
	// 		width = canvas.width = window.innerWidth,
	// 		height = canvas.height = window.innerHeight,
	// 		particle = [],
	// 		particleCount = 0,
	// 		gravity = 0.3,
	// 		colors = ['#7FFFD4','#E0FFFF','#33CCFF','#C688E8','#FF807D','#FF8EB2'];
	//
	// 	for( var i = 0; i < 50; i++){
	// 		particle.push({
	// 			x : width/2,
	// 			y : height/2,
	// 			boxW : randomRange(5,20),
	// 			boxH : randomRange(5,20),
	// 			size : randomRange(2,8),
	//
	// 			spikeran:randomRange(3,5),
	//
	// 			velX :randomRange(-8,8),
	// 			velY :randomRange(-50,-10),
	//
	// 			angle :convertToRadians(randomRange(0,360)),
	// 			color:colors[Math.floor(Math.random() * colors.length)],
	// 			anglespin:randomRange(-0.2,0.2),
	//
	// 			draw : draw
	// 		});
	// 	}
	//
	// 	var r1={
	// 		x:width/2-150,
	// 		y:height/2-150,
	// 		width:300,
	// 		height:300,
	// 		velX :0,
	// 		velY :-10,
	// 		alphatop:0
	// 	};
	//
	//
	// 	function drawScreen(){
	// 		var size = 50;
	// 		if (r1.alphatop < 1){
	// 			r1.alphatop += 0.01;
	// 		} else{
	// 			r1.alphatop = 1;
	// 		}
	// 		context.globalAlpha = r1.alphatop;
	//
	// 		if(r1.alphatop === 1){
	// 			r1.velY*= 0.999;
	// 			r1.velY += 0.3;
	// 			r1.x += r1.velX;
	// 			r1.y += r1.velY;
	// 		}
	//
	// 		if(r1.y + r1.height > height){
	// 			r1.anglespin = 0;
	// 			r1.y = height - r1.height;
	// 			r1.velY *= -0.8;
	// 			r1.velX *= 0.9;
	// 		}
	//
	// 		context.globalAlpha = 1;
	//
	// 		for( var i = 0; i < particle.length; i++){
	// 			particle[i].draw();
	// 		}
	// 	}
	//
	// 	function update(){
	// 		context.clearRect(0,0,width,height);
	// 		drawScreen();
	// 		requestId = requestAnimationFrame(update);
	// 	}
	//
	// 	update();
	//
	// 	setTimeout(function(){
	// 		window.cancelAnimationFrame(requestId);
	// 		requestId = undefined;
	// 	},5000);
	//
	// 	function randomRange(min, max){
	// 		return min + Math.random() * (max - min );
	// 	}
	//
	// 	function randomInt(min, max){
	// 		return Math.floor(min + Math.random()* (max - min + 1));
	// 	}
	//
	// 	function convertToRadians(degree) {
	// 		return degree*(Math.PI/180);
	// 	}
	//
	// 	function drawStar(cx, cy, spikes, outerRadius, innerRadius,color) {
	// 		var rot = Math.PI / 2 * 3;
	// 		var x = cx;
	// 		var y = cy;
	// 		var step = Math.PI / spikes;
	//
	// 		context.strokeSyle = "#000";
	// 		context.beginPath();
	// 		context.moveTo(cx, cy - outerRadius);
	// 		for (i = 0; i < spikes; i++) {
	// 			x = cx + Math.cos(rot) * outerRadius;
	// 			y = cy + Math.sin(rot) * outerRadius;
	// 			context.lineTo(x, y);
	// 			rot += step;
	//
	// 			x = cx + Math.cos(rot) * innerRadius;
	// 			y = cy + Math.sin(rot) * innerRadius;
	// 			context.lineTo(x, y);
	// 			rot += step;
	// 		}
	//
	// 		context.lineTo(cx, cy - outerRadius);
	// 		context.closePath();
	// 		context.fillStyle=color;
	// 		context.fill();
	// 	}
	//
	// 	function draw(){
	// 		context.save();
	// 		context.translate(this.x,this.y);
	// 		context.rotate(this.angle);
	// 		context.fillStyle=this.color;
	// 		context.beginPath();
	// 		// drawStar(0, 0, 5, this.boxW, this.boxH);
	// 		context.fillRect(this.boxW/2*-1,this.boxH/2*-1,this.boxW,this.boxH);
	// 		context.fill();
	// 		context.closePath();
	// 		context.restore();
	// 		this.angle += this.anglespin;
	// 		this.velY*= 0.999;
	// 		this.velY += 0.3;
	// 		this.x += this.velX;
	// 		this.y += this.velY;
	//
	// 		if(this.y < 0){
	// 			this.velY *= -0.2;
	// 			this.velX *= 0.9;
	// 		}
	// 		if (this.y > height){
	// 			this.anglespin = 0;
	// 			this.y = height;
	// 			this.velY *= -0.2;
	// 			this.velX *= 0.9;
	// 		}
	// 		if (this.x > width ||this.x< 0){
	// 			this.velX *= -0.5;
	// 		}
	// 	}
	// }
});

app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/js/templates/home.html',
		controller: 'homeCtrl'
	}).state('projects', {
		url: '/projects',
		templateUrl: '/js/templates/projects.html',
		controller: 'projectCtrl'
	}).state('about', {
		url: '/about',
		templateUrl: '/js/templates/about.html',
		controller: 'aboutCtrl'
	}).state('contact', {
		url: '/contact',
		templateUrl: '/js/templates/contact.html',
		controller: 'contactCtrl'
	});
});

app.controller('homeCtrl', function ($scope, $state) {
	$scope.$state = $state;
	var increment = 0;
	var carousel = $('#carousel');
	var current = '#fig-1';
	var prev;
	var theWindow = $(window);
	var interval;
	var bars = $('#static-bars > li');
	var header = $('.left-col');

	if (theWindow.width() > 768) {
		interval = setInterval(rotate, 1500);
	} else {
		var speed;
		bars.each(function (index) {
			speed = (index + 1) * 0.3;
			$(this).css({ 'animation': 'slideInLeft ' + speed + 's' });
		});
		header.removeClass("animated").removeClass('flipInX');
	}

	theWindow.resize(function () {
		clearInterval(interval);
		if (theWindow.width() > 768) {
			$('html,body').scrollTop(0);
			interval = setInterval(rotate, 1500);
		}
	});

	function rotate() {
		increment++;
		carousel.css({ '-webkit-transform': 'rotateX(' + increment * -120 + 'deg)' });
		carousel.attr('data-state', increment % 3 + 1);
		prev = current;
		current = '#fig-' + (increment % 3 + 1);
	}
});

app.controller('projectCtrl', function ($scope) {
	var theWindow = $(window);
	var skewMode = false;
	var curPage;

	function initializeSkew() {
		skewMode = true;
		$(document).ready(function () {

			var numOfPages = $(".skw-page").length;
			var animTime = 1000;
			var scrolling = false;
			var pgPrefix = ".skw-page-";
			// var progPrefix = "#p";

			curPage = parseInt(window.location.hash.split("#p")[1]) + 1 || 1;

			for (var i = 1; i <= numOfPages; i++) {
				if (i < curPage) {
					$(pgPrefix + i).addClass("active").addClass("inactive");
				} else if (i === curPage) {
					$(pgPrefix + i).addClass("active").removeClass("inactive");
				} else {
					$(pgPrefix + i).removeClass("active").removeClass("inactive");
				}
			}

			function pagination() {
				scrolling = true;

				$(pgPrefix + curPage).removeClass("inactive").addClass("active");
				// $(progPrefix + curPage).addClass("current");
				setTimeout(function () {
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

			$(document).off(); //reset event listeners

			$(document).on("mousewheel DOMMouseScroll", function (e) {
				if (scrolling) return;
				if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
					navigateUp();
				} else {
					navigateDown();
				}
			});

			$(document).on("keydown", function (e) {
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

	theWindow.resize(function () {
		if (theWindow.width() > 768) {
			// $('html,body').scrollTop(0);
			//start / restart mouseover listener if stopped
			if (!skewMode) {
				initializeSkew();
			}
		}
	});
});

app.directive('projectsMobile', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/directives/projects-mobile.html'
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0LmpzIiwiY29udGFjdC5qcyIsImhvbWUuanMiLCJwcm9qZWN0LmpzIiwiZGlyZWN0aXZlcy9wcm9qZWN0cy1tb2JpbGUuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRsb2NhdGlvblByb3ZpZGVyIiwiJHVybE1hdGNoZXJGYWN0b3J5UHJvdmlkZXIiLCJydWxlIiwiJGluamVjdG9yIiwiJGxvY2F0aW9uIiwicmUiLCJwYXRoIiwidXJsIiwidGVzdCIsInJlcGxhY2UiLCJodG1sNU1vZGUiLCJ3aGVuIiwibG9jYXRpb24iLCJyZWxvYWQiLCJvdGhlcndpc2UiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwidGhlV2luZG93IiwiJCIsImZvcmNlIiwiZDMiLCJsYXlvdXQiLCJzdG9wcGVkIiwic2tpbGxzIiwibmFtZSIsImxldmVsIiwiY29sb3JzIiwibWFwIiwiZSIsImkiLCJjb2xvciIsImluaXRpYWxpemVTa2lsbHNDbG91ZCIsImNvbnNvbGUiLCJsb2ciLCJza2lsbHNDbG91ZCIsIndpZHRoIiwiaGVpZ2h0Iiwic3ZnIiwic2VsZWN0IiwiYXBwZW5kIiwibm9kZXMiLCJyYW5nZSIsImxlbmd0aCIsInJhZGl1cyIsImxhYmVsIiwic2tpbGxMZXZlbCIsImJnQ29sb3IiLCJyb290IiwiZml4ZWQiLCJncm91cHMiLCJzZWxlY3RBbGwiLCJkYXRhIiwic2xpY2UiLCJlbnRlciIsImNpcmNsZXMiLCJhdHRyIiwiZCIsInN0eWxlIiwidGV4dCIsImdyYXZpdHkiLCJjaGFyZ2UiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzcGxpdCIsInNpemUiLCJzdGFydCIsIm9uIiwicSIsImdlb20iLCJxdWFkdHJlZSIsIm4iLCJ2aXNpdCIsImNvbGxpZGUiLCJ4IiwieSIsInAxIiwibW91c2UiLCJweCIsInB5IiwicmVzdW1lIiwibm9kZSIsInIiLCJueDEiLCJueDIiLCJueTEiLCJueTIiLCJxdWFkIiwieDEiLCJ5MSIsIngyIiwieTIiLCJwb2ludCIsImwiLCJNYXRoIiwic3FydCIsImZpcmVmb3giLCJjc3MiLCJzZXRUaW1lb3V0IiwicmVzaXplIiwic2Nyb2xsVG9wIiwic3RvcCIsIiRodHRwIiwiZm9ybURhdGEiLCJzZW5kTWFpbCIsIndhaXRpbmciLCJzZW50Iiwic3VjY2VzcyIsInBvc3QiLCJ0aGVuIiwic3VjY2Vzc1Jlc3BvbnNlIiwicmVzdW1lTGFiZWwiLCJvdmVybGF5IiwiY2xpY2siLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidGVtcGxhdGVVcmwiLCIkc3RhdGUiLCJpbmNyZW1lbnQiLCJjYXJvdXNlbCIsImN1cnJlbnQiLCJwcmV2IiwiaW50ZXJ2YWwiLCJiYXJzIiwiaGVhZGVyIiwic2V0SW50ZXJ2YWwiLCJyb3RhdGUiLCJzcGVlZCIsImVhY2giLCJpbmRleCIsInJlbW92ZUNsYXNzIiwiY2xlYXJJbnRlcnZhbCIsInNrZXdNb2RlIiwiY3VyUGFnZSIsImluaXRpYWxpemVTa2V3IiwiZG9jdW1lbnQiLCJyZWFkeSIsIm51bU9mUGFnZXMiLCJhbmltVGltZSIsInNjcm9sbGluZyIsInBnUHJlZml4IiwicGFyc2VJbnQiLCJoYXNoIiwiYWRkQ2xhc3MiLCJwYWdpbmF0aW9uIiwibmF2aWdhdGVVcCIsIm5hdmlnYXRlRG93biIsIm9mZiIsIm9yaWdpbmFsRXZlbnQiLCJ3aGVlbERlbHRhIiwiZGV0YWlsIiwid2hpY2giLCJkaXJlY3RpdmUiLCJyZXN0cmljdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxXQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQTs7QUFHQUYsSUFBQUcsTUFBQSxDQUFBLFVBQUFDLGtCQUFBLEVBQUFDLGlCQUFBLEVBQUFDLDBCQUFBLEVBQUE7O0FBRUE7QUFDQUYsb0JBQUFHLElBQUEsQ0FBQSxVQUFBQyxTQUFBLEVBQUFDLFNBQUEsRUFB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQS9MQTs7QUNBQXJHLElBQUFHLE1BQUEsQ0FBQSxVQUFBbUgsY0FBQSxFQUFBO0FBQ0FBLGdCQUNBQyxLQURBLENBQ0EsTUFEQSxFQUNBO0FBQ0EzRyxPQUFBLEdBREE7QUFFQTRHLGVBQUEseUJBRkE7QUFHQXBHLGNBQUE7QUFIQSxFQURBLEVBTUFtRyxLQU5BLENBTUEsVUFOQSxFQU1BO0FBQ0EzRyxPQUFBLFdB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LE1BRUE7QUFDQUM7QUFDQTtBQUNBLElBUEE7O0FBU0EvSCxLQUFBb0gsUUFBQSxFQUFBcEUsRUFBQSxDQUFBLFNBQUEsRUFBQSxVQUFBdEMsQ0FBQSxFQUFBO0FBQ0EsUUFBQThHLFNBQUEsRUFBQTtBQUNBLFFBQUE5RyxFQUFBMEgsS0FBQSxLQUFBLEVBQUEsRUFBQTtBQUNBTjtBQUNBLEtBRkEsTUFFQSxJQUFBcEgsRUFBQTBILEtBQUEsS0FBQSxFQUFBLEVBQUE7QUFDQUw7QUFDQTtBQUNBLElBUEE7QUFRQSxHQWpFQTtBQWtFQTs7QUFFQSxLQUFBaEksVUFBQWtCLEtBQUEsS0FBQSxHQUFBLEVBQUE7QUFDQWtHO0FBQ0E7O0FBRUFwSCxXQUFBaUYsTUFBQSxDQUFBLFlBQUE7QUFDQSxNQUFBakYsVUFBQWtCLEtBQUEsS0FBQSxHQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0EsT0FBQSxDQUFBZ0csUUFBQSxFQUFBO0FBQ0FFO0FBQ0E7QUFDQTtBQUNBLEVBUkE7QUFTQSxDQXhGQTs7QUNBQTFJLElBQUE0SixTQUFBLENBQUEsZ0JBQUEsRUFBQSxZQUFBO0FBQ0EsUUFBQTtBQUNBQyxZQUFBLEdBREE7QUFFQXJDLGVBQUE7QUFGQSxFQUFBO0FBSUEsQ0FMQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gd2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdwb3J0Zm9saW8nLCBbJ3VpLnJvdXRlcicsICduZ0FuaW1hdGUnXSk7XG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ3BvcnRmb2xpbycsIFsndWkucm91dGVyJ10pO1xuXG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICR1cmxNYXRjaGVyRmFjdG9yeVByb3ZpZGVyKSB7XG5cblx0Ly8gdGhpcyBtYWtlcyB0aGUgJy9zdG9yZXMvJyByb3V0ZSBjb3JyZWN0bHkgcmVkaXJlY3QgdG8gJy9zdG9yZXMnXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5ydWxlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuXG5cdFx0dmFyIHJlID0gLyguKykoXFwvKykoXFw/LiopPyQvO1xuXHRcdHZhciBwYXRoID0gJGxvY2F0aW9uLnVybCgpO1xuXG5cdFx0aWYocmUudGVzdChwYXRoKSkge1xuXHRcdFx0cmV0dXJuIHBhdGgucmVwbGFjZShyZSwgJyQxJDMnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXHQvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG5cdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcblx0JHVybFJvdXRlclByb3ZpZGVyLndoZW4oJy9hdXRoLzpwcm92aWRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdH0pO1xuXHQvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG4iLCJhcHAuY29udHJvbGxlcignYWJvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcblx0dmFyIHRoZVdpbmRvdyA9ICQod2luZG93KTtcblx0dmFyIGZvcmNlID0gZDMubGF5b3V0LmZvcmNlKCk7XG5cdHZhciBzdG9wcGVkID0gdHJ1ZTtcblxuXHQvLyBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdCRzY29wZS5za2lsbHMgPSBbXG5cblx0XHQvL0Jhc2ljIHN0dWZmXG5cdFx0e25hbWU6IFwiSmF2YVNjcmlwdFwiLCBsZXZlbDogM30sXG5cdFx0e25hbWU6IFwiQ1NTXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJIVE1MXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJOb2RlLmpzXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJFeHByZXNzLmpzXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJBbmd1bGFyLmpzXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJNb25nb0RCXCIsIGxldmVsOiAzfSxcblxuXHRcdC8vQnVpbGQgdG9vbHNcblx0XHR7bmFtZTogXCJXZWJwYWNrXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJHdWxwXCIsIGxldmVsOiAzfSxcblx0XHR7bmFtZTogXCJHcnVudFwiLCBsZXZlbDogM30sXG5cblx0XHR7bmFtZTogXCJSZXNwb25zaXZlIERlc2lnblwiLCBsZXZlbDogM30sXG5cdFx0e25hbWU6IFwiQWdpbGUgTWV0aG9kb2xvZ2llc1wiLCBsZXZlbDogM30sXG5cblx0XHQvL1Rlc3Rpbmdcblx0XHR7bmFtZTogXCJNb2NoYSAvIENoYWlcIiwgbGV2ZWw6IDN9LFxuXHRcdHtuYW1lOiBcIlRERFwiLCBsZXZlbDogM30sXG5cdFx0e25hbWU6IFwiS2FybWFcIiwgbGV2ZWw6IDN9LFxuXHRcdHtuYW1lOiBcIkphc21pbmVcIiwgbGV2ZWw6IDN9LFxuXHRcdHtuYW1lOiBcIkNvbnRpbnVvdXMgSW50ZWdyYXRpb25cIiwgbGV2ZWw6IDJ9LFxuXG5cdFx0e25hbWU6IFwiSExTIFZpZGVvXCIsIGxldmVsOiAyfSxcblx0XHR7bmFtZTogXCJSZWFjdC5qc1wiLCBsZXZlbDogMn0sXG5cdFx0e25hbWU6IFwiUmVkdXhcIiwgbGV2ZWw6IDJ9LFxuXG5cdFx0e25hbWU6IFwiV2ViLUF1ZGlvXCIsIGxldmVsOiAxfSxcblx0XHR7bmFtZTogXCJDaHJvbWUgRXh0ZW5zaW9uc1wiLCBsZXZlbDogMX0sXG5cdFx0e25hbWU6IFwiU1FMXCIsIGxldmVsOiAxfSxcblx0XHR7bmFtZTogXCJNSURJXCIsIGxldmVsOiAxfSxcblx0XHR7bmFtZTogXCJKYXZhXCIsIGxldmVsOiAxfSxcblx0XHR7bmFtZTogXCJDKytcIiwgbGV2ZWw6IDF9LFxuXHRcdHtuYW1lOiBcIlB5dGhvblwiLCBsZXZlbDogMX0sXG5cdFx0e25hbWU6IFwiRGphbmdvXCIsIGxldmVsOiAxfSxcblx0XHR7bmFtZTogXCJBV1NcIiwgbGV2ZWw6IDF9LFxuXHRcdHtuYW1lOiBcIkQzLmpzXCIsIGxldmVsOiAxfSxcblxuXG5cdF07XG5cblx0JHNjb3BlLmNvbG9ycyA9IFtcblx0XHQnIzdGRkZENCcsXG5cdFx0JyNFMEZGRkYnLFxuXHRcdCcjMzNDQ0ZGJyxcblx0XHQnI0M2ODhFOCcsXG5cdFx0JyNGRjgwN0QnLFxuXHRcdCcjRkY4RUIyJ1xuXHRdO1xuXG5cdCRzY29wZS5za2lsbHMubWFwKGZ1bmN0aW9uKGUsaSl7XG5cdFx0ZS5jb2xvciA9ICRzY29wZS5jb2xvcnNbaSU2XTtcblx0fSk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVTa2lsbHNDbG91ZCgpe1xuXHRjb25zb2xlLmxvZygnc2tpbGxzOiAnLCAkc2NvcGUuc2tpbGxzKTtcblx0dmFyIHNraWxsc0Nsb3VkID0gJChcIiNza2lsbHMtY2xvdWRcIik7XG5cdHZhciB3aWR0aCA9IHNraWxsc0Nsb3VkLndpZHRoKCk7XG5cdHZhciBoZWlnaHQgPSBza2lsbHNDbG91ZC5oZWlnaHQoKTtcblx0dmFyIHN2ZyA9IGQzLnNlbGVjdChcIiNza2lsbHMtY2xvdWRcIikuYXBwZW5kKFwic3ZnXCIpO1xuXG5cblx0Ly9jcmVhdGUgbm9kZXNcblx0dmFyIG5vZGVzID0gZDMucmFuZ2UoJHNjb3BlLnNraWxscy5sZW5ndGgpLm1hcChmdW5jdGlvbihpKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJhZGl1czogJHNjb3BlLnNraWxsc1tpXS5sZXZlbCoxOCArMTQsXG5cdFx0XHRsYWJlbDogJHNjb3BlLnNraWxsc1tpXS5uYW1lLFxuXHRcdFx0c2tpbGxMZXZlbDogJHNjb3BlLnNraWxsc1tpXS5sZXZlbCxcblx0XHRcdGJnQ29sb3I6ICRzY29wZS5za2lsbHNbaV0uY29sb3Jcblx0XHR9O1xuXHR9KTtcblxuXHR2YXJcdHJvb3QgPSBub2Rlc1swXTtcblx0XHRyb290LnJhZGl1cyA9IDA7XG5cdFx0cm9vdC5maXhlZCA9IHRydWU7XG5cblx0dmFyIGdyb3VwcyA9IHN2Zy5zZWxlY3RBbGwoXCJnXCIpXG5cdFx0LmRhdGEobm9kZXMuc2xpY2UoMSkpXG5cdFx0LmVudGVyKClcblx0XHQuYXBwZW5kKFwiZ1wiKTtcblxuXHR2YXIgY2lyY2xlcyA9IGdyb3Vwcy5hcHBlbmQoJ2NpcmNsZScpXG5cdFx0LmRhdGEobm9kZXMuc2xpY2UoMSkpXG5cdFx0LmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQucmFkaXVzOyB9KVxuXHRcdC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCwgaSkgeyByZXR1cm4gZC5iZ0NvbG9yOyB9KTtcblxuXHR2YXIgbGFiZWwgPSBncm91cHMuYXBwZW5kKFwidGV4dFwiKVxuXHRcdC50ZXh0KGZ1bmN0aW9uKGQpeyByZXR1cm4gZC5sYWJlbDsgfSlcblx0XHQuYXR0cih7XG5cdFx0XHRcImFsaWdubWVudC1iYXNlbGluZVwiOiBcIm1pZGRsZVwiLFxuXHRcdFx0XCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuXHRcdH0pO1xuXG5cblx0Zm9yY2UuZ3Jhdml0eSgwLjA1KVxuXHQuY2hhcmdlKGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIGkgPyAwIDogLTMwMDA7IH0pXG5cdC5ub2Rlcyhub2Rlcyk7XG5cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5zcGxpdChcIkNocm9tZVwiKS5sZW5ndGggPCAyKSB7XG5cdFx0Zm9yY2Uuc2l6ZShbd2lkdGgtMTAwLCBoZWlnaHQrNjAwXSk7IC8vc2FmYXJpXG5cdH0gZWxzZSB7XG5cdFx0Zm9yY2Uuc2l6ZShbd2lkdGgtMjAwLCBoZWlnaHQtMzAwXSk7IC8vY2hyb21lXG5cdH1cblxuXG5cdGZvcmNlLnN0YXJ0KCk7XG5cdHN0b3BwZWQgPSBmYWxzZTtcblxuXHRmb3JjZS5vbihcInRpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRcdHZhciBxID0gZDMuZ2VvbS5xdWFkdHJlZShub2RlcyksXG5cdFx0XHRpID0gMCxcblx0XHRcdG4gPSBub2Rlcy5sZW5ndGg7XG5cblx0XHR3aGlsZSAoKytpIDwgbikgcS52aXNpdChjb2xsaWRlKG5vZGVzW2ldKSk7XG5cblx0XHQvL21vdmUgY2lyY2xlc1xuXHRcdHN2Zy5zZWxlY3RBbGwoXCJjaXJjbGVcIilcblx0XHRcdC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54OyB9KVxuXHRcdFx0LmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLnk7IH0pO1xuXG5cdFx0Ly9tb3ZlIGxhYmVsc1xuXHRcdHN2Zy5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG5cdFx0XHQuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54OyB9KVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueTsgfSk7XG5cdH0pO1xuXG5cdHN2Zy5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgcDEgPSBkMy5tb3VzZSh0aGlzKTtcblx0XHRyb290LnB4ID0gcDFbMF07XG5cdFx0cm9vdC5weSA9IHAxWzFdO1xuXHRcdGZvcmNlLnJlc3VtZSgpO1xuXHR9KTtcblxuLy9TbyB0aGV5IGRvbid0IGFsbCBzdGFydCBvdXQgaW4gYSBzdHJhaWdodCBsaW5lXG5cdHJvb3QucHggPSAxO1xuXHRyb290LnB5ID0gMTtcblxuXG5cdGZ1bmN0aW9uIGNvbGxpZGUobm9kZSkge1xuXHRcdHZhciByID0gbm9kZS5yYWRpdXMgKyAxNixcblx0XHRcdG54MSA9IG5vZGUueCAtIHIsXG5cdFx0XHRueDIgPSBub2RlLnggKyByLFxuXHRcdFx0bnkxID0gbm9kZS55IC0gcixcblx0XHRcdG55MiA9IG5vZGUueSArIHI7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHF1YWQsIHgxLCB5MSwgeDIsIHkyKSB7XG5cdFx0XHRpZiAocXVhZC5wb2ludCAmJiAocXVhZC5wb2ludCAhPT0gbm9kZSkpIHtcblx0XHRcdFx0dmFyIHggPSBub2RlLnggLSBxdWFkLnBvaW50LngsXG5cdFx0XHRcdFx0eSA9IG5vZGUueSAtIHF1YWQucG9pbnQueSxcblx0XHRcdFx0XHRsID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpLFxuXHRcdFx0XHRcdHIgPSBub2RlLnJhZGl1cyArIHF1YWQucG9pbnQucmFkaXVzO1xuXG5cdFx0XHRcdGlmIChsIDwgcikge1xuXHRcdFx0XHRcdGwgPSAobCAtIHIpIC8gbCAqIDAuNTtcblx0XHRcdFx0XHRub2RlLnggLT0geCAqPSBsO1xuXHRcdFx0XHRcdG5vZGUueSAtPSB5ICo9IGw7XG5cdFx0XHRcdFx0cXVhZC5wb2ludC54ICs9IHg7XG5cdFx0XHRcdFx0cXVhZC5wb2ludC55ICs9IHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB4MSA+IG54MiB8fCB4MiA8IG54MSB8fCB5MSA+IG55MiB8fCB5MiA8IG55MTtcblx0XHR9O1xuXHR9XG59XG5cdC8vIH0pO1xuXG5cdHZhciBmaXJlZm94O1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5zcGxpdChcIlNhZmFyaVwiKS5sZW5ndGggPCAyICYmIG5hdmlnYXRvci51c2VyQWdlbnQuc3BsaXQoXCJDaHJvbWVcIikubGVuZ3RoIDwgMil7XG5cdFx0ZmlyZWZveCA9IHRydWU7XG5cdH1cblxuXHRpZiAoZmlyZWZveCl7XG5cdFx0JCgnI3NraWxscy1jbG91ZCcpLmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xuXHRcdCQoJyNza2lsbHMtbW9iaWxlJykuY3NzKHsnZGlzcGxheSc6ICdibG9jaycsICdtYXJnaW4tdG9wJzogJzI0cHgnICwnbWFyZ2luLWJvdHRvbSc6ICc0NHB4JywnaGVpZ2h0JzogJzcwMHB4J30pO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0JCgnLnNraWxsLWNpcmNsZScpLmNzcyh7J3BhZGRpbmcnOiAnMXB4JywncGFkZGluZy1yaWdodCc6ICczMiUnLCAnZm9udC1mYW1pbHknOiAnT3h5Z2VuJywgJ2ZvbnQtc2l6ZSc6ICcxOXB4JywgJ2ZvbnQtd2VpZ2h0JzonMzAwJywgJ2Zsb2F0JzoncmlnaHQnfSk7XG5cdFx0fSw1MDApO1xuXHR9XG5cblx0aWYgKHRoZVdpbmRvdy53aWR0aCgpID4gMTA3NCAmJiAhZmlyZWZveCkge1xuXHRcdGluaXRpYWxpemVTa2lsbHNDbG91ZCgpO1xuXHR9XG5cblx0dGhlV2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcblx0XHRpZiAodGhlV2luZG93LndpZHRoKCkgPiAxMDc0ICYmICFmaXJlZm94KSB7XG5cdFx0XHQkKCdodG1sLGJvZHknKS5zY3JvbGxUb3AoMCk7XG5cdFx0XHQvL3N0YXJ0IC8gcmVzdGFydCBtb3VzZW92ZXIgbGlzdGVuZXIgaWYgc3RvcHBlZFxuXHRcdFx0aWYgKHN0b3BwZWQpIHtcblx0XHRcdFx0aW5pdGlhbGl6ZVNraWxsc0Nsb3VkKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvcmNlLnN0b3AoKTtcblx0XHR9XG5cdH0pO1xufSk7XG4iLCJhcHAuY29udHJvbGxlcignY29udGFjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKXtcblx0JHNjb3BlLmZvcm1EYXRhID0ge307XG5cblx0JHNjb3BlLnNlbmRNYWlsID0gZnVuY3Rpb24oKXtcblx0XHQkc2NvcGUud2FpdGluZyA9IHRydWU7XG5cdFx0JHNjb3BlLnNlbnQgPSBmYWxzZTtcblx0XHQkc2NvcGUuc3VjY2VzcyA9IGZhbHNlO1xuXHRcdCRodHRwLnBvc3QoJy9hcGkvY29udGFjdCcsICRzY29wZS5mb3JtRGF0YSlcblx0XHQudGhlbihmdW5jdGlvbihzdWNjZXNzUmVzcG9uc2Upe1xuXHRcdFx0JHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcblx0XHRcdCRzY29wZS5zZW50ID0gdHJ1ZTtcblx0XHRcdCRzY29wZS5zdWNjZXNzID0gc3VjY2Vzc1Jlc3BvbnNlLmRhdGE7XG5cdFx0XHQkc2NvcGUuZm9ybURhdGEgPSB7fTtcblx0XHR9KTtcblx0fTtcblxuXHR2YXIgcmVzdW1lTGFiZWwgPSAkKCcjcmVzdW1lJyk7XG5cdHZhciBvdmVybGF5ID0gJCgnI292ZXJsYXknKTtcblx0dmFyIHJlc3VtZSA9ICQoJyNyZXN1bWUtY29udGFpbmVyJyk7XG5cblx0cmVzdW1lTGFiZWwuY2xpY2soZnVuY3Rpb24oKXtcblx0XHRvdmVybGF5LmNzcyh7J29wYWNpdHknOiAnLjcnLCAnei1pbmRleCc6ICcxJ30pO1xuXHRcdHJlc3VtZS5jc3MoeydkaXNwbGF5JzogJ2Jsb2NrJ30pO1xuXG5cdH0pO1xuXHRvdmVybGF5LmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0b3ZlcmxheS5jc3MoeydvcGFjaXR5JzogJzAnLCAnei1pbmRleCc6ICctMSd9KTtcblx0XHRyZXN1bWUuY3NzKHsnZGlzcGxheSc6ICdub25lJ30pO1xuXHR9KTtcblxuXHQvLyBmdW5jdGlvbiBleHBsb2RlKCkge1xuXHQvL1xuXHQvLyBcdCQoJyNjYW52YXMnKS5jc3MoeydkaXNwbGF5JyA6ICdpbml0aWFsJ30pO1xuXHQvL1xuXHQvLyBcdHZhciByZXF1ZXN0SWQ7XG5cdC8vXG5cdC8vIFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLFxuXHQvLyBcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG5cdC8vIFx0XHR3aWR0aCA9IGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuXHQvLyBcdFx0aGVpZ2h0ID0gY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCxcblx0Ly8gXHRcdHBhcnRpY2xlID0gW10sXG5cdC8vIFx0XHRwYXJ0aWNsZUNvdW50ID0gMCxcblx0Ly8gXHRcdGdyYXZpdHkgPSAwLjMsXG5cdC8vIFx0XHRjb2xvcnMgPSBbJyM3RkZGRDQnLCcjRTBGRkZGJywnIzMzQ0NGRicsJyNDNjg4RTgnLCcjRkY4MDdEJywnI0ZGOEVCMiddO1xuXHQvL1xuXHQvLyBcdGZvciggdmFyIGkgPSAwOyBpIDwgNTA7IGkrKyl7XG5cdC8vIFx0XHRwYXJ0aWNsZS5wdXNoKHtcblx0Ly8gXHRcdFx0eCA6IHdpZHRoLzIsXG5cdC8vIFx0XHRcdHkgOiBoZWlnaHQvMixcblx0Ly8gXHRcdFx0Ym94VyA6IHJhbmRvbVJhbmdlKDUsMjApLFxuXHQvLyBcdFx0XHRib3hIIDogcmFuZG9tUmFuZ2UoNSwyMCksXG5cdC8vIFx0XHRcdHNpemUgOiByYW5kb21SYW5nZSgyLDgpLFxuXHQvL1xuXHQvLyBcdFx0XHRzcGlrZXJhbjpyYW5kb21SYW5nZSgzLDUpLFxuXHQvL1xuXHQvLyBcdFx0XHR2ZWxYIDpyYW5kb21SYW5nZSgtOCw4KSxcblx0Ly8gXHRcdFx0dmVsWSA6cmFuZG9tUmFuZ2UoLTUwLC0xMCksXG5cdC8vXG5cdC8vIFx0XHRcdGFuZ2xlIDpjb252ZXJ0VG9SYWRpYW5zKHJhbmRvbVJhbmdlKDAsMzYwKSksXG5cdC8vIFx0XHRcdGNvbG9yOmNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKV0sXG5cdC8vIFx0XHRcdGFuZ2xlc3BpbjpyYW5kb21SYW5nZSgtMC4yLDAuMiksXG5cdC8vXG5cdC8vIFx0XHRcdGRyYXcgOiBkcmF3XG5cdC8vIFx0XHR9KTtcblx0Ly8gXHR9XG5cdC8vXG5cdC8vIFx0dmFyIHIxPXtcblx0Ly8gXHRcdHg6d2lkdGgvMi0xNTAsXG5cdC8vIFx0XHR5OmhlaWdodC8yLTE1MCxcblx0Ly8gXHRcdHdpZHRoOjMwMCxcblx0Ly8gXHRcdGhlaWdodDozMDAsXG5cdC8vIFx0XHR2ZWxYIDowLFxuXHQvLyBcdFx0dmVsWSA6LTEwLFxuXHQvLyBcdFx0YWxwaGF0b3A6MFxuXHQvLyBcdH07XG5cdC8vXG5cdC8vXG5cdC8vIFx0ZnVuY3Rpb24gZHJhd1NjcmVlbigpe1xuXHQvLyBcdFx0dmFyIHNpemUgPSA1MDtcblx0Ly8gXHRcdGlmIChyMS5hbHBoYXRvcCA8IDEpe1xuXHQvLyBcdFx0XHRyMS5hbHBoYXRvcCArPSAwLjAxO1xuXHQvLyBcdFx0fSBlbHNle1xuXHQvLyBcdFx0XHRyMS5hbHBoYXRvcCA9IDE7XG5cdC8vIFx0XHR9XG5cdC8vIFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gcjEuYWxwaGF0b3A7XG5cdC8vXG5cdC8vIFx0XHRpZihyMS5hbHBoYXRvcCA9PT0gMSl7XG5cdC8vIFx0XHRcdHIxLnZlbFkqPSAwLjk5OTtcblx0Ly8gXHRcdFx0cjEudmVsWSArPSAwLjM7XG5cdC8vIFx0XHRcdHIxLnggKz0gcjEudmVsWDtcblx0Ly8gXHRcdFx0cjEueSArPSByMS52ZWxZO1xuXHQvLyBcdFx0fVxuXHQvL1xuXHQvLyBcdFx0aWYocjEueSArIHIxLmhlaWdodCA+IGhlaWdodCl7XG5cdC8vIFx0XHRcdHIxLmFuZ2xlc3BpbiA9IDA7XG5cdC8vIFx0XHRcdHIxLnkgPSBoZWlnaHQgLSByMS5oZWlnaHQ7XG5cdC8vIFx0XHRcdHIxLnZlbFkgKj0gLTAuODtcblx0Ly8gXHRcdFx0cjEudmVsWCAqPSAwLjk7XG5cdC8vIFx0XHR9XG5cdC8vXG5cdC8vIFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblx0Ly9cblx0Ly8gXHRcdGZvciggdmFyIGkgPSAwOyBpIDwgcGFydGljbGUubGVuZ3RoOyBpKyspe1xuXHQvLyBcdFx0XHRwYXJ0aWNsZVtpXS5kcmF3KCk7XG5cdC8vIFx0XHR9XG5cdC8vIFx0fVxuXHQvL1xuXHQvLyBcdGZ1bmN0aW9uIHVwZGF0ZSgpe1xuXHQvLyBcdFx0Y29udGV4dC5jbGVhclJlY3QoMCwwLHdpZHRoLGhlaWdodCk7XG5cdC8vIFx0XHRkcmF3U2NyZWVuKCk7XG5cdC8vIFx0XHRyZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblx0Ly8gXHR9XG5cdC8vXG5cdC8vIFx0dXBkYXRlKCk7XG5cdC8vXG5cdC8vIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJZCk7XG5cdC8vIFx0XHRyZXF1ZXN0SWQgPSB1bmRlZmluZWQ7XG5cdC8vIFx0fSw1MDAwKTtcblx0Ly9cblx0Ly8gXHRmdW5jdGlvbiByYW5kb21SYW5nZShtaW4sIG1heCl7XG5cdC8vIFx0XHRyZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKTtcblx0Ly8gXHR9XG5cdC8vXG5cdC8vIFx0ZnVuY3Rpb24gcmFuZG9tSW50KG1pbiwgbWF4KXtcblx0Ly8gXHRcdHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkqIChtYXggLSBtaW4gKyAxKSk7XG5cdC8vIFx0fVxuXHQvL1xuXHQvLyBcdGZ1bmN0aW9uIGNvbnZlcnRUb1JhZGlhbnMoZGVncmVlKSB7XG5cdC8vIFx0XHRyZXR1cm4gZGVncmVlKihNYXRoLlBJLzE4MCk7XG5cdC8vIFx0fVxuXHQvL1xuXHQvLyBcdGZ1bmN0aW9uIGRyYXdTdGFyKGN4LCBjeSwgc3Bpa2VzLCBvdXRlclJhZGl1cywgaW5uZXJSYWRpdXMsY29sb3IpIHtcblx0Ly8gXHRcdHZhciByb3QgPSBNYXRoLlBJIC8gMiAqIDM7XG5cdC8vIFx0XHR2YXIgeCA9IGN4O1xuXHQvLyBcdFx0dmFyIHkgPSBjeTtcblx0Ly8gXHRcdHZhciBzdGVwID0gTWF0aC5QSSAvIHNwaWtlcztcblx0Ly9cblx0Ly8gXHRcdGNvbnRleHQuc3Ryb2tlU3lsZSA9IFwiIzAwMFwiO1xuXHQvLyBcdFx0Y29udGV4dC5iZWdpblBhdGgoKTtcblx0Ly8gXHRcdGNvbnRleHQubW92ZVRvKGN4LCBjeSAtIG91dGVyUmFkaXVzKTtcblx0Ly8gXHRcdGZvciAoaSA9IDA7IGkgPCBzcGlrZXM7IGkrKykge1xuXHQvLyBcdFx0XHR4ID0gY3ggKyBNYXRoLmNvcyhyb3QpICogb3V0ZXJSYWRpdXM7XG5cdC8vIFx0XHRcdHkgPSBjeSArIE1hdGguc2luKHJvdCkgKiBvdXRlclJhZGl1cztcblx0Ly8gXHRcdFx0Y29udGV4dC5saW5lVG8oeCwgeSk7XG5cdC8vIFx0XHRcdHJvdCArPSBzdGVwO1xuXHQvL1xuXHQvLyBcdFx0XHR4ID0gY3ggKyBNYXRoLmNvcyhyb3QpICogaW5uZXJSYWRpdXM7XG5cdC8vIFx0XHRcdHkgPSBjeSArIE1hdGguc2luKHJvdCkgKiBpbm5lclJhZGl1cztcblx0Ly8gXHRcdFx0Y29udGV4dC5saW5lVG8oeCwgeSk7XG5cdC8vIFx0XHRcdHJvdCArPSBzdGVwO1xuXHQvLyBcdFx0fVxuXHQvL1xuXHQvLyBcdFx0Y29udGV4dC5saW5lVG8oY3gsIGN5IC0gb3V0ZXJSYWRpdXMpO1xuXHQvLyBcdFx0Y29udGV4dC5jbG9zZVBhdGgoKTtcblx0Ly8gXHRcdGNvbnRleHQuZmlsbFN0eWxlPWNvbG9yO1xuXHQvLyBcdFx0Y29udGV4dC5maWxsKCk7XG5cdC8vIFx0fVxuXHQvL1xuXHQvLyBcdGZ1bmN0aW9uIGRyYXcoKXtcblx0Ly8gXHRcdGNvbnRleHQuc2F2ZSgpO1xuXHQvLyBcdFx0Y29udGV4dC50cmFuc2xhdGUodGhpcy54LHRoaXMueSk7XG5cdC8vIFx0XHRjb250ZXh0LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcblx0Ly8gXHRcdGNvbnRleHQuZmlsbFN0eWxlPXRoaXMuY29sb3I7XG5cdC8vIFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpO1xuXHQvLyBcdFx0Ly8gZHJhd1N0YXIoMCwgMCwgNSwgdGhpcy5ib3hXLCB0aGlzLmJveEgpO1xuXHQvLyBcdFx0Y29udGV4dC5maWxsUmVjdCh0aGlzLmJveFcvMiotMSx0aGlzLmJveEgvMiotMSx0aGlzLmJveFcsdGhpcy5ib3hIKTtcblx0Ly8gXHRcdGNvbnRleHQuZmlsbCgpO1xuXHQvLyBcdFx0Y29udGV4dC5jbG9zZVBhdGgoKTtcblx0Ly8gXHRcdGNvbnRleHQucmVzdG9yZSgpO1xuXHQvLyBcdFx0dGhpcy5hbmdsZSArPSB0aGlzLmFuZ2xlc3Bpbjtcblx0Ly8gXHRcdHRoaXMudmVsWSo9IDAuOTk5O1xuXHQvLyBcdFx0dGhpcy52ZWxZICs9IDAuMztcblx0Ly8gXHRcdHRoaXMueCArPSB0aGlzLnZlbFg7XG5cdC8vIFx0XHR0aGlzLnkgKz0gdGhpcy52ZWxZO1xuXHQvL1xuXHQvLyBcdFx0aWYodGhpcy55IDwgMCl7XG5cdC8vIFx0XHRcdHRoaXMudmVsWSAqPSAtMC4yO1xuXHQvLyBcdFx0XHR0aGlzLnZlbFggKj0gMC45O1xuXHQvLyBcdFx0fVxuXHQvLyBcdFx0aWYgKHRoaXMueSA+IGhlaWdodCl7XG5cdC8vIFx0XHRcdHRoaXMuYW5nbGVzcGluID0gMDtcblx0Ly8gXHRcdFx0dGhpcy55ID0gaGVpZ2h0O1xuXHQvLyBcdFx0XHR0aGlzLnZlbFkgKj0gLTAuMjtcblx0Ly8gXHRcdFx0dGhpcy52ZWxYICo9IDAuOTtcblx0Ly8gXHRcdH1cblx0Ly8gXHRcdGlmICh0aGlzLnggPiB3aWR0aCB8fHRoaXMueDwgMCl7XG5cdC8vIFx0XHRcdHRoaXMudmVsWCAqPSAtMC41O1xuXHQvLyBcdFx0fVxuXHQvLyBcdH1cblx0Ly8gfVxufSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXJcblx0LnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy8nLFxuXHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RlbXBsYXRlcy9ob21lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdob21lQ3RybCdcblx0fSlcblx0LnN0YXRlKCdwcm9qZWN0cycsIHtcblx0XHR1cmw6ICcvcHJvamVjdHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnL2pzL3RlbXBsYXRlcy9wcm9qZWN0cy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAncHJvamVjdEN0cmwnXG5cdH0pXG5cdC5zdGF0ZSgnYWJvdXQnLCB7XG5cdFx0dXJsOiAnL2Fib3V0Jyxcblx0XHR0ZW1wbGF0ZVVybDogJy9qcy90ZW1wbGF0ZXMvYWJvdXQuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCdcblx0fSlcblx0LnN0YXRlKCdjb250YWN0Jywge1xuXHRcdHVybDogJy9jb250YWN0Jyxcblx0XHR0ZW1wbGF0ZVVybDogJy9qcy90ZW1wbGF0ZXMvY29udGFjdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnY29udGFjdEN0cmwnXG5cdH0pO1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlKXtcblx0XHQkc2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuXHRcdHZhciBpbmNyZW1lbnQgPSAwO1xuXHRcdHZhciBjYXJvdXNlbCA9ICQoJyNjYXJvdXNlbCcpO1xuXHRcdHZhciBjdXJyZW50ID0gJyNmaWctMSc7XG5cdFx0dmFyIHByZXY7XG5cdFx0dmFyIHRoZVdpbmRvdyA9ICQod2luZG93KTtcblx0XHR2YXIgaW50ZXJ2YWw7XG5cdFx0dmFyIGJhcnMgPSAkKCcjc3RhdGljLWJhcnMgPiBsaScpO1xuXHRcdHZhciBoZWFkZXIgPSAkKCcubGVmdC1jb2wnKTtcblxuXHRcdGlmICh0aGVXaW5kb3cud2lkdGgoKSA+IDc2OCkge1xuXHRcdFx0aW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChyb3RhdGUsMTUwMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBzcGVlZDtcblx0XHRcdGJhcnMuZWFjaChmdW5jdGlvbihpbmRleCl7XG5cdFx0XHRcdHNwZWVkID0gKGluZGV4ICsgMSkgKiAwLjM7XG5cdFx0XHRcdCQodGhpcykuY3NzKHsnYW5pbWF0aW9uJzonc2xpZGVJbkxlZnQgJyArIHNwZWVkICsgJ3MnfSk7XG5cdFx0XHR9KTtcblx0XHRcdGhlYWRlci5yZW1vdmVDbGFzcyhcImFuaW1hdGVkXCIpLnJlbW92ZUNsYXNzKCdmbGlwSW5YJyk7XG5cdFx0fVxuXG5cdFx0dGhlV2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXHRcdFx0aWYgKHRoZVdpbmRvdy53aWR0aCgpID4gNzY4KSB7XG5cdFx0XHRcdCQoJ2h0bWwsYm9keScpLnNjcm9sbFRvcCgwKTtcblx0XHRcdFx0aW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChyb3RhdGUsMTUwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiByb3RhdGUoKXtcblx0XHRcdGluY3JlbWVudCsrO1xuXHRcdFx0Y2Fyb3VzZWwuY3NzKHsnLXdlYmtpdC10cmFuc2Zvcm0nOiAncm90YXRlWCgnICsgKGluY3JlbWVudCAqIC0xMjApICsgJ2RlZyknfSk7XG5cdFx0XHRjYXJvdXNlbC5hdHRyKCdkYXRhLXN0YXRlJywoaW5jcmVtZW50ICUgMykgKyAxKTtcblx0XHRcdHByZXYgPSBjdXJyZW50O1xuXHRcdFx0Y3VycmVudCA9ICcjZmlnLScgKyAoKGluY3JlbWVudCAlIDMpICsgMSk7XG5cdFx0fVxufSk7XG4iLCJhcHAuY29udHJvbGxlcigncHJvamVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuXHR2YXIgdGhlV2luZG93ID0gJCh3aW5kb3cpO1xuXHR2YXIgc2tld01vZGUgPSBmYWxzZTtcblx0dmFyIGN1clBhZ2U7XG5cblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZVNrZXcoKXtcblx0XHRza2V3TW9kZSA9IHRydWU7XG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBudW1PZlBhZ2VzID0gJChcIi5za3ctcGFnZVwiKS5sZW5ndGg7XG5cdFx0XHR2YXIgYW5pbVRpbWUgPSAxMDAwO1xuXHRcdFx0dmFyIHNjcm9sbGluZyA9IGZhbHNlO1xuXHRcdFx0dmFyIHBnUHJlZml4ID0gXCIuc2t3LXBhZ2UtXCI7XG5cdFx0XHQvLyB2YXIgcHJvZ1ByZWZpeCA9IFwiI3BcIjtcblxuXHRcdFx0Y3VyUGFnZSA9IHBhcnNlSW50KHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiI3BcIilbMV0pICsgMSB8fCAxO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBudW1PZlBhZ2VzOyBpKyspe1xuXHRcdFx0XHRpZiAoaSA8IGN1clBhZ2UpIHtcblx0XHRcdFx0XHQkKHBnUHJlZml4ICsgaSkuYWRkQ2xhc3MoXCJhY3RpdmVcIikuYWRkQ2xhc3MoXCJpbmFjdGl2ZVwiKTtcblx0XHRcdFx0fSBlbHNlIGlmIChpID09PSBjdXJQYWdlKXtcblx0XHRcdFx0XHQkKHBnUHJlZml4ICsgaSkuYWRkQ2xhc3MoXCJhY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJpbmFjdGl2ZVwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKHBnUHJlZml4ICsgaSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJpbmFjdGl2ZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBwYWdpbmF0aW9uKCl7XG5cdFx0XHRcdHNjcm9sbGluZyA9IHRydWU7XG5cblx0XHRcdFx0JChwZ1ByZWZpeCArIGN1clBhZ2UpLnJlbW92ZUNsYXNzKFwiaW5hY3RpdmVcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0XHRcdC8vICQocHJvZ1ByZWZpeCArIGN1clBhZ2UpLmFkZENsYXNzKFwiY3VycmVudFwiKTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzY3JvbGxpbmcgPSBmYWxzZTtcblx0XHRcdFx0fSwgYW5pbVRpbWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBuYXZpZ2F0ZVVwKCkge1xuXHRcdFx0XHRpZiAoY3VyUGFnZSA9PT0gMSkgcmV0dXJuO1xuXHRcdFx0XHRjdXJQYWdlLS07XG5cdFx0XHRcdCQocGdQcmVmaXggKyAoY3VyUGFnZSArIDEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdFx0Ly8gJChwcm9nUHJlZml4ICsgKGN1clBhZ2UgKyAxKSkucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xuXHRcdFx0XHRwYWdpbmF0aW9uKCk7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIG5hdmlnYXRlRG93bigpIHtcblx0XHRcdFx0aWYgKGN1clBhZ2UgPT09IG51bU9mUGFnZXMpIHJldHVybjtcblx0XHRcdFx0Y3VyUGFnZSsrO1xuXHRcdFx0XHQkKHBnUHJlZml4ICsgKGN1clBhZ2UgLSAxKSkuYWRkQ2xhc3MoXCJpbmFjdGl2ZVwiKTtcblx0XHRcdFx0Ly8gJChwcm9nUHJlZml4ICsgKGN1clBhZ2UgLTEpKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRcIik7XG5cdFx0XHRcdHBhZ2luYXRpb24oKTtcblx0XHRcdH1cblxuXHRcdFx0JChkb2N1bWVudCkub2ZmKCk7IC8vcmVzZXQgZXZlbnQgbGlzdGVuZXJzXG5cblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwibW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbFwiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmIChzY3JvbGxpbmcpIHJldHVybjtcblx0XHRcdFx0aWYgKGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCAgfHwgZS5vcmlnaW5hbEV2ZW50LmRldGFpbCA8IDApIHtcblx0XHRcdFx0XHRuYXZpZ2F0ZVVwKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bmF2aWdhdGVEb3duKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZiAoc2Nyb2xsaW5nKSByZXR1cm47XG5cdFx0XHRcdGlmIChlLndoaWNoID09PSAzOCkge1xuXHRcdFx0XHRcdG5hdmlnYXRlVXAoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlLndoaWNoID09PSA0MCkge1xuXHRcdFx0XHRcdG5hdmlnYXRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICh0aGVXaW5kb3cud2lkdGgoKSA+IDc2OCkge1xuXHRcdGluaXRpYWxpemVTa2V3KCk7XG5cdH1cblxuXHR0aGVXaW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGVXaW5kb3cud2lkdGgoKSA+IDc2OCkge1xuXHRcdFx0Ly8gJCgnaHRtbCxib2R5Jykuc2Nyb2xsVG9wKDApO1xuXHRcdFx0Ly9zdGFydCAvIHJlc3RhcnQgbW91c2VvdmVyIGxpc3RlbmVyIGlmIHN0b3BwZWRcblx0XHRcdGlmICghc2tld01vZGUpIHtcblx0XHRcdFx0aW5pdGlhbGl6ZVNrZXcoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSk7XG4iLCJhcHAuZGlyZWN0aXZlKCdwcm9qZWN0c01vYmlsZScsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJy9qcy9kaXJlY3RpdmVzL3Byb2plY3RzLW1vYmlsZS5odG1sJ1xuXHR9O1xufSk7XG4iXX0=
