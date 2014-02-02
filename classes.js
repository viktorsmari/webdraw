function Point(x, y) {
	this.x = x;
	this.y = y;
}

// ############### Pen ################

function Pen() {
	this.points = [];
	this.color = [];
	this.lineWidth = undefined;
}

Pen.prototype.addPoint = function(p, color, lineWidth) {
	this.points.push(p);
	this.color = color;
	this.lineWidth = lineWidth;
}

Pen.prototype.draw = function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.color;
	
	for(var i = 0; i < this.points.length; ++i) {
		
		var currentPoint = this.points[i];

		// ctx.fillStyle = this.color; // Does this work??
		
		if(i == 0) {
			ctx.moveTo(currentPoint.x, currentPoint.y);
		}else{
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
		}
	}
}

// ############### Rectangle ################
function Rectangle() {
	this.start = undefined;
	this.end = undefined;
	this.color = undefined;	// Default color is black ?
	this.lineWidth = undefined;
}

Rectangle.prototype.addPoint = function(p, color, lineWidth) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to rectangle");
	}else{
		this.end = p;
		console.log("Updating end point in rectangle");
	}	

	this.color = color;
	this.lineWidth = lineWidth;
}

Rectangle.prototype.draw = function(ctx) {
	ctx.beginPath(); // So each line is a new line
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	ctx.rect(this.start.x,this.start.y,width, height);
	ctx.strokeStyle = this.color; // Saving colors
	ctx.lineWidth = this.lineWidth;  // Saving linewidth
	ctx.stroke();
}

// ############### Line  ################

function Line() {
	this.start = undefined;
	this.end = undefined;
	this.color = undefined;
	this.lineWidth = undefined;
}

Line.prototype.addPoint = function (p, color, lineWidth) {
	this.color = color;
	if(this.start === undefined){
		this.start = p;
		console.log("Adding START point for line");
	}else{
		this.end = p;
		console.log("Adding END point for line");
	}
	this.lineWidth = lineWidth;
}
Line.prototype.draw = function (ctx) {
	ctx.beginPath(); // So each line can have it's own color
	ctx.strokeStyle = this.color; // Saving each lines color??
	ctx.moveTo(this.start.x, this.start.y);
	ctx.lineTo(this.end.x, this.end.y);
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();
}

// ############### Text  ################

function Texti() {
	this.start = undefined;
	this.color = undefined;
	this.lineWidth = undefined;
	this.textmsg = undefined;
	this.fontType = undefined;
}

Texti.prototype.addPoint = function (p, color, lineWidth, texti, fontur){
	this.start = p;
	this.color = color;
	this.lineWidth = lineWidth;
	this.textmsg = texti;
	this.fontType = fontur;
}

Texti.prototype.draw = function (ctx) {
	ctx.beginPath(); // So each line can have it's own color
	ctx.fillStyle = this.color; 

	ctx.font = String(this.lineWidth + "px " + this.fontType );

	ctx.fillText(this.textmsg, this.start.x, this.start.y);
}

// ############### Text  ################

function Circle() {
	this.start = undefined;
	this.color = undefined;
	this.lineWidth = undefined;
	this.radius;
}

Circle.prototype.addPoint = function (p, color, lineWidth){
	// TODO = fix lineWidth/size

	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to rectangle");
	}else{
		this.end = p;
		console.log("Updating end point in rectangle");
	}	
	
	// TODO , maybe make dragging mouse down increase linewidth?
	// Or while holding shift?

	var width = Math.abs(this.end.x - this.start.x);
	console.log(this.end.x);
	var height = Math.abs(this.end.y - this.start.y);
	this.radius = width + height; // Just testing!
	this.color = color;
	this.lineWidth = lineWidth;
}

Circle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.start.x, this.start.y, this.radius, 0, 2*Math.PI);
	ctx.strokeStyle = this.color;
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();
}

//TODO Custom shape?





