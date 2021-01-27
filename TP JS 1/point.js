var Point = function(x,y,canvas)
{
	this.canvas=canvas;
	this.canvas2dContext=this.canvas.getContext("2d");
	this.x=x;
	this.y=y;

	this.ache = function(temps, duree)
	{

		this.canvas2dContext.beginPath();
		this.canvas2dContext.arc(this.x,this.y,5,0,(2*Math.PI)*(temps/duree),false);
		this.canvas2dContext.fillStyle = "black";
		this.canvas2dContext.stroke();
		this.canvas2dContext.closePath();
	}
}
