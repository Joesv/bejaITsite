'use strict'
/** meant for testing the data */
function generateData() {
    let fakeMeasurements = [];
    let lastMeasurement = 15;
    const maxDeviation = 2;
    const dataPoints = 100;
    for(let i = 0; i < dataPoints; i++){
        lastMeasurement += (Math.round(((Math.random()  * (maxDeviation * 2)-maxDeviation) * 10)) / 10);
        fakeMeasurements.push(lastMeasurement);
    }
    return fakeMeasurements;
}



function convertDataToXY(minVal, maxVal, val, entry, canvas, data, offset) {
    const length = data.length;
    const x = Math.round((canvas.width - offset.left - offset.right) / length * entry + offset.left);
    if(minVal < 0) {
        let temp = val + Math.abs(minVal)
        console.log({val, temp});
        val += Math.abs(minVal);
        console.log(val)
        minVal += Math.abs(minVal);
        maxVal += Math.abs(minVal)
    }
    const y = canvas.height - Math.round((val - minVal) / maxVal * (canvas.height - offset.top - offset.bottom) + offset.bottom);
    return {x,y}
}

/** draw the graph on the specified canvas */
function drawGraph(canvasId, data, width, height){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const offset = {left: canvas.width/10, top: canvas.height/20, bottom: canvas.height/20, right: canvas.width/20};
    canvas.height=height;
    canvas.width = width;
    ctx.clearRect(0,0, width, height);
    let min = Math.min(... data);
    let max = Math.max(... data);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        points.push(convertDataToXY(min, max, data[i], i, canvas, data, offset));
    }
    if(points.length !== 0){
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length-2; i++){
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
            //https://stackoverflow.com/a/7058606
            const cpx = (points[i].x + points[i+1].x) / 2;
            let cpy = (points[i].y + points[i+1].y) / 2;
            if(cpy < 0) {
                cpy = 0;
            }
            ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);

        }
        ctx.quadraticCurveTo(points[points.length - 2].x, points[points.length - 2].y, points[points.length-1].x,points[points.length-1].y);
        ctx.stroke(); //draw it to the canvas

    }

}