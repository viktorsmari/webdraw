function Point(x, y) {
	this.x = x;
	this.y = y;
	// this.color = color;
	// this.radius = radius;
}

function Pen(color) {
	this.points = [];
	this.color = [];
	this.radius = undefined;
	//console.log(color);
}

Pen.prototype.addPoint = function(p,color,radius) {
	this.points.push(p);
	this.color.push(color);
	this.radius = radius;
}

Pen.prototype.draw = function(ctx) {
	for(var i = 0; i < this.points.length; ++i) {
		
		var currentPoint = this.points[i];
		
		if(i == 0) {
			ctx.moveTo(currentPoint.x, currentPoint.y);
		}else{
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
		}
	}
}

function Rectangle() {
	this.start = undefined;
	this.end = undefined;

	this.color = undefined;
}

Rectangle.prototype.addPoint = function(p,color) {
	if(this.start === undefined) {
		this.start = p;
		console.log("Adding start point to rectangle");
	}
	else {
		this.end = p;
		console.log("Updating end point in rectangle");
	}		
	this.color = color;
}

Rectangle.prototype.draw = function(ctx) {
	var width = this.end.x - this.start.x;
	var height = this.end.y - this.start.y;
	ctx.rect(this.start.x,this.start.y,width, height);
	ctx.stroke();
}