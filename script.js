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
	var lineWidth = 2;
	var currentColor = "#000";
	var texti = "Hello world";
	var fontur = "Arial";

	// #################### Tools / buttons  ######################

	$(".tools button").click(function() {
		$(".tools button").css("background-color","#777");
		$(this).css("background-color","yellow");
	});

	$("#fontselect").blur(function(){
		fontur = $("#fontselect").val();
	});


	$("#line").click(function()	{
		console.log("Selecting Line");
		currentToolType = 2;
		setlineWidth(1);
	});

	$("#pen").click(function()	{
		console.log("Selecting Pen");
		currentToolType = 0;
		setlineWidth(2);
	});

	$("#rectangle").click(function()	{
		console.log("Selecting Rectangle");
		currentToolType = 1;
		setlineWidth(2);
	});

	$("#circle").click(function()	{
		console.log("Selecting Circle");
		currentToolType = 4;
		setlineWidth(3);
		
	});

	$("#text").click(function()	{
		console.log("Selecting Text tools");
		currentToolType = 3;
		lineWidth = 30;
		$("#lineWidth").html(lineWidth);
		$("#slider").slider("value",lineWidth);
	});

	// TODO  = make this pop up when the canvas is clicked.

	$("#textabox").blur( function() {
		texti = $(this).val();
		console.log(texti);
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
		}else if (currentToolType === 4){
			return new Circle();
		}
	}

	// #################### Mouse  ###########################

	var mdown = function(e){
		currentTool = createNewTool();			// Returns new Pen or new Rect
		isDrawing = true;

		var x = e.pageX;
		var y = e.pageY;
		var point = new Point(x, y);
		currentTool.addPoint(point,currentColor,lineWidth,texti,fontur);		
		ctx.moveTo(x,y);
	}

	var mmove = function (e){
		if(isDrawing){
			ctx.lineWidth = lineWidth * 2;
			var x = e.pageX;
			var y = e.pageY;
		
			var point = new Point(x,y); 	// Create new point if pen is moved
			currentTool.addPoint(point,currentColor,lineWidth,texti,fontur);

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

	function setColor(color){	
		// ctx.fillStyle = color;
		// ctx.strokeStyle = color;
		currentColor = color;
		console.log("Color change to: " + currentColor);
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
		undo.push( shapes.pop() );
		clearWindow();
		drawShapes();
	});

	$("#redo").click(function() {
		console.log("Redoing");
		shapes.push( undo.pop() );
		clearWindow();
		drawShapes();
		// TODO - not working!
	});

	$("#clear").click(function() {
		clearWindow();
		console.log("Clearing")
	});

	// TODO : improve code, reuse.

	// ######################### Get List of drawings ################
	$("#getlist").click(function() { 

		var param = { 
			"user": "viktora12", 
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetList",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("Loading a list of drawings")
				console.log(data);
			},
			error: function (xhr, err) {
				// Something went wrong...
			}
		});	

	});

	// ######################### LOAD  ################################
	$("#load").click(function() { 
		// TODO need to load id number
		var loadnumber = $("#loadnumber").val() 

		var param = { 
			id:loadnumber
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("Loading picture with id :" + loadnumber )
				console.log(data);
				clearWindow();
				drawShapes();
			},
			error: function (xhr, err) {
				// Something went wrong...
			}
		});	

	});

	// ######################### SAVE #########################
	$("#save").click(function() { 
		console.log("Saving...")
		// TODO 
		
		var title = $("#drawingTitle").val();

		var stringifiedArray = JSON.stringify(shapes);

		var param = { 
			"user": "viktora12", // You should use your own username!
			"name": title,
			"content": stringifiedArray,
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/Save",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("The save was successful...");
				console.log(data);
			},
			error: function (xhr, err) {
				console.log("Something went wrong...");
			}
		});
	});

	// #################### Slider lineWidth ##########################
	function setlineWidth(x){
		lineWidth = x;
		$("#lineWidth").html(lineWidth);				// Update number
		$("#slider").slider("value",lineWidth);			// Update slider
	}
	function getlineWidth(){
		return lineWidth;
	}

	$(function(){				// Initialize slider function.
		$("#slider").slider();
		$("#slider").slider("value",lineWidth);
	});

	$("#slider").on("slidechange",function(){
		lineWidth = $("#slider").slider("value");
		$("#lineWidth").html(lineWidth);
	});

	// Bigger / smaller Buttons
	$("#bigger").click(function(){
		setlineWidth(getlineWidth()+1);
	});

	$("#smaller").click(function(){
		setlineWidth((getlineWidth()-1));
	});

	// #################### Color picker #######################

});