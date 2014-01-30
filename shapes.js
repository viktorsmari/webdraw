/*
function Point(x,y){
	this.x = x;
	this.y = y;
}
*/



// UNUSED FILE,  REMEMBER TO ADD IT


var Shape = Base.extend({
	constructor: function (x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
		console.log("Shape created");
	}
});


var Rect = Shape.extend({
	constructor: function(x,y,color,lineColor,endX,endY){
		this.base(x,y,color);
		//this.endX = endX;
		//this.endY = endY;
		// hmmm
	},
	draw: function(context){
		context.fillStyle - this.color;
		context.fillRect(this.x,this.y, this.endX - this.x,
			this.endY - this.y);
	}
});

var Circle = Shape.extend(

);

	