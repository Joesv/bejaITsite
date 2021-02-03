/** Convert degrees to radians */
let degreeToRad = degree => degree * Math.PI / 180;

/** Draw an arrow dictating the wind direction */
function  drawDirectionArrow(canvasID, width, height, rotation) {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext("2d");
    canvas.height = height;
    canvas.width = width;
    ctx.clearRect(0,0, width, height);
    ctx.font = "20px serif";
    ctx.strokeText("winddir", 0,20)
    ctx.save();
    //get the center point of the canvas from which the arrow is suposed to be drawn
    let x = width/2;
    let y = height/2;
    //move (0,0) to the middle of the canvas
    ctx.translate(x,y);
    //rotate the canvas around the new (0,0) point.
    ctx.rotate(degreeToRad(rotation));
    //move the (0,0) back to the top left corner
    ctx.translate(-x,-y);
    //begin drawing
    ctx.beginPath();
    //begin drawing from the center of the canvas
    ctx.moveTo(x,y);
    //draw a line to the 'top', which could be turned from the real top of the canvas
    ctx.lineTo(x,0);
    //draw the head
    ctx.lineTo(x-20, 20);
    ctx.moveTo(x,0);
    ctx.lineTo(x+20, 20);
    //put it on the canvas
    ctx.stroke();
}