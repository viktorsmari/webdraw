function Point(x, y) {
	this.x = x;
	this.y = y;
}

// ############### Rectangle ################

function Pen(color) {
	this.points = [];
	this.color = [];
	this.radius = undefined;
	//console.log(color);
}

Pen.prototype.addPoint = function(p, color, radius) {
	this.points.push(p);
	this.color = color;
	this.radius = radius;
}

Pen.prototype.draw = function(ctx) {
	for(var i = 0; i < this.points.length; ++i) {
		
		var currentPoint = this.points[i];

		// ctx.strokeStyle = this.color; // Does this work??
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
	this.radius = undefined;
}

Rectangle.prototype.addPoint = function(p, color, radius) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to rectangle");
	}
	else {
		this.end = p;
		console.log("Updating end point in rectangle");
	}		
	this.color = color;
	this.radius = radius;
}

Rectangle.prototype.draw = function(ctx) {
	ctx.beginPath(); // So each line is a new line
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	ctx.rect(this.start.x,this.start.y,width, height);
	ctx.strokeStyle = this.color; // Saving colors
	ctx.lineWidth = this.radius;  // Saving linewidth
	ctx.stroke();
}

// ############### Line  ################

function Line(){
	this.start = undefined;
	this.end = undefined;
	this.color = undefined;
	this.radius = undefined;
}

Line.prototype.addPoint = function (p, color, radius) {
	this.color = color;
	if(this.start === undefined){
		this.start = p;
		console.log("Adding START point for line");
	}else{
		this.end = p;
		console.log("Adding END point for line");
	}
	this.radius = radius;
}
Line.prototype.draw = function (ctx) {
	ctx.beginPath(); // So each line can have it's own color
	ctx.strokeStyle = this.color; // Saving each lines color??
	ctx.moveTo(this.start.x, this.start.y);
	ctx.lineTo(this.end.x, this.end.y);
	ctx.lineWidth = this.radius;
	ctx.stroke();
}

// ############### Text  ################

function Texti() {
	this.start = undefined;
	this.color = undefined;
	this.radius = 22;
}

Texti.prototype.addPoint = function (p, color, radius){
	this.start = p;
	this.color = color;
	this.radius = radius;
}

Texti.prototype.draw = function (ctx) {
	ctx.beginPath(); // So each line can have it's own color
	ctx.fillStyle = this.color; 
	// TODO : choose another font from a option / select box. 
	// TODO : Take in text
	// example : ctx.font = "30px Arial";
	ctx.font = String(this.radius + "px Arial");
	console.log(ctx.font);
	ctx.fillText( "Some text", this.start.x, this.start.y);

}



