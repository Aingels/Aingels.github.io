


function Point(x,y,canvas,color){
this.canvas=canvas;
this.canvas2dContext=canvas.getContext('2d');
this.x=x;
this.y=y;
this.canvas2dContext.beginPath();
this.canvas2dContext.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
this.canvas2dContext.fillStyle = color;
this.canvas2dContext.fill();
}
