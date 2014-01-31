$(document).ready(function(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	var isDrawing = false;

	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;

	var undo = [];
	var shapes = [];
	var currentTool = undefined;
	var currentToolType = 0;
	var radius = 2;
	var currentColor = "#000";

	// #################### Tools ###########################

	$("button").click(function() {
		$("button").css("background-color","#777");
		$(this).css("background-color","yellow");
	});
	

	$("#line").click(function()	{
		console.log("Selecting Line");
		currentToolType = 2;
	});

	$("#pen").click(function()	{
		console.log("Selecting Pen");
		currentToolType = 0;
	});

	$("#rectangle").click(function()	{
		console.log("Selecting Rectangle");
		currentToolType = 1;
	});

	$("#text").click(function()	{
		console.log("Selecting Text tools");
		currentToolType = 3;
	});

	function createNewTool() {
		if (currentToolType === 0){
			return new Pen();				// Do we need arguments to construct?
		}else if (currentToolType === 1){
			return new Rectangle();
		}else if (currentToolType === 2){
			return new Line();
		}else if (currentToolType === 3){
			return new Texti();
		}
	}

	// ####################   ###########################

	var mdown = function(e){
		currentTool = createNewTool();			// Returns new Pen or new Rect
		isDrawing = true;

		var x = e.pageX;
		var y = e.pageY;
		var point = new Point(x, y);
		currentTool.addPoint(point,currentColor,radius);		// Add point to list
		ctx.moveTo(x,y);

		console.log("Color: " + currentColor, "Radius: " + radius);
	//	mmove(e);			 // So we can add single dots
	}

	var mmove = function (e){
		if(isDrawing){
			ctx.lineWidth = radius * 2;
			var x = e.pageX;
			var y = e.pageY;
		
			var point = new Point(x,y); 	// Create new point if pen is moved
			currentTool.addPoint(point,currentColor,radius);		// Add that point to the list

			// ctx.lineTo(x, y);
			// ctx.stroke();
			// ctx.beginPath();
			// ctx.arc(x, y, radius, 0, Math.PI*2);	// Create a circle
			// ctx.fill();
			// ctx.beginPath();
			// ctx.moveTo(x, y);

			clearWindow();
			drawShapes();
			currentTool.draw(ctx);
		}
	}

	var mup = function(){
		isDrawing = false;
		shapes.push(currentTool);	// When mouse is release, add currentTool
		console.log(shapes);		//  to shapes[]
		ctx.beginPath();
	}

	canvas.addEventListener('mousedown', mdown);
	canvas.addEventListener('mousemove', mmove);
	canvas.addEventListener('mouseup', mup);
	

	// #################### Color ###########################

	function setColor(color){		// Needs update    TODO
		ctx.fillStyle = color;		// Is this obsolete?
		ctx.strokeStyle = color;
		currentColor = color;
		console.log("Color change to:" + currentColor);
	}

	$(".color").blur(function() {
		setColor($(".color").css("background-color"));
	});

	$(".swatch").click(function(){
		setColor($(this).css("background-color"));
	});

	// #################### Undo / Redo ###########################

	function clearWindow() {
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.beginPath();
	}

	function drawShapes() {
		for ( var i = 0; i < shapes.length; i++){
			shapes[i].draw(ctx);
		};
	}

	$("#undo").click(function() {
		console.log("Undoing")
		shapes.pop();
		clearWindow();
		drawShapes();
	});

	$("#redo").click(function() {
		console.log("Redoing")
		drawShapes();
	});

	$("#clear").click(function() {
		clearWindow();
		console.log("Clearing")
	});

	$("#load").click(function() {
		console.log("Loading")
	});

	$("#save").click(function() {
		console.log("Saving")
	});

	
	// #################### Slider #############################

	$(function(){
		$("#slider").slider();
		$("#slider").slider("value",radius);
	});
	$("#slider").on("slidechange",function(){
		radius = $("#slider").slider("value");
		$("#radius").html(radius);
	});

	// Bigger  - smaller pen size
	$("#bigger").click(function(){
		radius++;
		$("#radius").html(radius);
		$("#slider").slider("value",radius);
	});

	$("#smaller").click(function(){
		radius--;
		$("#radius").html(radius);
		$("#slider").slider("value",radius);
	});

	// #################### Color picker #######################

	

});