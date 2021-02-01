let degreeToRad = degree => degree * Math.PI / 180;

let drawDirection = (ctx, width, height, rotation) =>{
    ctx.rotate(degreeToRad(rotation));

}