app.controller('aboutCtrl', function($scope){
	var theWindow = $(window);
	var force = d3.layout.force();
	var stopped = true;

	// angular.element(document).ready(function(){
	$scope.skills = [
		{name: "JavaScript", level: 3},
		{name: "MongoDB", level: 3},
		{name: "Express.js", level: 3},
		{name: "Angular.js", level: 3},
		{name: "Node.js", level: 3},
		{name: "Mongoose.js", level: 3},
		{name: "Git", level: 3},
		{name: "CSS3", level: 3},
		{name: "HTML5", level: 3},
		{name: "Resonsive Design", level: 2},
		{name: "Gulp", level: 2},
		{name: "Mocha & Chai", level: 2},
		{name: "jQuery", level: 2},
		{name: "Bootstrap", level: 2},
		{name: "Web-Audio", level: 2},
		{name: "Chrome Extensions", level: 1},
		{name: "SQL", level: 1},
		{name: "WebSockets", level: 1},
		{name: "MIDI", level: 1},
		{name: "Java", level: 1},
		{name: "C++", level: 1},
	];

	$scope.colors = [
		'#7FFFD4',
		'#E0FFFF',
		'#33CCFF',
		'#C688E8',
		'#FF807D',
		'#FF8EB2'
	];

	$scope.skills.map(function(e,i){
		e.color = $scope.colors[i%6];
	});

function initializeSkillsCloud(){
	var skillsCloud = $("#skills-cloud");
	var width = skillsCloud.width();
	var height = skillsCloud.height();
	var svg = d3.select("#skills-cloud").append("svg");


	//create nodes
	var nodes = d3.range($scope.skills.length).map(function(i) {
		return {
			radius: $scope.skills[i].level*18 +14,
			label: $scope.skills[i].name,
			skillLevel: $scope.skills[i].level,
			bgColor: $scope.skills[i].color
		};
	});

	var	root = nodes[0];
		root.radius = 0;
		root.fixed = true;

	var groups = svg.selectAll("g")
		.data(nodes.slice(1))
		.enter()
		.append("g");

	var circles = groups.append('circle')
		.data(nodes.slice(1))
		.attr("r", function(d) { return d.radius; })
		.style("fill", function(d, i) { return d.bgColor; });

	var label = groups.append("text")
		.text(function(d){ return d.label; })
		.attr({
			"alignment-baseline": "middle",
			"text-anchor": "middle",
		});


	force.gravity(0.05)
	.charge(function(d, i) { return i ? 0 : -3000; })
	.nodes(nodes);


	if (navigator.userAgent.split("Chrome").length < 2) {
		force.size([width-100, height+600]); //safari
	} else {
		force.size([width-200, height-300]); //chrome
	}


	force.start();
	stopped = false;

	force.on("tick", function(e) {
		var q = d3.geom.quadtree(nodes),
			i = 0,
			n = nodes.length;

		while (++i < n) q.visit(collide(nodes[i]));

		//move circles
		svg.selectAll("circle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });

		//move labels
		svg.selectAll("text")
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; });
	});

	svg.on("mousemove", function() {
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
		return function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== node)) {
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
	if (navigator.userAgent.split("Safari").length < 2 && navigator.userAgent.split("Chrome").length < 2){
		firefox = true;
	}

	if (firefox){
		$('#skills-cloud').css({'display':'none'});
		$('#skills-mobile').css({'display': 'block', 'margin-top': '24px' ,'margin-bottom': '44px','height': '700px'});

		setTimeout(function(){
			$('.skill-circle').css({'padding': '1px','padding-right': '32%', 'font-family': 'Oxygen', 'font-size': '19px', 'font-weight':'300', 'float':'right'});
		},500);
	}

	if (theWindow.width() > 1074 && !firefox) {
		initializeSkillsCloud();
	}

	theWindow.resize(function() {
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
