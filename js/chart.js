'use strict'
const canvas = document.getElementById("chart");
const ctx = canvas.getContext('2d');
let data = [];
generateData();
console.log(data);
drawGraph();



function generateData() {
    let lastMeasurement = 15;
    const maxDeviation = 2;
    const dataPoints = 100;
    for(let i = 0; i < dataPoints; i++){
        lastMeasurement += (Math.round(((Math.random()  * (maxDeviation * 2)-maxDeviation) * 10)) / 10);
        data.push(lastMeasurement);
    }
}

function convertDataToXY(min, max, val, entry) {
    const length = data.length;
    const x = Math.round(width / length * entry);
    const y = Math.round((val - min) / max * height);
    //console.log({min, max, val, entry , x, y})
    return {x,y}
}

function drawGraph(canvasId, data, width, height){
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext('2d');
    canvas.height=height;
    canvas.width = width;
    ctx.clearRect(0,0, width, height);
    let min = Math.min(... data);
    let max = Math.max(... data);
    let points = [];
    for(let i = 0; i < data.length; i++) {
        points.push(convertDataToXY(min, max, data[i], i));
    }
    if(points.length !== 0){
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length-2; i++){
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
            const cpx = (points[i].x + points[i+1].x) / 2;
            const cpy = (points[i].y + points[i+1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);

        }
        ctx.quadraticCurveTo(points[points.length - 2].x, points[points.length - 2].y, points[points.length-1].x,points[points.length-1].y);
        ctx.stroke();

    }

}